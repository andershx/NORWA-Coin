import { kv } from '@vercel/kv';

export async function getTotalUsd() {
  const total = await kv.get<number>('total_usd');
  // Default to 158940 if no value stored yet
  return total ?? 158940;
}

export async function incrementTotalUsd(amount: number) {
  const total = await getTotalUsd();
  const newTotal = total + amount;
  await kv.set('total_usd', newTotal);
  return newTotal;
}
