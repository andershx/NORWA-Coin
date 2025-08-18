# NORWA — Stripe + Vercel KV (Upstash) Patch

This folder adds a **Pay with Card** button and a **Total Money Raised** counter (starting at $158,000).

## Drop-in files
- `components/RaiseButton.tsx`
- `lib/stripe.ts`, `lib/kv.ts`
- API routes:
  - `app/api/create-checkout-session/route.ts`
  - `app/api/stripe-webhook/route.ts` (Next 14 compatible)
  - `app/api/raise/total/route.ts`
  - `app/api/health/route.ts`
- `app/thank-you/page.tsx`
- `optional/package.json.example` — only use if your project is missing `stripe` and `@vercel/kv`

## Minimal steps
1) **Add env vars** in Vercel → *Settings → Environment Variables*:
   - `STRIPE_SECRET_KEY` — from Stripe dashboard
   - `STRIPE_WEBHOOK_SECRET` — from Stripe webhooks (after you add endpoint)
   - `RAISE_TOTAL_INITIAL` = `158000`
   - `KV_REST_API_URL`, `KV_REST_API_TOKEN` — from Vercel KV (Upstash)
2) Ensure your `package.json` has **stripe** and **@vercel/kv** in dependencies.
   - If not, either copy `optional/package.json.example` to the root as `package.json`
     (merging your scripts), or run:
     ```bash
     npm install stripe @vercel/kv
     ```
3) In Stripe → **Developers → Webhooks → Add endpoint**:
   - URL: `https://YOUR-DOMAIN.vercel.app/api/stripe-webhook`
   - Events: `checkout.session.completed`
   - Copy the **Signing secret** to `STRIPE_WEBHOOK_SECRET` in Vercel.
4) Add the section to your homepage:
   ```tsx
   import RaiseButton from '@/components/RaiseButton';
   // ...
   <RaiseButton />
   ```
5) Commit & push. Visit `/api/health` to verify: it should show `{ ok: true, ... }` and `total: 158000`.
