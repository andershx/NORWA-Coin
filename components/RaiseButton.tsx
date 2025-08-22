'use client';
import { useEffect, useState } from 'react';

export default function RaiseButton() {
  const [amount, setAmount] = useState(25);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0); // default 136,540 instead of null

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/raise/total', { cache: 'no-store' });
        const data = await res.json();
        if (typeof data.totalUsd === 'number') setTotal(data.totalUsd);
      } catch (e) {
        console.error('Failed to load total', e);
      }
    };
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, []);

  const onCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountUsd: amount }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Could not start checkout.');
      }
    } catch (e) {
      console.error(e);
      alert('Checkout error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
        <div>
          <h2 className="text-3xl font-bold">Support <span className="grad">NORWA</span></h2>
          <p className="mt-2" style={{color:'var(--muted)'}}>
            Back the project with a secure card payment. Funds help build the RWA platform.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <label className="text-sm" htmlFor="amt">Amount (USD)</label>
            <input
              id="amt"
              type="number"
              min={5}
              step={5}
              value={amount}
              onChange={(e)=>setAmount(Math.max(5, Math.round(Number(e.target.value) || 0)))}
              className="rounded-xl border border-[#28324d] bg-[#0e1422] px-3 py-2 w-28"
            />
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={onCheckout}
            >
              {loading ? 'Starting…' : 'Pay with Card'}
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-[#2a3148] bg-[#0f1422] p-5">
          <div className="text-sm" style={{color:'var(--muted)'}}>Total Money Raised</div>
          <div className="text-4xl font-extrabold mt-2">
            ${total.toLocaleString()}
          </div>
          <div className="text-xs mt-2" style={{color:'var(--muted)'}}>
            Funds raised from investors to help build the RWA platform. 
          </div>
        </div>
      </div>
    </section>
  );
}
