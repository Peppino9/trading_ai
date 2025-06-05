import CoinChart from './CoinChart';

export default function CoinCard({ coin, onAdvice, onRemove }) {
  const value = coin.amount * coin.current;
  const cost = coin.amount * coin.entry;
  const profit = value - cost;
  const profitColor = profit >= 0 ? 'green' : 'red';

  return (
    <div className="coin-card">
      <h5>{coin.name} <span style={{ color: '#666' }}>({coin.symbol.toUpperCase()})</span></h5>

      <ul>
        <li><strong>Antal:</strong> {coin.amount}</li>
        <li><strong>Inköpspris:</strong> ${coin.entry.toFixed(2)}</li>
        <li><strong>Nuvarande pris:</strong> ${coin.current.toFixed(2)}</li>
        <li>
          <strong>Värde:</strong> ${value.toFixed(2)} |
          <strong> P/L:</strong> <span style={{ color: profitColor }}>
            {profit >= 0 ? '+' : '-'}${Math.abs(profit).toFixed(2)}
          </span>
        </li>
      </ul>

      {coin.chart && (
        <div style={{ marginBottom: '1rem' }}>
          <CoinChart chart={coin.chart} coin={coin} onAdvice={onAdvice} />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="remove-btn" onClick={() => onRemove(coin.id)}>Ta bort</button>
      </div>
    </div>
  );
}
