'use client';
import { useEffect, useState } from 'react';

export default function ThankYouPage(){
  const [ok, setOk] = useState(false);

  useEffect(() => { setOk(true); }, []);

  return (
    <main>
      <section className="max-w-3xl mx-auto px-5 py-16 text-center">
        <h1 className="text-4xl font-extrabold">Thank you! 🎉</h1>
        <p className="mt-3" style={{color:'var(--muted)'}}>
          Your payment has been received. The total raised will reflect your contribution shortly.
        </p>
        <a className="btn btn-primary mt-6" href="/">Back to homepage</a>
      </section>
    </main>
  );
}
