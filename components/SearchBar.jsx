'use client';
import { useState } from 'react';

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Failed to fetch search results:', error.message);
      }
    } else {
      setResults([]); // clear results if query is too short
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search coin..."
      />
      <ul>
        {results.map(c => (
          <li key={c.id} onClick={() => onSelect(c)}>
            {c.name} ({c.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}
