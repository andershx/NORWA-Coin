import { kv as KV } from '@vercel/kv';

const KEY = 'norwa:raise:totalUsd';
const INITIAL = Number(process.env.RAISE_TOTAL_INITIAL || 158000);

export async function getTotalUsd(): Promise<number> {
  let total = await KV.get<number>(KEY);
  if (typeof total !== 'number') {
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
