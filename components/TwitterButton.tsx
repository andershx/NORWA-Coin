'use client';
import Link from 'next/link';

// Inline SVG for Twitter (X) so you don't need any icon libraries.
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M18.244 2H21L14.326 9.64 22 22h-6.486l-4.57-7.223L5.64 22H3l7.21-8.4L2 2h6.6l4.148 6.63L18.244 2Zm-1.137 18h1.79L8.01 4H6.15l10.957 16Z"/>
  </svg>
);

export default function TwitterButton(){
  return (
    <div className="tw-wrap" role="navigation" aria-label="NORWA social links">
      <Link
        href="https://x.com/NORWAcoin_sol"
        target="_blank"
        rel="noopener noreferrer"
        className="tw-btn"
        aria-label="Open NORWA on X (Twitter)"
      >
        <XIcon className="icon" />
      </Link>

      <style jsx>{`
        .tw-wrap{
          position: fixed;
          top: 14px;
          right: 14px;
          z-index: 60;
        }
        .tw-btn{
          display: inline-grid;
          place-items: center;
          width: 40px; height: 40px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          backdrop-filter: blur(8px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.24);
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
        }
        .tw-btn:hover{ transform: translateY(-1px) scale(1.03); background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.24) }
        .icon{
          width: 20px; height: 20px;
          color: #1DA1F2; /* Twitter blue */
        }
        @media (max-width: 480px){
          .tw-wrap{ top: 10px; right: 10px }
          .tw-btn{ width: 36px; height: 36px }
          .icon{ width: 18px; height: 18px }
        }
      `}</style>
    </div>
  );
}
