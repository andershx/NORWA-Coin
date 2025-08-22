import { kv } from '@vercel/kv';

/** Baseline total shown when KV has not been initialized yet. */
export const BASELINE = 158940;

/** Get the total USD raised (falls back to BASELINE if not set or KV unavailable). */
export async function getTotalUsd(): Promise<number> {
  try {
    const total = await kv.get<number>('total_usd');
    return total ?? BASELINE;
  } catch (e) {
    // If KV is not configured, still show the baseline so UI isn't 0
    return BASELINE;
  }
}

/** Explicitly set the total USD raised. */
export async function setTotalUsd(value: number): Promise<number> {
  try {
    await kv.set('total_usd', value);
  } catch {}
  return value;
}

/** Add an amount to the total. */
export async function addToTotalUsd(amount: number): Promise<number> {
  const current = await getTotalUsd();
  const next = current + amount;
  try {
    await kv.set('total_usd', next);
  } catch {}
  return next;
}

/** Back-compat alias. */
export async function incrementTotalUsd(amount: number): Promise<number> {
  return addToTotalUsd(amount);
}

/** Ensure the KV has at least the baseline value; return the resulting total. */
export async function ensureBaseline(): Promise<number> {
  try {
    const current = await kv.get<number>('total_usd');
    if (current === null || current === undefined) {
      await kv.set('total_usd', BASELINE);
      return BASELINE;
    }
    return current;
  } catch {
    // KV not available: nothing to seed, return baseline
    return BASELINE;
  }
}
