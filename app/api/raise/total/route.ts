import { NextResponse } from 'next/server';
import { getTotalUsd, ensureBaseline } from '@/lib/kv';

export const runtime = 'edge'; // works with @vercel/kv REST

export async function GET() {
  // Make sure baseline is respected even if KV is empty/unavailable
  await ensureBaseline();
  const total = await getTotalUsd();
  return NextResponse.json({ totalUsd: total }, { headers: { 'Cache-Control': 'no-store' } });
}
