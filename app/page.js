'use client';

import { useEffect, useState } from 'react';
import PortfolioForm from '../components/PortfolioForm';
import PortfolioTable from '../components/PortfolioTable';
import { fetchPrice, fetchChart } from '../utils/api';
import '../styles/globals.css';

const COINS_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY}`;

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio');
    if (saved) setPortfolio(JSON.parse(saved));
  }, []);

  // Spara portfolio till localStorage
  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // Hämta coin list
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(COINS_URL);
        if (!res.ok) throw new Error('Misslyckades hämta coin listan');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCoins();
  }, []);

  // Lägg till coin
  const handleAddCoin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const id = selectedCoin;
    const entry = parseFloat(form.entry.value);
    const amount = parseFloat(form.amount.value);

    if (!id || isNaN(entry) || isNaN(amount)) return;

    try {
      const coin = coins.find((c) => c.id === id);
      const current = await fetchPrice(id);
      const chart = await fetchChart(id);

      const newEntry = {
        id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        entry,
        amount,
        current,
        chart,
      };

      setPortfolio((prev) => [...prev.filter((c) => c.id !== id), newEntry]);
      form.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  // AI Råd
  const getAdvice = async (coin) => {
    const prices = coin.chart.datasets[0].data;
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coinId: coin.id, prices }),
    });

    const result = await res.json();
    if (result.advice) {
      const updated = portfolio.map((c) =>
        c.id === coin.id ? { ...c, advice: result.advice } : c
      );
      setPortfolio(updated);
    } else {
      alert('Kunde inte få AI-råd: ' + result.error);
    }
  };

  // Ta bort coin
  const handleRemove = (id) => {
    setPortfolio((prev) => prev.filter((coin) => coin.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Min Crypto Portfölj</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <PortfolioForm
        coins={coins}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        onAdd={handleAddCoin}
      />

      <PortfolioTable
        portfolio={portfolio}
        onAdvice={getAdvice}
        onRemove={handleRemove}
      />
    </div>
  );
}
