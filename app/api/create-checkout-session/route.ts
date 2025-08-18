import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { amountUsd } = await req.json();
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const amt = Math.max(5, Math.min(100000, Math.floor(Number(amountUsd) || 25)));
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'NORWA Raise (Support Payment)' },
          unit_amount: amt * 100,
        },
        quantity: 1,
      }],
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      metadata: { type: 'raise' },
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error('checkout error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
