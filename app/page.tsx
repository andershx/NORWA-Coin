'use client';

import SpinningCard from "../components/SpinningCard";
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* === Your existing hero / homepage content === */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to NORWA Coin</h1>
        <p className="mt-4 text-lg">The future of RWA-backed cryptocurrency.</p>
      </section>

      {/* === New Spinning Card Section === */}
      <section className="py-16 flex justify-center">
        <SpinningCard />
      </section>
    </main>
  );
}
