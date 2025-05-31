'use client';
import React, { useEffect, useState } from 'react';
import { calculateRSI } from '../utils/rsi';

export default function RSIAdvisor({ symbol }) {
  const [rsi, setRsi] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.gemini.com/v2/candles/${symbol}/1hr`);
        const data = await response.json();
        console.log("Gemini DATA:", data);
  
        if (!Array.isArray(data)) {
          console.error("Fel: Inte en array");
          return;
        }
  
        const closes = data.map(c => c[4]);
        console.log("Closes:", closes);
  
        if (closes.length < 15) {
          console.warn("Inte tillräckligt med data");
          return;
        }
  
        const rsis = calculateRSI(closes);
        console.log("RSIs:", rsis);
  
        const last = rsis[rsis.length - 1];
        console.log("LAST RSI:", last);
        setRsi(last);
      } catch (err) {
        console.error("RSI fetch failed:", err.message);
      }
    }
  
    fetchData();
  }, [symbol]);
  
  

  if (rsi === null) return <p>Laddar RSI...</p>;

  let advice;
  if (rsi > 70) {
    advice = '🚨 Överköpt – överväg att sälja';
  } else if (rsi < 30) {
    advice = '💰 Översåld – köpläge?';
  } else {
    advice = '📊 Inget tydligt signal – avvakta';
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '1rem' }}>
      <h4>RSI för {symbol.toUpperCase()}</h4>
      <p>RSI: {rsi.toFixed(2)}</p>
      <p>{advice}</p>
    </div>
  );
}
