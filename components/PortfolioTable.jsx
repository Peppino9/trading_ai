import CoinCard from './CoinCard';

export default function PortfolioTable({ portfolio, onAdvice }) {
  if (portfolio.length === 0) return <p>Inga coins i portfolio.</p>;

  return (
    <>
      {portfolio.map((coin) => (
        <CoinCard key={coin.id} coin={coin} onAdvice={onAdvice} />
      ))}
    </>
  );
}
