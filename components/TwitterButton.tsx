'use client';
import Link from 'next/link';

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M18.244 2H21L14.326 9.64 22 22h-6.486l-4.57-7.223L5.64 22H3l7.21-8.4L2 2h6.6l4.148 6.63L18.244 2Zm-1.137 18h1.79L8.01 4H6.15l10.957 16Z"/>
    </svg>
  );
}

export default function TwitterButton(){
  return (
    <a
      href="https://x.com/NORWAcoin_sol"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-grid place-items-center w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition"
      aria-label="Open NORWA on X (Twitter)"
    >
      <XIcon className="w-4 h-4 text-[#1DA1F2]" />
    </a>
  );
}
