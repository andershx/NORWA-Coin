import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getTotalUsd } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Check Stripe (server-side)
  let stripeOk = false; let stripeId: string | null = null;
  try {
    const acct = await stripe.accounts.retrieve();
    stripeOk = !!acct?.id;
    stripeId = acct?.id ?? null;
  } catch {}

  // Check KV & read total
  let kvOk = false; let total: number | null = null;
  try {
    total = await getTotalUsd();
    kvOk = true;
  } catch {}

  const envs = {
    STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY),
    STRIPE_WEBHOOK_SECRET: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    KV_REST_API_URL: Boolean(process.env.KV_REST_API_URL),
    KV_REST_API_TOKEN: Boolean(process.env.KV_REST_API_TOKEN),
    RAISE_TOTAL_INITIAL: Boolean(process.env.RAISE_TOTAL_INITIAL),
  };

  return NextResponse.json({ ok: stripeOk && kvOk, stripeOk, stripeId, kvOk, total, envs });
}
