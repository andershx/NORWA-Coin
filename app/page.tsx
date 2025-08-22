import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from '@/components/ConnectButton';
import TwitterButton from '@/components/TwitterButton';

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
            <a href="#om" className="nav-a">About</a>
            <a href="#rwa" className="nav-a">RWA</a>
            <a href="#tokenomics" className="nav-a">Tokenomics</a>
            <a href="#veikart" className="nav-a">Roadmap</a>
            <a href="#faq" className="nav-a">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <TwitterButton />
            <ConnectButton />
          </div>
        </div>
      </header>

      <section className="hero-grid">
        <h1 className="text-4xl font-bold">Twitter button test placement</h1>
      </section>
    </main>
  )
}
