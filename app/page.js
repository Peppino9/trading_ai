'use client';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PositionForm from '../components/PositionForm';
import PortfolioList from '../components/PortfolioList';
import RSIAdvisor from '../components/RSIAdvisor'; // 👈 Lägg till importen

export default function Home() {
  const [selected, setSelected] = useState(null);

  return (
    <main className="p-4">
      <h1>Crypto Portfolio Tracker</h1>
      <SearchBar onSelect={setSelected} />
      {selected && <PositionForm coin={selected} />}
      <PortfolioList />

      <div className="mt-6">
        <h2 className="text-xl font-bold">RSI-Analys</h2>
        <RSIAdvisor symbol="btcusd" />
        <RSIAdvisor symbol="ethusd" />
      </div>
    </main>
  );
}
