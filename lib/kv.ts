import { kv as KV } from '@vercel/kv';

const KEY = 'norwa:raise:totalUsd';
export const BASELINE = Number(process.env.RAISE_TOTAL_INITIAL ?? 158350);

export async function ensureBaseline(): Promise<number> {
  let total = await KV.get<number>(KEY);
  if (typeof total !== 'number' || Number.isNaN(total) || total < BASELINE) {
    await KV.set(KEY, BASELINE);
    total = BASELINE;
  }
  return total;
}

export async function getTotalUsd(): Promise<number> {
  // Always enforce the baseline
  return ensureBaseline();
}

export async function addToTotalUsd(amountUsd: number) {
  if (!Number.isFinite(amountUsd)) return getTotalUsd();
  const cents = Math.round(amountUsd * 100);
  const delta = cents / 100;
  const updated = await KV.incrbyfloat(KEY, delta);
  // Ensure we never drop below baseline due to any rounding or resets
  if (updated < BASELINE) {
    await KV.set(KEY, BASELINE);
    return BASELINE;
  }
  return updated;
}
