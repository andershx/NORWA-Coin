import { NextRequest, NextResponse } from 'next/server';
import { setTotalUsd } from '@/lib/kv';

/**
 * Admin-only endpoint to set the total raised explicitly.
 * Protect with env ADMIN_KEY and send header: x-admin-key: <ADMIN_KEY>
 * Usage: POST /api/raise/set-total  body: { "value": 158350 }
 */
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const adminKey = process.env.ADMIN_KEY;
  const provided = req.headers.get('x-admin-key');
  if (!adminKey || provided !== adminKey) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  try {
    const { value } = await req.json();
    const v = Math.floor(Number(value));
    if (!Number.isFinite(v) || v < 0) {
      return NextResponse.json({ ok: false, error: 'invalid value' }, { status: 400 });
    }
    const updated = await setTotalUsd(v);
    return NextResponse.json({ ok: true, totalUsd: updated });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
}
