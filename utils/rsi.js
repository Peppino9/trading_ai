// utils/rsi.js
export function calculateRSI(closes, period = 14) {
    let gains = [];
    let losses = [];
  
    for (let i = 1; i < closes.length; i++) {
      const delta = closes[i] - closes[i - 1];
      if (delta >= 0) {
        gains.push(delta);
        losses.push(0);
      } else {
        gains.push(0);
        losses.push(-delta);
      }
    }
  
    let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  
    let rsis = [];
    rsis[period] = 100 - 100 / (1 + avgGain / avgLoss);
  
    for (let i = period + 1; i < closes.length; i++) {
      avgGain = (avgGain * (period - 1) + gains[i - 1]) / period;
      avgLoss = (avgLoss * (period - 1) + losses[i - 1]) / period;
      rsis[i] = 100 - 100 / (1 + avgGain / avgLoss);
    }
  
    return rsis;
  }
  