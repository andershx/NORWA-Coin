'use client';
import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Launch App section
 * - Big CTA button with NORWA logo on the RIGHT of the text
 * - On click, text changes to "Soon"
 * - Sits in a full-width section matching the site's red/black theme
 */
export default function LaunchAppSection() {
  const [clicked, setClicked] = useState(false);

  return (
    <section id="launch-app" className="py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="rounded-2xl border border-[#2a3148] bg-[#0f1422] p-6 md:p-8 relative overflow-hidden">
          {/* soft red gradient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40"
            style={{ background: 'radial-gradient(circle, #ff416d 0%, #ff1a75 35%, transparent 70%)' }}
          />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between relative">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold">NORWA App</h3>
              <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--muted)' }}>
                We&apos;re putting the final polish on the app experience. Track RWA portfolios, buy/sell NORWA, and manage
                compliance <em>soon</em>.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setClicked(true)}
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-white font-semibold shadow-lg transition-transform duration-150 active:scale-95"
                style={{
                  background: 'linear-gradient(90deg, #ff1a75 0%, #ff4b6e 45%, #ff6b6b 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                aria-label="NORWA App (coming soon)"
              >
                <span className="tracking-wide">{clicked ? 'Soon' : 'Launch App'}</span>
                {/* NORWA logo on the RIGHT */}
                <Image src="/logo.svg" alt="NORWA" width={22} height={22} priority />
              </button>

              <span className="text-xs md:text-sm" style={{ color: 'var(--muted)' }}>
                Launching soon — mobile & web.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
