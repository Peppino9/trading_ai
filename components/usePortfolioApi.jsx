'use client';
export function createPortfolioApi(setPositions) {
  const STORAGE_KEY = 'portfolio';

  const load = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setPositions(JSON.parse(data));
    } else {
      setPositions([]);
    }
  };

  const add = ({ coinId, entryPrice, amount }) => {
    const newItem = {
      id: Date.now(),
      coinId,
      entryPrice,
      amount,
    };
    setPositions((prev) => {
      const updated = [...prev, newItem];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const remove = (id) => {
    setPositions((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const update = (id, newData) => {
    setPositions((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, ...newData } : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { load, add, remove, update };
}
