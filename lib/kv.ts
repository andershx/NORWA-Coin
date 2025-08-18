import { kv as KV } from '@vercel/kv';

const KEY = 'norwa:raise:totalUsd';
// Use env var if present, default to 158,350
const INITIAL = Number(process.env.RAISE_TOTAL_INITIAL ?? 158350);

export async function getTotalUsd(): Promise<number> {
  // read current
  let total = await KV.get<number>(KEY);
  if (typeof total !== 'number' || Number.isNaN(total)) {
    // initialize once
    await KV.set(KEY, INITIAL);
    total = INITIAL;
  }
  return total;
}

export async function addToTotalUsd(amountUsd: number) {
  if (!Number.isFinite(amountUsd)) return getTotalUsd();
  const cents = Math.round(amountUsd * 100);
  const delta = cents / 100;
  const updated = await KV.incrbyfloat(KEY, delta);
  return updated;
}

export async function setTotalUsd(value: number) {
  const v = Math.max(0, Math.floor(Number(value)));
  await KV.set(KEY, v);
  return v;
}
