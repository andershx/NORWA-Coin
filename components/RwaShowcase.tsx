'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Accordion from '@/components/ui/Accordion';

type Rwa = {
  id: string;
  title: string;
  blurb: string;
  tag: 'Real Estate' | 'Metals' | 'Energy' | 'Art' | 'Commodities';
  img?: string;
  apy?: string;
  supply?: string;
  floor?: string;
};

const DATA: Rwa[] = [
  { id: 're1', title: 'Income Real Estate', blurb: 'Tokenized rental streams with audited cashflows. Quarterly distributions in SOL.', tag: 'Real Estate', img: '/assets/rwa-real-estate.svg', apy: '5–8%', supply: 'TBA', floor: '1 NORWA' },
  { id: 'mt1', title: 'Precious Metals', blurb: 'Gold & silver vaulted with third-party attestations. 1:1 backed tokens.', tag: 'Metals', img: '/assets/rwa-metals.svg', apy: '—', supply: 'Open', floor: '0.01 oz' },
  { id: 'en1', title: 'Energy Credits', blurb: 'Renewable energy certificates bridged with oracles. Settlement on Solana.', tag: 'Energy', img: '/assets/rwa-energy.svg', apy: '—', supply: 'Seasonal', floor: '1 REC' },
  { id: 'ar1', title: 'Fine Art Shares', blurb: 'Curated artworks with fractional access and insured custody.', tag: 'Art', img: '/assets/rwa-art.svg', apy: '—', supply: 'Capped', floor: '1 share' },
  { id: 'co1', title: 'Agricultural Commodities', blurb: 'On-chain warehouse receipts for grain and softs.', tag: 'Commodities', img: '/assets/rwa-agri.svg', apy: '—', supply: 'Variable', floor: '1 unit' },
];

const TABS = ['All','Real Estate','Metals','Energy','Art','Commodities'] as const;

export default function RwaShowcase() {
  const [tab, setTab] = useState<typeof TABS[number]>('All');

  const list = useMemo(() => {
    if (tab === 'All') return DATA;
    return DATA.filter(d => d.tag === tab);
  }, [tab]);

  return (
    <section id="rwa-showcase" className="section">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Real‑World Assets <span className="grad">on NORWA</span></h2>
            <p className="mt-2" style={{color:'var(--muted)'}}>Browse tokenized goods with auditable attestations and on‑chain settlement on Solana.</p>
          </div>
          <div className="hidden md:flex gap-2 flex-wrap">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  'px-3 py-1.5 rounded-full border text-sm transition ' +
                  (t===tab ? 'border-[#ff365f] bg-[#1a0f14]' : 'border-[#26304a] hover:border-[#334066]')
                }
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="md:hidden mb-4">
          <Accordion items={[{
            id: 'filter',
            title: `Filter • ${tab}`,
            content: (
              <div className="flex gap-2 flex-wrap">
                {TABS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={
                      'px-3 py-1.5 rounded-full border text-sm transition ' +
                      (t===tab ? 'border-[#ff365f] bg-[#1a0f14]' : 'border-[#26304a] hover:border-[#334066]')
                    }
                  >{t}</button>
                ))}
              </div>
            )
          }]} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: Rwa }) {
  return (
    <details className="group bg-[#0f1422] border border-[#2a3148] rounded-2xl overflow-hidden relative hover:shadow-[0_10px_40px_rgba(255,64,64,.12)] transition-shadow">
      <summary className="cursor-pointer list-none">
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -left-6 -top-10 w-64 h-64 rotate-[-8deg] rounded-3xl"
              style={{background:'linear-gradient(135deg,#ff4d6d,#a40f35)'}} />
            <div className="absolute left-2 -top-8 w-64 h-64 rotate-[-4deg] rounded-3xl opacity-80"
              style={{background:'linear-gradient(135deg,#ff6b81,#b5173a)'}} />
            <div className="absolute left-10 -top-6 w-64 h-64 rotate-[0deg] rounded-3xl opacity-70"
              style={{background:'linear-gradient(135deg,#ff8aa3,#cf1b4a)'}} />
          </div>
          {item.img && (
            <Image src={item.img} alt={item.title} fill className="object-cover opacity-80 mix-blend-overlay" />
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <span className="text-xs px-2 py-1 rounded-full border border-[#2a3148]" style={{color:'var(--muted)'}}>{item.tag}</span>
          </div>
          <p className="mt-1 text-sm" style={{color:'var(--muted)'}}>{item.blurb}</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs" style={{color:'var(--muted)'}}>
            <Metric label="Yield" value={item.apy || '—'} />
            <Metric label="Supply" value={item.supply || '—'} />
            <Metric label="Min" value={item.floor || '—'} />
          </div>
          <div className="mt-3 text-right text-sm" style={{color:'var(--muted)'}}>Click to expand</div>
        </div>
      </summary>
      <div className="px-4 pb-4 -mt-1">
        <div className="rounded-xl border border-[#2a3148] bg-[#0c1120] p-4">
          <h4 className="font-semibold mb-2">Details & eligibility</h4>
          <ul className="text-sm list-disc pl-4 space-y-1" style={{color:'var(--muted)'}}>
            <li>On‑chain attestations and custody proofs</li>
            <li>Whitelist / KYC where required by jurisdiction</li>
            <li>Pricing data via oracles and verified feeds</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <a className="btn btn-primary" href="/norwa-one">Explore</a>
            <a className="btn btn-ghost" href="#faq">FAQ</a>
          </div>
        </div>
      </div>
    </details>
  );
}

function Metric({label, value}:{label:string; value:string}){
  return (
    <div className="rounded-lg border border-[#29324b] bg-[#101828] p-2">
      <div className="text-[10px] uppercase tracking-wide" style={{color:'var(--muted)'}}>{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
}
