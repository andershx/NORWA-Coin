import SpinningCard from '@/components/SpinningCard';
import Link from 'next/link';

export default function NorwaOnePage() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-8 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            NORWA <span className="grad">One</span>
          </h1>
          <p className="mt-4 text-lg" style={{color:'var(--muted)'}}>
            A modern, user‑centric crypto experience with <strong>SOL cashback</strong>
            and seamless on‑chain verification on Solana.
          </p>
          <div className="mt-6 flex gap-3">
            <a className="btn btn-primary" href="#features">Explore features</a>
            <Link className="btn btn-ghost" href="/">Back to home</Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <SpinningCard />
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-5">
        <div className="tile">
          <h3 className="text-xl font-semibold">SOL cashback</h3>
          <p style={{color:'var(--muted)'}} className="mt-1">
            Earn SOL back on eligible purchases and activity in the NORWA ecosystem.
            Payouts follow on‑chain rules and metrics.
          </p>
        </div>
        <div className="tile">
          <h3 className="text-xl font-semibold">RWA‑ready infrastructure</h3>
          <p style={{color:'var(--muted)'}} className="mt-1">
            Tokenization, attestations, and rights controls built for real assets —
            with an emphasis on auditability and compliance‑friendly design.
          </p>
        </div>
        <div className="tile">
          <h3 className="text-xl font-semibold">Seamless wallet</h3>
          <p style={{color:'var(--muted)'}} className="mt-1">
            Connect your Solana wallet and get started. Buy NORWA right from the page and receive tokens instantly.
          </p>
        </div>
      </section>
    </main>
  );
}
