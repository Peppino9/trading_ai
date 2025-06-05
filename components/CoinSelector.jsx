export default function CoinSelector({ coins, selectedCoin, setSelectedCoin }) {
  return (
    <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} required>
      <option value="">Välj en coin</option>
      {coins.map((coin) => (
        <option key={coin.id} value={coin.id}>
          {coin.name} ({coin.symbol.toUpperCase()})
        </option>
      ))}
    </select>
  );
}
