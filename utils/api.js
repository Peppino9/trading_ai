const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY;

const priceCache = {};
const chartCache = {};

export async function fetchPrice(id) {
  if (priceCache[id]) return priceCache[id];

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&x_cg_demo_api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Misslyckades hämta pris');
  const data = await res.json();
  const price = data[id].usd;
  priceCache[id] = price;
  return price;
}

export async function fetchChart(id) {
  if (chartCache[id]) return chartCache[id];

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&x_cg_demo_api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error('Misslyckades hämta chart');
  const data = await res.json();

  const labels = data.prices.map((p) => new Date(p[0]).toLocaleDateString());
  const points = data.prices.map((p) => p[1]);

  const chart = {
    labels,
    datasets: [
      {
        label: '7d Price (USD)',
        data: points,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.2,
      },
    ],
  };

  chartCache[id] = chart;
  return chart;
}
