'use client';
import React, { useState } from "react";
import Image from "next/image";

export default function NorwaAppButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => setClicked(true)}
      className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-white font-bold shadow-lg transition-transform duration-150 active:scale-95"
      style={{ 
        background: 'linear-gradient(90deg, #ff1a75 0%, #ff4b6e 45%, #ff6b6b 100%)',
        border: '1px solid rgba(255,255,255,0.12)'
      }}
      aria-label="Open NORWA App (coming soon)"
    >
      <span className="relative inline-block">
        <Image
          src="/norwa-app-phone.png"
          alt="NORWA App"
          width={28}
          height={28}
          className="rounded-md shadow-sm"
        />
      </span>
      <span className="tracking-wide">{clicked ? "Soon" : "NORWA App"}</span>
    </button>
  );
}
