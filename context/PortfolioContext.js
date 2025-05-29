'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPositions(data);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error.message);
      }
    };

    fetchPositions();
  }, []);

  async function addPosition(data) {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPositions(prev => [...prev, { ...data, id: result.id }]);
    } catch (error) {
      console.error('Failed to add position:', error.message);
    }
  }

  return (
    <PortfolioContext.Provider value={{ positions, addPosition }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
