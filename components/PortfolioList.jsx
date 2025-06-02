'use client';
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
      }
    };

    fetchPrices();
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
          </div>
        );
      })}
    </div>
  );
}
