'use client';
import { useEffect, useState } from 'react';

export default function AiRecommendation({ positions }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!positions || positions.length === 0) {
      setLoading(false);
      return;
    }

    const fetchAndAnalyze = async () => {
      try {
        const responses = await Promise.all(
          positions.map(async (pos) => {
            const res = await fetch(
              `https://api.coingecko.com/api/v3/coins/${pos.coinId}/market_chart?vs_currency=usd&days=7`
            );
            const data = await res.json();

            if (!data.prices || data.prices.length === 0) {
              return {
                coinId: pos.coinId,
                recommendation: 'Ingen prisdata tillgänglig.',
              };
            }

            const prices = data.prices.map((p) => p[1]);

            const aiRes = await fetch('/api/ai', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ coinId: pos.coinId, prices }),
            });

            const aiData = await aiRes.json();

            
            return {
              coinId: pos.coinId,
              recommendation: aiData.recommendation || ' AI-svar saknas',
            };
          })
        );

        setResults(responses);
      } catch (err) {
        setError('Kunde inte hämta AI-rekommendationer');
        console.error('X', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyze();
  }, [positions]);

  if (loading) return <p> AI analyserar marknaden...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (results.length === 0) return <p>⚠️ Ingen AI-rekommendation att visa.</p>;

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>AI-rekommendationer</h3>
      <ul>
        {results.map((item) => (
          <li key={item.coinId}>
            <strong>{item.coinId}:</strong> {item.recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
}
