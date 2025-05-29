export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'portfolio.json');

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const positions = JSON.parse(data);
    return NextResponse.json(positions);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, '[]');
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newEntry = await request.json();
    let content;
    try {
      content = await fs.readFile(filePath, 'utf-8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        content = '[]';
      } else throw err;
    }
    const positions = JSON.parse(content);
    const id = Date.now().toString();
    positions.push({ id, ...newEntry });
    await fs.writeFile(filePath, JSON.stringify(positions, null, 2));
    return NextResponse.json({ id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
