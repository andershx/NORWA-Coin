# NORWA — Set Total Raised to $158,350

This patch:
- Sets the **initial total** to **$158,350** if KV is empty.
- Adds an **admin-only endpoint** to force-set the total: `POST /api/raise/set-total`.
- Makes the UI show **0** while loading (instead of "—").

## 1) Env vars
In Vercel → Settings → Environment Variables:
- `RAISE_TOTAL_INITIAL` = `158350`
- (optional) `ADMIN_KEY` = any strong secret (used to protect the set-total route)

## 2) One-time set (if you already had KV data and want to override)
Send a request (e.g., from Postman or curl):

POST https://YOUR-DOMAIN.vercel.app/api/raise/set-total
Headers:
  x-admin-key: YOUR_ADMIN_KEY
Body (JSON):
  { "value": 158350 }

If you don't set `ADMIN_KEY`, the route will refuse to run for safety.

## 3) Stripe auto-increments
After successful Stripe Checkout (webhook), the total increments automatically.

## 4) UI
`components/RaiseButton.tsx` now shows `$0` while the first fetch happens, then updates to the live value.
