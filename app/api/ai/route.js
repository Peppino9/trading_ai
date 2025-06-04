export async function POST(request) {
  const { coinId, prices } = await request.json();

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
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return new Response(JSON.stringify({ error: errorText }), { status: 500 });
  }

  const data = await res.json();
  const advice = data.choices[0].message.content;
  return new Response(JSON.stringify({ advice }), { status: 200 });
}
