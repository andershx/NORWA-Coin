import { NextResponse } from 'next/server';
import { ensureBaseline, BASELINE } from '@/lib/kv';

/**
 * Seed endpoint to initialize the counter to the baseline (158,350 by default).
 * Call once after deploy: GET /api/raise/seed
 * This is public-safe since it only *raises* to baseline, never lowers.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const total = await ensureBaseline();
  return NextResponse.json({ ok: true, totalUsd: Math.round(total), baseline: BASELINE });
}
