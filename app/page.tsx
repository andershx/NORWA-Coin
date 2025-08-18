'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from '@/components/ConnectButton';

export default function Home() {
  return (
    <main>
      <header className="sticky top-0 z-10 backdrop-blur border-b border-[#232a3d] bg-[#0f1520]/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
          <Link href="#" className="flex items-center gap-2 font-bold">
            <Image src="/logo.svg" alt="NORWA" width={32} height={32} />
            <span>NORWA Coin</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden md:block">
            <a href="#about" className="nav-a">About</a>
            <a href="#rwa" className="nav-a">RWA</a>
            <a href="#tokenomics" className="nav-a">Tokenomics</a>
            <a href="#roadmap" className="nav-a">Roadmap</a>
            <a href="#faq" className="nav-a">FAQ</a>
          </nav>
          <ConnectButton />
        </div>
      </header>

      <section className="hero-grid">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Tokenize real-world assets. <span className="grad">Secure. Transparent. Global.</span>
          </h1>
          <p className="mt-4 text-lg" style={{ color: 'var(--muted)' }}>
            NORWA Coin allows investors to own and trade fractions of real-world assets (RWA) – with on-chain proof and clear governance.
          </p>
          <div className="flex gap-3 mt-6">
            <a className="btn btn-primary" href="#about">Get Started</a>
            <a className="btn btn-ghost" href="#whitepaper">Read Whitepaper (coming soon)</a>
          </div>
          <div className="flex gap-2 mt-6 flex-wrap" style={{ color: 'var(--muted)' }}>
            <span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">Solana Network</span>
            <span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">On-chain Proof</span>
            <span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">KYC/AML Ready</span>
          </div>
        </div>
        <div className="relative h-72 md:h-96" aria-hidden="true">
          <div className="absolute -top-2 left-10 w-56 h-56 rounded-full blur-3xl opacity-80"
            style={{ background: 'radial-gradient(circle,#ffffff,#ffb3b3 35%,transparent 65%)' }} />
          <div className="absolute bottom-2 right-2 w-72 h-72 rounded-full blur-3xl opacity-80"
            style={{ background: 'radial-gradient(circle,#ffffff,#ff6b6b 35%,transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/3 w-44 h-44 rounded-full blur-2xl opacity-80"
            style={{ background: 'radial-gradient(circle,#ffffff,#ff1a75 35%,transparent 60%)' }} />
        </div>
      </section>
    </main>
  );
}
