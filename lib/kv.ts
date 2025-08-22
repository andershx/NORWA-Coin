import { kv } from '@vercel/kv';

/** Baseline total shown when KV has not been initialized yet. */
export const BASELINE = 158940;

/** Get the total USD raised (falls back to BASELINE if not set). */
export async function getTotalUsd(): Promise<number> {
  const total = await kv.get<number>('total_usd');
  return total ?? BASELINE;
}

/** Explicitly set the total USD raised. */
export async function setTotalUsd(value: number): Promise<number> {
  await kv.set('total_usd', value);
  return value;
}

/** Add an amount to the total. */
export async function addToTotalUsd(amount: number): Promise<number> {
  const current = await getTotalUsd();
  const next = current + amount;
  await kv.set('total_usd', next);
  return next;
}

/** Back-compat alias. */
export async function incrementTotalUsd(amount: number): Promise<number> {
  return addToTotalUsd(amount);
}

/** Ensure the KV has at least the baseline value; return the resulting total. */
export async function ensureBaseline(): Promise<number> {
  const current = await kv.get<number>('total_usd');
  if (current === null || current === undefined) {
    await kv.set('total_usd', BASELINE);
    return BASELINE;
  }
  return current;
}
