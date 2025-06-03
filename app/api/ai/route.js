import { NextResponse } from 'next/server';

const openaiApiKey = process.env.OPENAI_API_KEY;

export async function POST(request) {
  try {
    const { coinId, prices } = await request.json();

    if (!prices || prices.length < 3) {
      return NextResponse.json({ error: 'För lite data för analys' }, { status: 400 });
    }

    const messages = [
      {
        role: 'system',
        content: 'Du är en AI som ger enkla investeringsrekommendationer (Köp, Sälj eller Håll) baserat på prisutveckling.',
      },
      {
        role: 'user',
        content: `Här är de senaste 7 dagarnas priser för ${coinId}: [${prices.join(', ')}]. Vad bör jag göra?`,
      },
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenAI API-fel: ${err}`);
    }

    const data = await res.json();
    const text = data.choices[0].message.content;

    return NextResponse.json({ recommendation: text.trim() });
  } catch (err) {
    console.error(' AI-route error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
