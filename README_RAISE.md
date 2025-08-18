# NORWA — Raise Money (Stripe Checkout)

This adds a **Pay with Card** button and a **Total Money Raised** counter that auto-updates after each successful payment.

## What you get
- `components/RaiseButton.tsx` — UI (amount input + pay button + live total)
- API routes (Next.js App Router):
  - `app/api/create-checkout-session/route.ts` — creates Stripe Checkout session
  - `app/api/stripe-webhook/route.ts` — receives Stripe webhook and increments total
  - `app/api/raise/total/route.ts` — returns the current total
- `lib/stripe.ts`, `lib/kv.ts` — helpers
- `app/thank-you/page.tsx` — success page

## Requirements
- A Stripe account
- A Vercel project
- Vercel KV (Upstash) enabled (free tier is fine)

## 1) Install deps
Add these to your `package.json` (or run in your project):
```
npm install stripe @vercel/kv
```

## 2) Set environment variables (in Vercel → Settings → Environment Variables)
- `STRIPE_SECRET_KEY` — from Stripe dashboard
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from Stripe dashboard (not strictly required here, but good to have)
- `STRIPE_WEBHOOK_SECRET` — after you create a webhook endpoint (step 4)
- `RAISE_TOTAL_INITIAL` — set to `158000`
- `KV_REST_API_URL` — from Vercel KV
- `KV_REST_API_TOKEN` — from Vercel KV

## 3) Add the component to your homepage
At the top of `app/page.tsx`:
```ts
import RaiseButton from '@/components/RaiseButton';
```
Render it where you want the section to appear:
```tsx
<RaiseButton />
```

## 4) Configure Stripe Webhook
- In Stripe Dashboard → Developers → Webhooks → "Add endpoint"
- Endpoint URL (production): `https://YOUR-DOMAIN.vercel.app/api/stripe-webhook`
- Events to send: `checkout.session.completed`
- Copy the **Signing secret** → add as `STRIPE_WEBHOOK_SECRET` in Vercel envs.

## 5) Deploy
Commit and push to GitHub. Vercel will build and deploy. Once live:
- Users choose an amount and click **Pay with Card** → Checkout opens.
- After payment completes, Stripe calls your webhook → total is incremented in KV.
- The component polls `/api/raise/total` every few seconds to show the updated number.
