import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { addToTotalUsd } from '@/lib/kv';

/**
 * Next.js 14 App Router compatible:
 * - No deprecated `export const config`.
 * - Reads raw body via `req.text()` for Stripe signature verification.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ ok: false }, { status: 400 });

  const raw = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      if (session.amount_total && session.currency === 'usd') {
        await addToTotalUsd(session.amount_total / 100);
      }
    }
  } catch (e) {
    console.error('Webhook handling failed', e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
