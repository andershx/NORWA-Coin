'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function SpinningCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Optional: tiny tilt on mouse to add parallax without breaking the spin
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.setProperty('--tiltX', `${Math.max(Math.min(-y * 6, 6), -6)}deg`);
      el.style.setProperty('--tiltY', `${Math.max(Math.min(x * 8, 8), -8)}deg`);
    };
    const onLeave = () => {
      el.style.setProperty('--tiltX', `0deg`);
      el.style.setProperty('--tiltY', `0deg`);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="wrap" aria-label="Spinning NORWA credit card">
      <div className="stage">
        <div className="card3d" ref={cardRef}>
          {/* BASE CARD FACE */}
          <div className="face">
            {/* Layer 1: deep red paint (anisotropic metallic look) */}
            <div className="paint" />
            {/* Layer 2: brushed subtle texture */}
            <div className="brushed" />
            {/* Layer 3: dynamic environment reflection */}
            <div className="env" />
            {/* Layer 4: moving sheen sweep */}
            <div className="sheen" />
            {/* Layer 5: specular glints near edges */}
            <div className="glints" />
            {/* Content */}
            <div className="content">
              <div className="row top">
                <span className="brand">NORWA</span>
                <Image src="/logo.svg" alt="NORWA Coin" width={40} height={40} />
              </div>
              <div className="number">5321&nbsp;&nbsp;8420&nbsp;&nbsp;0931&nbsp;&nbsp;2025</div>
              <div className="row bottom">
                <div className="chip" aria-hidden="true">
                  <div className="chip-line" /><div className="chip-line" /><div className="chip-line" />
                  <div className="chip-line" /><div className="chip-line" />
                </div>
                <div className="holder">
                  <div className="label">Card Holder</div>
                  <div className="value">NORWA ONE</div>
                </div>
                <div className="expiry">
                  <div className="label">Valid Thru</div>
                  <div className="value">12/29</div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE (subtle reflection when rotating past 90°) */}
          <div className="face back" aria-hidden="true">
            <div className="paint backTone" />
            <div className="env backEnv" />
            <div className="magstripe" />
            <div className="backtxt">NORWA • Secure • Transparent • Global</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Scene */
        .wrap { display:flex; justify-content:center; align-items:center; padding:14px; }
        .stage { perspective: 1400px; }

        /* 3D object */
        .card3d {
          position: relative;
          width: 360px; height: 226px;
          transform-style: preserve-3d;
          animation: spin 12s cubic-bezier(.4,.02,.2,1) infinite;
          filter: drop-shadow(0 30px 40px rgba(0,0,0,.45));
          transform: rotateX(var(--tiltX, 0deg)) rotateY(var(--tiltY, 0deg));
        }
        .face {
          position: absolute; inset: 0;
          border-radius: 20px; overflow: hidden;
          backface-visibility: hidden;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.06),
            0 10px 30px rgba(0,0,0,.35);
          transform: translateZ(0.1px); /* prevents z-fighting */
        }
        .face.back {
          transform: rotateY(180deg);
        }

        /* Metallic red base: richer and deeper */
        .paint, .paint.backTone {
          position:absolute; inset:-1px; border-radius: 22px;
          background:
            radial-gradient(160% 120% at 80% 10%, rgba(255,255,255,.14) 0%, transparent 60%),
            linear-gradient(135deg, #9a0f2d 0%, #ce173c 30%, #ff2a4d 55%, #b01333 78%, #6f0d22 100%);
        }
        /* Slightly darker on the back */
        .paint.backTone {
          background:
            radial-gradient(140% 100% at 20% 80%, rgba(255,255,255,.08) 0%, transparent 60%),
            linear-gradient(135deg, #6f0d22 0%, #a41231 40%, #d51d43 65%, #8a0f28 100%);
        }

        /* Brushed texture (very subtle, for realism) */
        .brushed {
          position:absolute; inset:0; mix-blend-mode:overlay; opacity:.18;
          background:
            repeating-linear-gradient( 90deg,
              rgba(255,255,255,.08) 0px, rgba(255,255,255,.08) 1px,
              rgba(0,0,0,0) 2px, rgba(0,0,0,0) 5px
            );
          filter: blur(.3px);
        }

        /* Environment reflection: moves during spin to mimic lights */
        .env, .env.backEnv {
          position:absolute; inset:-10%; pointer-events:none;
          background:
            linear-gradient( to bottom, rgba(255,255,255,.28), rgba(255,255,255,0) 60%),
            linear-gradient( to right, rgba(255,255,255,.12), rgba(255,255,255,0) 40%),
            radial-gradient(60% 160% at 0% 0%, rgba(255,255,255,.18), rgba(255,255,255,0) 60% ),
            radial-gradient(80% 120% at 120% 120%, rgba(255,255,255,.12), rgba(255,255,255,0) 70% );
          mix-blend-mode: screen;
          opacity:.8;
          animation: envShift 12s linear infinite;
        }
        .env.backEnv { opacity:.6; filter: blur(1px); }

        /* Sheen sweep across the surface */
        .sheen {
          position:absolute; inset:0; pointer-events:none;
          background:
            linear-gradient( 105deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,.18) 45%,
              rgba(255,255,255,0) 55%
            );
          mix-blend-mode: screen;
          transform: translateX(-120%);
          animation: sheenMove 6s ease-in-out infinite;
        }

        /* Tiny edge glints for *real* metal feeling */
        .glints {
          position:absolute; inset:0; pointer-events:none;
          background:
            radial-gradient(40px 10px at 15% 8%, rgba(255,255,255,.35), rgba(255,255,255,0) 60%),
            radial-gradient(60px 14px at 85% 16%, rgba(255,255,255,.22), rgba(255,255,255,0) 65%),
            radial-gradient(30px 10px at 90% 80%, rgba(255,255,255,.18), rgba(255,255,255,0) 60%);
          mix-blend-mode: screen;
          opacity:.55;
          animation: glintPulse 4.8s ease-in-out infinite;
        }

        .content { position:relative; display:flex; flex-direction:column; height:100%; z-index:5; }
        .row { display:flex; align-items:center; }
        .row.top { justify-content:space-between; padding:16px 18px 0 18px; }
        .brand { letter-spacing:.24em; font-weight:800; font-size:14px; color:#fff; text-shadow:0 0 18px rgba(255,64,64,.28) }
        .number {
          margin:24px 18px 0 18px; font-size:22px; letter-spacing:.1em;
          color:#fff; font-weight:700; text-shadow:0 2px 10px rgba(0,0,0,.45)
        }
        .row.bottom { justify-content:space-between; gap:14px; align-items:flex-end; padding:22px 18px }
        .chip {
          width:46px; height:34px; border-radius:8px;
          background: linear-gradient(180deg,#ffdca8,#a87f36);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,.25);
          display:grid; grid-template-rows:repeat(5,1fr); gap:2px; padding:4px
        }
        .chip-line { height:2px; background:rgba(0,0,0,.35); border-radius:1px }
        .holder,.expiry{ display:flex; flex-direction:column; align-items:flex-start }
        .label{ font-size:10px; color:rgba(255,255,255,.70); letter-spacing:.12em; text-transform:uppercase }
        .value{ font-size:14px; color:#fff; font-weight:700; margin-top:2px }

        /* Back face elements */
        .magstripe {
          position:absolute; left:0; right:0; top:26px; height:44px;
          background: linear-gradient(180deg, #0b0b0b, #232323);
          opacity:.9;
        }
        .backtxt {
          position:absolute; bottom:16px; right:18px;
          color: rgba(255,255,255,.8); font-size:12px; letter-spacing:.08em;
        }

        /* Animations */
        @keyframes spin {
          0%   { transform: rotateX(var(--tiltX,0deg)) rotateY(calc(var(--tiltY,0deg) +   0deg)); }
          25%  { transform: rotateX(calc(var(--tiltX,0deg) + 2deg)) rotateY(calc(var(--tiltY,0deg) +  90deg)); }
          50%  { transform: rotateX(calc(var(--tiltX,0deg) + 0deg)) rotateY(calc(var(--tiltY,0deg) + 180deg)); }
          75%  { transform: rotateX(calc(var(--tiltX,0deg) - 2deg)) rotateY(calc(var(--tiltY,0deg) + 270deg)); }
          100% { transform: rotateX(var(--tiltX,0deg)) rotateY(calc(var(--tiltY,0deg) + 360deg)); }
        }
        @keyframes envShift {
          0% { transform: translate(-4%, -2%) scale(1.02) }
          50%{ transform: translate(4%, 2%) scale(1.02) }
          100%{ transform: translate(-4%, -2%) scale(1.02) }
        }
        @keyframes sheenMove {
          0% { transform: translateX(-130%) rotate(2deg); opacity:.0 }
          20%{ transform: translateX(0%) rotate(2deg); opacity:.65 }
          40%{ transform: translateX(130%) rotate(2deg); opacity:0 }
          100%{ transform: translateX(130%) rotate(2deg); opacity:0 }
        }
        @keyframes glintPulse {
          0%,100% { opacity:.45 }
          50% { opacity:.75 }
        }

        /* Accessibility: reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .card3d { animation: none; }
          .env, .sheen, .glints { animation: none; }
        }

        @media (max-width: 420px) {
          .card3d { width:300px; height:188px }
          .number{ font-size:20px }
        }
      `}</style>
    </div>
  );
}
