'use client';
import Image from 'next/image';

export default function SpinningCard() {
  return (
    <div className="wrap" aria-label="Spinning NORWA credit card">
      <div className="card3d">
        <div className="card-face">
          <div className="bg-grad" />
          <div className="shine" />
          <div className="row top">
            <span className="brand">NORWA</span>
            <Image src="/logo.svg" alt="NORWA Coin" width={40} height={40} />
          </div>
          <div className="number">5321  8420  0931  2025</div>
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

      <style jsx>{`
        .wrap{display:flex;justify-content:center;align-items:center;padding:14px;perspective:1200px}
        .card3d{transform-style:preserve-3d;animation:spinY 10s linear infinite}
        .card-face{
          position:relative;width:360px;height:226px;border-radius:20px;
          background:#0f0f14;border:1px solid #3a2130;overflow:hidden;
          box-shadow:0 20px 60px rgba(255,64,64,.18), inset 0 0 0 1px rgba(255,255,255,.04);
        }
        .bg-grad{position:absolute;inset:-30%;
          background:linear-gradient(135deg,#ff4d4d 0%,#ff2a4d 35%,#b5173a 70%,#7a0f2a 100%);
          filter:blur(28px);opacity:.55;
        }
        .shine{position:absolute;inset:0;background:
          radial-gradient(120px 60px at 20% 10%,rgba(255,255,255,.18),transparent 60%),
          linear-gradient(120deg,rgba(255,255,255,.10),transparent 30%);
          mix-blend-mode:screen;opacity:.8;
        }
        .row{position:relative;display:flex;align-items:center;z-index:2}
        .row.top{justify-content:space-between;padding:16px 18px 0 18px}
        .brand{letter-spacing:.24em;font-weight:800;font-size:14px;color:#fff;text-shadow:0 0 18px rgba(255,64,64,.28)}
        .number{z-index:2;margin:24px 18px 0 18px;font-size:22px;letter-spacing:.1em;
          color:#fff;font-weight:700;text-shadow:0 2px 10px rgba(0,0,0,.35)}
        .row.bottom{justify-content:space-between;gap:14px;align-items:flex-end;padding:22px 18px}
        .chip{width:44px;height:34px;border-radius:8px;background:linear-gradient(180deg,#ffdca8,#a87f36);
          box-shadow:inset 0 0 0 1px rgba(0,0,0,.25);display:grid;grid-template-rows:repeat(5,1fr);gap:2px;padding:4px
        }
        .chip-line{height:2px;background:rgba(0,0,0,.35);border-radius:1px}
        .holder,.expiry{display:flex;flex-direction:column;align-items:flex-start}
        .label{font-size:10px;color:rgba(255,255,255,.65);letter-spacing:.12em;text-transform:uppercase}
        .value{font-size:14px;color:#fff;font-weight:700;margin-top:2px}
        @keyframes spinY{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
        @media (max-width:420px){.card-face{width:300px;height:188px} .number{font-size:20px}}
      `}</style>
    </div>
  );
}
