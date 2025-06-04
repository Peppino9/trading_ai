import CoinCard from './CoinCard';

export default function PortfolioTable({ portfolio, onAdvice, onRemove }) {
  if (portfolio.length === 0) return <p>Inga coins i portföljen.</p>;

  return (
    <div className="portfolio-grid">
      {portfolio.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
          onAdvice={onAdvice}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
