'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio');
    if (stored) {
      setPositions(JSON.parse(stored));
    }
  }, []);

  function addPosition(data) {
    const newPosition = { ...data, id: crypto.randomUUID() };
    const updated = [...positions, newPosition];
    setPositions(updated);
    localStorage.setItem('portfolio', JSON.stringify(updated));
  }

  function removePosition(id) {
    const updated = positions.filter(p => p.id !== id);
    setPositions(updated);
    localStorage.setItem('portfolio', JSON.stringify(updated));
  }

  return (
    <PortfolioContext.Provider value={{ positions, addPosition, removePosition }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
