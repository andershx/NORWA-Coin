import { NextResponse } from 'next/server';
import { getTotalUsd } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  const total = await getTotalUsd();
  return NextResponse.json({ totalUsd: Math.round(total) });
}
