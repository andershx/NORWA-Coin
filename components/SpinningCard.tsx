'use client';
import Image from 'next/image';

export default function SpinningCard() {
  return (
    <div className="wrap" aria-label="Spinning NORWA card">
      <div className="card">
        <div className="glow" />
        <div className="logo">
          <Image src="/logo.svg" alt="NORWA Coin" width={120} height={120} priority />
        </div>
      </div>
      <style jsx>{`
        .wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          perspective: 1200px;
        }
        .card {
          position: relative;
          width: 360px;
          height: 500px;
          border-radius: 20px;
          background: #0f0f14;
          border: 1px solid #3a2130;
          box-shadow: 0 20px 60px rgba(255,64,64,.12), inset 0 0 0 1px rgba(255,255,255,.02);
          transform-style: preserve-3d;
          animation: spinY 10s linear infinite;
          overflow: hidden;
        }
        .glow {
          position: absolute;
          inset: -20%;
          background: conic-gradient(from 0deg at 50% 50%, #ff2d2d, #b5173a, #ff2d2d 360deg);
          filter: blur(40px);
          opacity: .35;
        }
        .logo {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(40px);
        }
        @keyframes spinY {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @media (max-width: 420px) {
          .card { width: 300px; height: 420px; }
        }
      `}</style>
    </div>
  );
}
