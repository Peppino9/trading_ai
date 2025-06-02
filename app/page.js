'use client';

import { useEffect, useState } from 'react';
import PortfolioList from '../components/PortfolioList';
import PositionForm from '../components/PositionForm';
import { createPortfolioApi } from '../components/usePortfolioApi';

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [positions, setPositions] = useState([]);

  const { load, add, remove, update } = createPortfolioApi(setPositions);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
          {
            headers: {
              'X-CG-Api-Key': process.env.NEXT_PUBLIC_CGEO_API_KEY,
            },
          }
        );
        const data = await res.json();
        console.log('🔍 Coin list:', data);

        const formatted = data.map((coin) => ({
          id: coin.id,
          name: coin.name,
        }));

        setCoins(formatted);
        setSelectedCoin(formatted[0]);
      } catch (err) {
        console.error('Kunde inte hämta coins:', err.message);
      }
    };

    fetchCoins();
    load(); // Ladda localStorage-data till state
  }, []);

  if (!selectedCoin) return <p>Laddar valutor...</p>;

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h1>Min Kryptovaluta-Portfölj</h1>

      <label htmlFor="coin-select">Välj valuta:</label>
      <select
        id="coin-select"
        value={selectedCoin.id}
        onChange={(e) => {
          const coin = coins.find((c) => c.id === e.target.value);
          setSelectedCoin(coin);
        }}
      >
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>

      <PositionForm coin={selectedCoin} add={add} />
      <PortfolioList positions={positions} remove={remove} />
    </main>
  );
}
