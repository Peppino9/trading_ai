'use client';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function CoinChart({ coinId }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_CGEO_API_KEY;

  const fetchData = async () => {
    if (!coinId) {
      console.warn(' coinId saknas!');
      return;
    }

    setLoading(true);
    setError(false);

    const cacheKey = `chartData_${coinId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(` Hittade cachad grafdata för ${coinId}`);
          setData(parsed);
          setLoading(false);
          return;
        }
      } catch (_) {}
    }

    try {
      console.log(` Hämtar graf för ${coinId} från API...`);

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`,
        {
          headers: apiKey
            ? { 'X-CG-Api-Key': apiKey }
            : {},
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.prices || result.prices.length === 0) {
        throw new Error('API svarade med tom lista');
      }

      const formatted = result.prices.map(p => ({
        time: new Date(p[0]).toLocaleDateString('sv-SE'),
        price: parseFloat(p[1].toFixed(2)),
      }));

      setData(formatted);
      localStorage.setItem(cacheKey, JSON.stringify(formatted));
    } catch (err) {
      console.error(` Fel vid hämtning av graf för ${coinId}:`, err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!showChart && data.length === 0) {
      fetchData();
    }
    setShowChart(!showChart);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handleToggle}>
        {showChart ? 'Dölj graf' : 'Visa graf'}
      </button>

      {loading && <p style={{ fontSize: '0.8rem' }}> Laddar graf...</p>}
      {error && (
        <p style={{ fontSize: '0.8rem', color: 'red' }}>
          Kunde inte ladda grafen för <strong>{coinId}</strong>.
        </p>
      )}
      {showChart && !loading && !error && data.length === 0 && (
        <p style={{ fontSize: '0.8rem' }}>⚠️ Ingen data att visa.</p>
      )}
      {showChart && data.length > 0 && (
        <div style={{ width: '100%', height: 250, marginTop: '1rem' }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00bcd4"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
