'use client';
import { useState } from 'react';

export default function PositionForm({ coin, add }) {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    add({ coinId: coin.id, entryPrice: parseFloat(price), amount: parseFloat(amount) });
    setPrice('');
    setAmount('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Position: {coin.name}</h3>
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
      <button type="submit">Add</button>
    </form>
  );
}
