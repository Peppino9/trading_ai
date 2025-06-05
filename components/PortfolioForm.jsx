import CoinSelector from './CoinSelector';

export default function PortfolioForm({ coins, selectedCoin, setSelectedCoin, onAdd }) {
  return (
    <form onSubmit={onAdd}>
      <CoinSelector coins={coins} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
      <input name="entry" type="number" placeholder="Entry Price ($)" step="0.01" required />
      <input name="amount" type="number" placeholder="Amount" step="0.0001" required />
      <button type="submit">Lägg till</button>
    </form>
  );
}
