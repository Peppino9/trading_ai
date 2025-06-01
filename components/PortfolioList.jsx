'use client';
import { usePortfolio } from '../context/PortfolioContext';
import CoinChart from './CoinChart';
import { useEffect, useState } from 'react';

export default function PortfolioList() {
  const { positions, removePosition } = usePortfolio();
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
      }
    };

    fetchPrices();
  }, [positions]);

  return (
    <div>
      {positions.map(pos => {
        const current = prices[pos.coinId]?.usd || 0;
        const cost = pos.entryPrice * pos.amount;
        const value = current * pos.amount;
        const pnl = value - cost;

        let advice = '📊 Ingen signal';
        const high = current * 1.1;
        const low = current * 0.9;

        if (current <= low * 1.05) {
          advice = '💰 Möjligt köpläge - nära 24h-lägsta';
        } else if (current >= high * 0.95) {
          advice = '🚨 Överköpt - nära 24h-högsta';
        } else {
          advice = '📊 Stabil - avvakta';
        }

        return (
          <div key={pos.id} style={{ marginBottom: '2rem' }}>
            <h4>{pos.coinId}</h4>
            <p>Entry: ${pos.entryPrice} × {pos.amount}</p>
            <p>Current: ${current.toFixed(2)}</p>
            <p>PL: ${pnl.toFixed(2)} ({((pnl / cost) * 100).toFixed(2)}%)</p>
            <p>{advice}</p>
            <CoinChart coinId={pos.coinId} />
            <button onClick={() => removePosition(pos.id)}>Remove</button>
          </div>
        );
      })}
    </div>
  );
}
