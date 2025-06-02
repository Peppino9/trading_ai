'use client';
import { useState } from 'react';
<<<<<<< Updated upstream
import { usePortfolio } from '../context/PortfolioContext';

export default function PositionForm({ coin }) {
  const { addPosition } = usePortfolio();
=======

export default function PositionForm({ coin, add }) {
>>>>>>> Stashed changes
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< Updated upstream
    addPosition({ coinId: coin.id, entryPrice: parseFloat(price), amount: parseFloat(amount) });
=======
    add({ coinId: coin.id, entryPrice: parseFloat(price), amount: parseFloat(amount) });
    setPrice('');
    setAmount('');
>>>>>>> Stashed changes
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Position: {coin.name}</h3>
<<<<<<< Updated upstream
      <input type="number" step="any" placeholder="Entry Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input type="number" step="any" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
=======
      <input
        type="number"
        step="any"
        placeholder="Entry Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        type="number"
        step="any"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
>>>>>>> Stashed changes
      <button type="submit">Add</button>
    </form>
  );
}
