import { NextResponse } from 'next/server';

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.CGEO_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    const response = await fetch(`${COINGECKO_BASE}/search?query=${encodeURIComponent(query)}`, {
      headers: {
        'X-CG-Api-Key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data.coins);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
