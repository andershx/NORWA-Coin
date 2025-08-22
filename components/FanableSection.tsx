'use client';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Fanable partner section: yellow gradient + subtle animations
 * - Whole section is clickable -> fanable.io
 * - Uses styled-jsx so no Tailwind config changes are needed
 * - Drop-in component; import and place where you want it on the homepage
 */
export default function FanableSection() {
  return (
    <section className="fanable-wrap">
      <Link href="https://fanable.io" target="_blank" className="fanable-card" aria-label="Go to Fanable.io">
        <div className="badge">Partner</div>

        <div className="head">
          <div className="logo">
            <Image src="/fanable-logo.png" alt="Fanable" width={56} height={56} />
          </div>
          <div className="titles">
            <h2>Explore the Fanable Market</h2>
            <p>Discover exclusive projects and real‑world asset opportunities on our partner platform.</p>
          </div>
        </div>

        <div className="cta">
          <span>Go to Fanable Market</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="glow a" />
        <div className="glow b" />
      </Link>

      <style jsx>{`
        .fanable-wrap{
          width:100%;
          padding: 3.5rem 1rem;
        }
        .fanable-card{
          position: relative;
          display: block;
          max-width: 1100px;
          margin: 0 auto;
          border-radius: 20px;
          padding: 28px 26px;
          color: #111;
          text-decoration: none;
          background: linear-gradient(135deg,#ffe38a 0%, #ffd54d 30%, #ffb800 60%, #ff9f00 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.6),
            0 10px 30px rgba(0,0,0,0.35);
          overflow: hidden;
          transform: translateZ(0);
          transition: transform .25s ease, box-shadow .25s ease;
          animation: float 6s ease-in-out infinite;
        }
        .fanable-card:hover{
          transform: translateY(-2px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.7),
            0 16px 40px rgba(0,0,0,0.45);
        }
        .badge{
          position:absolute;
          top:14px;
          right:14px;
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .04em;
          color:#3b2a00;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.08);
          padding: 6px 10px;
          border-radius: 999px;
          backdrop-filter: blur(6px);
        }
        .head{
          display:flex;
          align-items:center;
          gap:18px;
        }
        .logo{
          width:56px;height:56px;
          display:grid;place-items:center;
          background: rgba(255,255,255,0.7);
          border-radius:14px;
          border:1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transform: translateZ(0);
        }
        .titles h2{
          margin:0;
          font-size: clamp(1.4rem, 2.3vw, 2rem);
          line-height:1.15;
          font-weight: 900;
          color:#2d1f00;
          text-shadow: 0 1px 0 rgba(255,255,255,.6);
        }
        .titles p{
          margin:.4rem 0 0;
          color:#4a3600;
          opacity:.9;
          font-size: clamp(.98rem, 1.3vw, 1.05rem);
        }
        .cta{
          margin-top:16px;
          display:inline-flex;
          align-items:center;
          gap:10px;
          color:#261a00;
          background: rgba(255,255,255,.85);
          padding: 10px 14px;
          border-radius: 12px;
          font-weight: 700;
          border:1px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 10px rgba(0,0,0,0.12);
          transition: transform .15s ease, background .15s ease;
        }
        .fanable-card:hover .cta{ transform: translateX(2px); background: #fff; }

        /* animated glow accents */
        .glow{
          position:absolute;
          filter: blur(40px);
          opacity:.45;
          pointer-events:none;
        }
        .glow.a{
          width:320px;height:320px;
          left:-60px; top:-40px;
          background: radial-gradient(closest-side, #fff6b0, transparent 70%);
          animation: driftA 9s ease-in-out infinite;
        }
        .glow.b{
          width:360px;height:360px;
          right:-90px; bottom:-80px;
          background: radial-gradient(closest-side, #ffd86a, transparent 70%);
          animation: driftB 11s ease-in-out infinite;
        }

        @keyframes float{
          0%,100%{ transform: translateY(0) }
          50%{ transform: translateY(-4px) }
        }
        @keyframes driftA{
          0%,100%{ transform: translate(0,0) rotate(0deg) }
          50%{ transform: translate(8px,6px) rotate(4deg) }
        }
        @keyframes driftB{
          0%,100%{ transform: translate(0,0) rotate(0deg) }
          50%{ transform: translate(-8px,-6px) rotate(-3deg) }
        }
      `}</style>
    </section>
  );
}
