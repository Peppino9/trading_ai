'use client';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CoinChart({ chart, coin, onAdvice }) {
  const [loading, setLoading] = useState(false);

  const handleAdvice = async () => {
    setLoading(true);
    await onAdvice(coin);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <Line data={chart} />
      <button onClick={handleAdvice} disabled={loading}>
        {loading ? 'Analyserar...' : 'AI Råd'}
      </button>
      {coin.advice && (
        <p>
          <strong>OpenAI:</strong> {coin.advice}
        </p>
      )}
    </div>
  );
}
