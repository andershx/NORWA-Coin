'use client';
import Image from 'next/image';

export default function SpinningCard() {
  return (
    <div className="wrap" aria-label="Spinning NORWA credit card">
      <div className="stage">
        <div className="card3d">
          {/* FRONT */}
          <div className="face front">
            <div className="paint" />
            <div className="rim" />
            <div className="foil" />
            <div className="sheen" />
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

          {/* BACK */}
          <div className="face back" aria-hidden="true">
            <div className="paint backTone" />
            <div className="rim" />
            <div className="magstripe" />
            <div className="backtxt">NORWA • Secure • Transparent • Global</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Smooth variable rotation (prevents transform jitter) */
        @property --ry { syntax: '<number>'; inherits: false; initial-value: 0; }
        @property --lx { syntax: '<number>'; inherits: false; initial-value: 20; } /* light x */
        @property --ly { syntax: '<number>'; inherits: false; initial-value: 40; } /* light y */

        .wrap { display:flex; justify-content:center; align-items:center; padding:16px; }
        .stage { perspective: 1600px; }

        .card3d{
          --ry: 0;
          position: relative;
          width: 360px; height: 226px;
          transform-style: preserve-3d;
          transform: rotateX(8deg) rotateY(calc(var(--ry) * 1deg));
          animation: spin 12s linear infinite forwards, lights 6s ease-in-out infinite alternate;
          filter: drop-shadow(0 36px 40px rgba(0,0,0,.45));
        }

        /* Faces */
        .face{
          position:absolute; inset:0; border-radius:20px; overflow:hidden;
          backface-visibility: hidden;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.06),
            0 8px 22px rgba(0,0,0,.28);
        }
        .back{ transform: rotateY(180deg); }

        /* Metallic red paint with coordinated highlight using --ry */
        .paint, .paint.backTone{
          position:absolute; inset:-1px; border-radius:22px;
          background:
            radial-gradient(110% 90% at calc(var(--lx)*1%) calc(var(--ly)*1%), rgba(255,255,255,.22), rgba(255,255,255,0) 55%),
            linear-gradient(135deg, #8f0d27 0%, #c61637 32%, #ff2a4d 55%, #b31332 78%, #661022 100%);
        }
        .paint.backTone{
          background:
            radial-gradient(100% 80% at calc((100 - var(--lx))*1%) calc((100 - var(--ly))*1%), rgba(255,255,255,.12), rgba(255,255,255,0) 60%),
            linear-gradient(135deg, #5b0d1d 0%, #95112c 40%, #d01b41 70%, #7a0f26 100%);
        }

        /* Subtle rim to add thickness */
        .rim{
          position:absolute; inset:0; border-radius:20px; pointer-events:none;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.10),
            inset 0 0 0 2px rgba(0,0,0,.22);
        }

        /* Holographic foil specks for realism */
        .foil{
          position:absolute; inset:0; mix-blend-mode:screen; opacity:.35; pointer-events:none;
          background:
            radial-gradient(6px 2px at 12% 18%, rgba(255,255,255,.5), rgba(255,255,255,0) 70%),
            radial-gradient(10px 3px at 82% 16%, rgba(255,255,255,.32), rgba(255,255,255,0) 70%),
            radial-gradient(8px 3px at 72% 78%, rgba(255,255,255,.28), rgba(255,255,255,0) 70%);
          filter: blur(.2px);
          animation: foilPulse 5.4s ease-in-out infinite;
        }

        /* Moving sheen strip synced to rotation */
        .sheen{
          position:absolute; inset:0; pointer-events:none; mix-blend-mode:screen;
          background:
            linear-gradient( 100deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,.16) 50%,
              rgba(255,255,255,0) 100%
            );
          transform: translateX(calc((var(--ry) - 180) * 0.9%)) rotate(2deg);
          opacity:.65;
        }

        .content { position:relative; display:flex; flex-direction:column; height:100%; z-index:5; }
        .row { display:flex; align-items:center; }
        .row.top { justify-content:space-between; padding:16px 18px 0 18px; }
        .brand { letter-spacing:.24em; font-weight:800; font-size:14px; color:#fff; text-shadow:0 0 16px rgba(255,64,64,.24) }
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
        .label{ font-size:10px; color:rgba(255,255,255,.75); letter-spacing:.12em; text-transform:uppercase }
        .value{ font-size:14px; color:#fff; font-weight:700; margin-top:2px }

        /* Back face */
        .magstripe {
          position:absolute; left:0; right:0; top:26px; height:44px;
          background: linear-gradient(180deg, #0b0b0b, #232323);
          opacity:.92;
        }
        .backtxt {
          position:absolute; bottom:16px; right:18px;
          color: rgba(255,255,255,.82); font-size:12px; letter-spacing:.08em;
        }

        /* Motion + light animations */
        @keyframes spin { to { --ry: 360; } }
        @keyframes lights {
          0%   { --lx: 18; --ly: 42; }
          50%  { --lx: 82; --ly: 22; }
          100% { --lx: 30; --ly: 70; }
        }
        @keyframes foilPulse { 0%,100%{opacity:.28} 50%{opacity:.4} }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .card3d { animation: none; transform: rotateX(6deg) rotateY(12deg); }
          .sheen, .foil { animation: none; }
        }

        @media (max-width:420px){
          .card3d{ width:300px;height:188px }
          .number{ font-size:20px }
        }
      `}</style>
    </div>
  );
}

  function initImmediate(){ /* noop, init runs in the effect when THREE exists */ }
}
