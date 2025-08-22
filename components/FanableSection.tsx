'use client';
import Link from 'next/link';

/**
 * Fanable partner section (yellow theme) WITHOUT framer-motion.
 * Uses pure CSS animations (styled-jsx) so no extra deps are needed.
 */
export default function FanableSection() {
  const logo = process.env.NEXT_PUBLIC_FANABLE_LOGO_URL || '/fanable-logo.png';
  const raw = process.env.NEXT_PUBLIC_FANABLE_ITEM_IMAGES || '';
  const items = raw
    ? raw.split(',').map(s => s.trim()).filter(Boolean)
    : [
        'https://placehold.co/480x300/FFE082/1A1300?text=Asset+1',
        'https://placehold.co/480x300/FFCA28/1A1300?text=Asset+2',
        'https://placehold.co/480x300/FFC107/1A1300?text=Asset+3',
      ];

  return (
    <section className="wrap">
      <Link href="https://fanable.io" target="_blank" className="card" aria-label="Go to Fanable.io">
        <div className="head">
          <div className="logo">
            <img src={logo} alt="Fanable" />
          </div>
          <div className="titles">
            <h2>Explore the Fanable.io Market</h2>
            <p>Discover exclusive items and real‑world asset opportunities with our partner Fanable.</p>
          </div>
        </div>

        <div className="grid">
          {items.map((src, i) => (
            <div className="thumb" key={i}>
              <img src={src} alt={`Fanable asset ${i+1}`} />
            </div>
          ))}
        </div>

        <div className="cta">Visit Fanable.io →</div>

        <div className="glow a" />
        <div className="glow b" />
      </Link>

      <style jsx>{`
        .wrap { width:100%; padding: 3.5rem 1rem; }
        .card{
          position:relative;
          display:block;
          max-width: 1100px;
          margin:0 auto;
          border-radius: 22px;
          padding: 28px 26px;
          color:#1a1300;
          background: linear-gradient(135deg,#ffe38a 0%, #ffd54d 30%, #ffbf1a 60%, #ffae00 100%);
          text-decoration:none;
          overflow:hidden;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.65),
            0 12px 34px rgba(0,0,0,0.35);
          transform: translateZ(0);
          animation: float 7s ease-in-out infinite;
        }
        .card:hover{
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.8),
            0 18px 44px rgba(0,0,0,0.45);
        }
        .head{
          display:flex; align-items:center; gap:16px; margin-bottom: 14px;
        }
        .logo{
          width:60px;height:60px; border-radius:14px; display:grid; place-items:center;
          background: rgba(255,255,255,0.82);
          border:1px solid rgba(0,0,0,0.06);
          box-shadow:0 6px 14px rgba(0,0,0,0.12);
          transform: translateZ(0);
          animation: pop 900ms ease;
        }
        .logo img{ width:40px; height:40px; object-fit:contain }
        .titles h2{ margin:0; font-size: clamp(1.4rem, 2.2vw, 2rem); line-height:1.1; font-weight:900; }
        .titles p{ margin:.35rem 0 0; opacity:.9; }

        .grid{
          margin-top: 14px;
          display:grid; grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 14px;
        }
        @media (max-width: 640px){
          .grid{ grid-template-columns: 1fr; }
        }
        .thumb{
          border-radius:16px; overflow:hidden;
          box-shadow:0 8px 18px rgba(0,0,0,0.18);
          transform: translateZ(0);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .thumb:hover{ transform: translateY(-2px) scale(1.02); box-shadow:0 12px 26px rgba(0,0,0,0.22); }
        .thumb img{ width:100%; height:220px; object-fit:cover; display:block; }

        .cta{
          margin-top: 16px;
          display:inline-block;
          font-weight:800;
          background:#111; color:#ffd24a;
          padding: 12px 16px;
          border-radius:12px;
          border:1px solid rgba(0,0,0,0.06);
          box-shadow:0 6px 14px rgba(0,0,0,0.12);
          transition: transform .15s ease, color .15s ease, background .15s ease;
        }
        .card:hover .cta{ transform: translateX(2px); color:#ffea92; }

        .glow{
          position:absolute; filter: blur(42px); opacity:.45; pointer-events:none;
        }
        .glow.a{
          width:320px; height:320px; left:-60px; top:-40px;
          background: radial-gradient(closest-side, #fff4a8, transparent 70%);
          animation: driftA 9s ease-in-out infinite;
        }
        .glow.b{
          width:360px; height:360px; right:-90px; bottom:-80px;
          background: radial-gradient(closest-side, #ffdf74, transparent 70%);
          animation: driftB 11s ease-in-out infinite;
        }

        @keyframes float{ 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-4px) } }
        @keyframes driftA{ 0%,100%{ transform: translate(0,0) rotate(0deg) } 50%{ transform: translate(8px,6px) rotate(4deg) } }
        @keyframes driftB{ 0%,100%{ transform: translate(0,0) rotate(0deg) } 50%{ transform: translate(-8px,-6px) rotate(-3deg) } }
        @keyframes pop{ 0%{ transform: scale(.92) } 100%{ transform: scale(1) } }
      `}</style>
    </section>
  );
}
