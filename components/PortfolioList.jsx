'use client';
<<<<<<< Updated upstream
import { usePortfolio } from '../context/PortfolioContext';
import CoinChart from './CoinChart';
import { useEffect, useState } from 'react';

export default function PortfolioList() {
  const { positions, removePosition } = usePortfolio(); // OBS! removePosition MÅSTE vara här
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const ids = positions.map(p => p.coinId).join(',');
    if (!ids) return;

    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error('Failed to fetch prices:', error.message);
=======
import { useEffect, useState } from 'react';
import CoinChart from './CoinChart';

export default function PortfolioList({ positions, remove }) {
  const [prices, setPrices] = useState({});
  const apiKey = process.env.NEXT_PUBLIC_CGEO_API_KEY;

  // Läs in cache direkt
  useEffect(() => {
    const cached = localStorage.getItem('cachedPrices');
    if (cached) {
      setPrices(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    if (!positions.length) return;

    const cached = JSON.parse(localStorage.getItem('cachedPrices') || '{}');

    // Hämta bara de coinIds som inte redan finns i localStorage
    const missingIds = positions
      .map(p => p.coinId)
      .filter(id => !(id in cached));

    if (!missingIds.length) return;

    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${missingIds.join(',')}&vs_currencies=usd`,
          {
            headers: apiKey
              ? { 'X-CG-Api-Key': apiKey }
              : undefined,
          }
        );

        const data = await res.json();

        // Uppdatera både state och localStorage med nya coin-priser
        const updatedPrices = { ...cached, ...data };
        setPrices(updatedPrices);
        localStorage.setItem('cachedPrices', JSON.stringify(updatedPrices));
      } catch (err) {
        console.error(' Error fetching prices:', err.message);
>>>>>>> Stashed changes
      }
    };

    fetchPrices();
<<<<<<< Updated upstream
  }, [positions]);

  return (
    <div>
      {positions.map(pos => {
        const current = prices[pos.coinId]?.usd || 0;
        const cost = pos.entryPrice * pos.amount;
        const value = current * pos.amount;
        const pnl = value - cost;

        return (
          <div key={pos.id}>
            <h4>{pos.coinId}</h4>
            <p>Entry: ${pos.entryPrice} × {pos.amount}</p>
            <p>Current: ${current.toFixed(2)}</p>
            <p>PL: ${pnl.toFixed(2)} ({((pnl / cost) * 100).toFixed(2)}%)</p>
            <CoinChart coinId={pos.coinId} />
            <button onClick={() => removePosition(pos.id)}>Remove</button> {/* 👈 Knappen */}
=======
  }, [positions, apiKey]);

  return (
    <div>
      {positions.map((pos) => {
        const priceData = prices[pos.coinId];
        const current = priceData?.usd ?? null;
        const cost = pos.entryPrice * pos.amount;
        const value = current !== null ? current * pos.amount : 0;
        const pnl = current !== null ? value - cost : 0;
        const pnlPercent = current !== null ? (pnl / cost) * 100 : 0;

        return (
          <div
            key={pos.id}
            style={{
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #ccc',
            }}
          >
            <h4>{pos.coinId}</h4>
            <p>Entry: ${pos.entryPrice} × {pos.amount}</p>
            <p>
              Current:{' '}
              {current !== null ? `$${current.toFixed(2)}` : 'Laddar...'}
            </p>
            <p>
              PL:{' '}
              {current !== null
                ? `$${pnl.toFixed(2)} (${pnlPercent.toFixed(2)}%)`
                : 'Laddar...'}
            </p>
            <button onClick={() => remove(pos.id)}>Ta bort</button>
            {pos.coinId && <CoinChart coinId={pos.coinId} />}
>>>>>>> Stashed changes
          </div>
        );
      })}
    </div>
  );
}
