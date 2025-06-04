import CoinChart from './CoinChart';

export default function CoinCard({ coin, onAdvice }) {
  const value = coin.amount * coin.current;
  const cost = coin.amount * coin.entry;
  const profit = value - cost;
  const profitColor = profit >= 0 ? 'green' : 'red';

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>{coin.name} ({coin.symbol})</h2>
      <p><strong>Antal:</strong> {coin.amount}</p>
      <p><strong>Pris:</strong> ${coin.entry.toFixed(2)}</p>
      <p><strong>Nuvarande Pris:</strong> ${coin.current.toFixed(2)}</p>
      <p>
        <strong>Value:</strong> ${value.toFixed(2)} | <strong>P/L:</strong>
        <span style={{ color: profitColor }}> {profit >= 0 ? '+' : '-'}${Math.abs(profit).toFixed(2)}</span>
      </p>
      {coin.chart && <CoinChart chart={coin.chart} coin={coin} onAdvice={onAdvice} />}
    </div>
  );
}
