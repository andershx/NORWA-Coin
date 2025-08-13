'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from '@/components/ConnectButton';
import SpinningCard from '@/components/SpinningCard';

export default function Home(){
  return (<main>
    <header className="sticky top-0 z-10 backdrop-blur border-b border-[#232a3d] bg-[#0f1520]/60">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link href="#" className="flex items-center gap-2 font-bold">
          <Image src="/logo.svg" alt="NORWA" width={32} height={32}/> <span>NORWA Coin</span>
        </Link>
        <nav aria-label="Hovednavigasjon" className="hidden md:block">
          <a href="#om" className="nav-a">Om</a><a href="#rwa" className="nav-a">RWA</a><a href="#tokenomics" className="nav-a">Tokenomics</a><a href="#veikart" className="nav-a">Veikart</a><a href="#faq" className="nav-a">FAQ</a>
        </nav>
        <ConnectButton/>
      </div>
    </header>

    <section className="hero-grid">
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Tokeniser virkelige eiendeler. <span className="grad">Trygt. Gjennomsiktig. Globalt.</span>
        </h1>
        <p className="mt-4 text-lg" style={{color:'var(--muted)'}}>NORWA Coin gjør det mulig å eie og handle brøkdeler av virkelige eiendeler (RWA) – fra edelmetaller til eiendom – via en regulatorisk‑bevisst infrastruktur.</p>
        <div className="flex gap-3 mt-6"><a className="btn btn-primary" href="#om">Kom i gang</a><a className="btn btn-ghost" href="#whitepaper">Les whitepaper (snart)</a></div>
        <div className="flex gap-2 mt-6 flex-wrap" style={{color:'var(--muted)'}}>
          <span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">EVM‑kompatibel</span>
          <span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">On‑chain bevis</span>
          <span className="border border-[#26304a] rounded-full px-2.5 py-1 text-sm">KYC/AML‑klar</span>
        </div>
      </div>
      <div className="relative h-72 md:h-96">
        <div className="absolute -top-2 left-10 w-56 h-56 rounded-full blur-3xl opacity-70" style={{background:'radial-gradient(circle,#ffffff,#ffb3b3 35%,transparent 65%)'}}/>
        <div className="absolute bottom-2 right-2 w-72 h-72 rounded-full blur-3xl opacity-70" style={{background:'radial-gradient(circle,#ffffff,#ff6b6b 35%,transparent 70%)'}}/>
        <div className="absolute top-1/2 left-1/3 w-44 h-44 rounded-full blur-2xl opacity-70" style={{background:'radial-gradient(circle,#ffffff,#ff1a75 35%,transparent 60%)'}}/>
      </div>
    </section>

    {/* NEW: Spinning card section (below hero) */}
    <section className="max-w-6xl mx-auto px-5 pt-4 pb-12 grid md:grid-cols-[1.1fr_1fr] gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold">NORWA <span className="grad">One</span></h2>
        <p className="mt-3" style={{color:'var(--muted)'}}>En moderne krypto‑opplevelse med <strong>Ethereum‑cashback</strong>, sømløs on‑chain bekreftelse og et tydelig RWA‑fundament.</p>
        <div className="mt-5 flex gap-3">
          <a className="btn btn-primary" href="/norwa-one">Utforsk NORWA One</a>
          <a className="btn btn-ghost" href="#om">Les mer om plattformen</a>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <SpinningCard/>
      </div>
    </section>

    <section id="om" className="section">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-3xl font-bold">Hvorfor NORWA?</h2>
          <p className="mt-2" style={{color:'var(--muted)'}}>Vi bygger et åpent RWA‑økosystem der investorer kan få eksponering mot virkelige eiendeler gjennom en sikker og transparent infrastruktur. Plattformen er inspirert av bransjestandarder, men er <strong>helt original i design, innhold og merkevare</strong>.</p>
          <ul className="mt-4 space-y-2"><li>✓ Gjennomsiktighet gjennom attestasjoner og orakler</li><li>✓ Likviditet via DEX‑pools og institusjonelle partnere</li><li>✓ Rettighetsstyring med compliance‑klare token‑standarder</li></ul>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Teknisk oversikt</h3>
          <dl className="grid grid-cols-[130px_1fr] gap-x-4 gap-y-1 kv">
            <dt>Kjede</dt><dd>Ethereum/Layer‑2 (valgbar)</dd>
            <dt>Standard</dt><dd>ERC‑20 for nytte, ERC‑3643/1400 for RWA‑compliance</dd>
            <dt>Orakel</dt><dd>Chainlink (planlagt)</dd>
            <dt>Custody</dt><dd>Regnskapsført tredjepart (TBA)</dd>
          </dl>
        </div>
      </div>
    </section>

    <section id="rwa" className="section section-alt">
      <h2 className="text-3xl font-bold mb-6">Slik fungerer RWA hos NORWA</h2>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="tile"><h3 className="font-semibold text-xl">1. Verifiser eiendelen</h3><p>Eiendelen loggføres og attesteres av godkjente partnere. Off‑chain dokumentasjon lenkes on‑chain.</p></div>
        <div className="tile"><h3 className="font-semibold text-xl">2. Tokeniser</h3><p>Eiendelen deles opp i tokens med innebygde regler for eierskap, overføring og whitelist.</p></div>
        <div className="tile"><h3 className="font-semibold text-xl">3. Markedsplass</h3><p>Tokens kan handles i likviditetspooler eller via tillatte markedsplasser, med kontinuerlig prisdata.</p></div>
      </div>
    </section>

    <section id="tokenomics" className="section">
      <h2 className="text-3xl font-bold mb-6">Tokenomics</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p style={{color:'var(--muted)'}}>NORWA er en nyttetoken for styring og gebatter i økosystemet. RWA‑andeler utstedes som compliance‑tokens separat.</p>
          <ul className="mt-4 space-y-2">
            <li className="relative border border-[#1f2942] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Fellesskap & insentiver – 28%</li>
            <li className="relative border border-[#1f2942] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Likviditet & market making – 22%</li>
            <li className="relative border border-[#1f2942] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Utvikling – 20%</li>
            <li className="relative border border-[#1f2942] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Partnerskap – 15%</li>
            <li className="relative border border-[#1f2942] rounded-lg bg-[#111827] px-3 py-2"><span className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[var(--r1)] to-[var(--r2)] opacity-25 rounded-l-lg"></span>Team & rådgivere – 15%</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-2">Nøkkelparametre</h3>
          <dl className="grid grid-cols-[150px_1fr] gap-x-4 gap-y-1 kv">
            <dt>Total forsyning</dt><dd>1 000 000 000 NORWA</dd>
            <dt>Emisjon</dt><dd>Lineær/vested</dd>
            <dt>Lansering</dt><dd>IDO/Reg D (USA) – TBA</dd>
          </dl>
        </div>
      </div>
    </section>

    <section id="veikart" className="section section-alt">
      <h2 className="text-3xl font-bold mb-6">Veikart</h2>
      <ol className="space-y-3">
        <li className="border border-dashed border-[#2b3654] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q1:</strong> Konsept, selskap, juridiske rammer</li>
        <li className="border border-dashed border-[#2b3654] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q2:</strong> Smartkontrakter, KYC, intern test</li>
        <li className="border border-dashed border-[#2b3654] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q3:</strong> Soft‑launch for whitelistede investorer</li>
        <li className="border border-dashed border-[#2b3654] rounded-xl bg-[#0f1422] px-4 py-3"><strong>Q4:</strong> RWA‑utvidelse, mobilapp, børslisting</li>
      </ol>
    </section>

    <section id="faq" className="section">
      <h2 className="text-3xl font-bold mb-4">FAQ</h2>
      <details className="mb-2"><summary className="cursor-pointer">Er NORWA en sikkerhet eller nyttetoken?</summary><p style={{color:'var(--muted)'}}>NORWA brukes til gebyrer og styring. RWA‑andeler kan klassifiseres som verdipapirer og utstedes separat i henhold til gjeldende regler.</p></details>
      <details className="mb-2"><summary className="cursor-pointer">Kan jeg investere uten KYC?</summary><p style={{color:'var(--muted)'}}>Nei, RWA‑relaterte kjøp krever KYC/AML og eventuell investor‑kvalifisering.</p></details>
      <details><summary className="cursor-pointer">Hvilke eiendeler støttes først?</summary><p style={{color:'var(--muted)'}}>Vi vurderer edelmetaller og inntektsgivende eiendom. Endelig liste annonseres i forkant av lansering.</p></details>
    </section>

    <footer className="py-10">
      <div className="max-w-5xl mx-auto px-5 grid md:grid-cols-2 gap-6">
        <div><strong>NORWA Coin</strong><p style={{color:'var(--muted)'}}>© {new Date().getFullYear()} NORWA Labs. Alt innhold er originalt og inspirert av bransjestandarder.</p></div>
        <form className="grid grid-cols-[1fr_auto] gap-2"><label htmlFor="email" className="sr-only">E‑post</label><input id="email" type="email" placeholder="din@epost.no" className="rounded-xl border border-[#28324d] bg-[#0e1422] px-3 py-2"/><button className="btn">Meld meg på</button></form>
      </div>
    </footer>
  </main>)
}
