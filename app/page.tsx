'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from '@/components/ConnectButton';
import SpinningCard from '@/components/SpinningCard';
import RwaShowcase from '@/components/RwaShowcase';
import RaiseButton from '@/components/RaiseButton';
import TwitterButton from "@/components/TwitterButton";


export default function Home(){return(<main>
<header className="sticky top-0 z-10 backdrop-blur border-b border-[#232a3d] bg-[#0f1520]/60"><div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
<Link href="#" className="flex items-center gap-2 font-bold"><Image src="/logo.svg" alt="NORWA" width={32} height={32}/><span>NORWA Coin</span></Link>
<nav aria-label="Main navigation" className="hidden md:block"><a href="#om" className="nav-a">About</a><a href="#rwa" className="nav-a">RWA</a><a href="#tokenomics" className="nav-a">Tokenomics</a><a href="#veikart" className="nav-a">Roadmap</a><a href="#faq" className="nav-a">FAQ</a></nav>
<ConnectButton/></div></header><header className="flex justify-between items-center p-4 bg-black">
  <div className="text-xl font-bold">NORWA</div>
  <TwitterButton />
</header>


<section className="hero-grid"><div><h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Tokenize real‑world assets. <span className="grad">Secure. Transparent. Global.</span></h1>
<p className="mt-4 text-lg" style={{color:'var(--muted)'}}>NORWA Coin lets investors own and trade fractions of real‑world assets (RWA) – with on‑chain proofs and clear governance on <strong>Solana</strong>.</p>
<div className="flex gap-3 mt-6"><a className="btn btn-primary" href="#om">Get started</a><a className="btn btn-ghost" href="#whitepaper">Read the whitepaper (soon)</a></div>
<div className="flex gap-2 mt-6 flex-wrap" style={{color:'var(--muted)'}}><span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">Solana‑native</span><span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">On‑chain proofs</span><span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">KYC/AML‑ready</span></div></div>
<div className="relative h-72 md:h-96" aria-hidden="true"><div className="absolute -top-2 left-10 w-56 h-56 rounded-full blur-3xl opacity-80" style={{background:'radial-gradient(circle,#ffffff,#ffb3b3 35%,transparent 65%)'}}/><div className="absolute bottom-2 right-2 w-72 h-72 rounded-full blur-3xl opacity-80" style={{background:'radial-gradient(circle,#ffffff,#ff6b6b 35%,transparent 70%)'}}/><div className="absolute top-1/2 left-1/3 w-44 h-44 rounded-full blur-2xl opacity-80" style={{background:'radial-gradient(circle,#ffffff,#ff1a75 35%,transparent 60%)'}}/></div></section>

{/* Spinning credit card section (unchanged visually) */}
<section className="section section-alt">
  <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
    <div>
      <h2 className="text-3xl md:text-4xl font-bold">NORWA <span className="grad">One</span></h2>
      <p className="mt-3" style={{color:'var(--muted)'}}>A modern, user‑centric crypto experience with <strong>SOL cashback</strong> and seamless on‑chain verification — styled in NORWA red.</p>
      <div className="mt-6 flex gap-3">
        <a className="btn btn-primary" href="/norwa-one">Explore NORWA One</a>
        <a className="btn btn-ghost" href="#tokenomics">See tokenomics</a>
      </div>
    </div>
    <div className="flex justify-center md:justify-end">
      <SpinningCard/>
    </div>
  </div>
</section>

  
  <RwaShowcase />


  <RaiseButton />


<section id="om" className="section"><div className="grid md:grid-cols-2 gap-6"><div><h2 className="text-3xl font-bold">Why NORWA?</h2><p className="mt-2" style={{color:'var(--muted)'}}>An original RWA ecosystem focused on clear ownership, auditable attestations, and liquidity through open protocols.</p><ul className="mt-4 space-y-2"><li>✓ Attestations and oracles for verifiable value</li><li>✓ Liquidity via DEX pools and permissioned marketplaces</li><li>✓ Compliance‑friendly token standards and whitelist</li></ul></div><div className="card"><h3 className="text-xl font-semibold mb-2">Technical overview</h3><dl className="grid grid-cols-[130px_1fr] gap-x-4 gap-y-1 kv"><dt>Chain</dt><dd>Solana (primary)</dd><dt>Standard</dt><dd>SPL (utility), RWA standard TBA</dd><dt>Oracle</dt><dd>Chainlink (planned)</dd><dt>Custody</dt><dd>Third‑party with attestations (TBA)</dd></dl></div></div></section>

<section id="rwa" className="section section-alt"><h2 className="text-3xl font-bold mb-6">How RWA works at NORWA</h2><div className="grid md:grid-cols-3 gap-5"><div className="tile"><h3 className="font-semibold text-xl">1. Verify the asset</h3><p>The asset is documented and attested. Evidence is linked on‑chain.</p></div><div className="tile"><h3 className="font-semibold text-xl">2. Tokenize</h3><p>Rule‑based tokens (ownership, transfer, whitelist) are issued on‑chain.</p></div><div className="tile"><h3 className="font-semibold text-xl">3. Marketplace</h3><p>Trade on DEX or permissioned venues; price data via oracles.</p></div></div></section>

<section id="tokenomics" className="section"><h2 className="text-3xl font-bold mb-6">Tokenomics</h2><div className="grid md:grid-cols-2 gap-6"><div><p style={{color:'var(--muted)'}}>NORWA is used for fees and governance in the ecosystem. RWA shares are issued separately as compliance tokens.</p><ul className="mt-4 space-y-2"><li className="relative border border-[#2a3148] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Community & incentives — 28%</li><li className="relative border border-[#2a3148] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Liquidity & market making — 22%</li><li className="relative border border-[#2a3148] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Development — 20%</li><li className="relative border border-[#2a3148] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Partnerships — 15%</li><li className="relative border border-[#2a3148] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Team & advisors — 15%</li></ul></div><div className="card"><h3 className="text-xl font-semibold mb-2">Key parameters</h3><dl className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-1 kv"><dt>Total supply</dt><dd>1,000,000,000 NORWA</dd><dt>Emission</dt><dd>Linear/vested</dd><dt>Launch</dt><dd>IDO/Reg D (US) — TBA</dd></dl></div></div></section>

<section id="veikart" className="section section-alt"><h2 className="text-3xl font-bold mb-6">Roadmap</h2><ol className="space-y-3"><li className="border border-dashed border-[#353950] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q1:</strong> Concept, entity, legal</li><li className="border border-dashed border-[#353950] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q2:</strong> Smart contracts, KYC, internal test</li><li className="border border-dashed border-[#353950] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q3:</strong> Soft‑launch for whitelisted investors</li><li className="border border-dashed border-[#353950] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q4:</strong> RWA expansion, mobile app, exchange listing</li></ol></section>

<section id="faq" className="section"><h2 className="text-3xl font-bold mb-4">FAQ</h2><details className="mb-2"><summary className="cursor-pointer">Is NORWA a security or a utility token?</summary><p style={{color:'var(--muted)'}}>NORWA is used for fees and governance. RWA shares may be classified as securities and are issued separately under applicable regulations.</p></details><details className="mb-2"><summary className="cursor-pointer">Can I invest without KYC?</summary><p style={{color:'var(--muted)'}}>No — RWA‑related purchases require KYC/AML and, where relevant, investor qualification.</p></details><details><summary className="cursor-pointer">Which assets launch first?</summary><p style={{color:'var(--muted)'}}>We are evaluating precious metals and income‑producing real estate. The final list will be announced ahead of launch.</p></details></section>

<footer className="py-10"><div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-6"><div><strong>NORWA Coin</strong><p style={{color:'var(--muted)'}}>© {new Date().getFullYear()} NORWA Labs. Original content, inspired by modern RWA platforms.</p></div><form className="grid grid-cols-[1fr_auto] gap-2"><label htmlFor="email" className="sr-only">Email</label><input id="email" type="email" placeholder="you@example.com" className="rounded-xl border border-[#28324d] bg-[#0e1422] px-3 py-2"/><button className="btn">Subscribe</button></form></div></footer>
</main>)}
