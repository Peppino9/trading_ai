'use client';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function CoinChart({ coinId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!coinId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`,
          {
            headers: {
              'X-CG-Api-Key': process.env.NEXT_PUBLIC_CGEO_API_KEY, 
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const formatted = result.prices.map(p => ({
          time: new Date(p[0]).toLocaleDateString(),
          price: p[1],
        }));
        setData(formatted);
      } catch (error) {
        console.error('Failed to fetch market chart data:', error.message);
      }
    };

    fetchData();
  }, [coinId]);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="price" />
    </LineChart>
  );
}
