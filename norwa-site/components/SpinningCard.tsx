'use client';
import Image from 'next/image';
import React from 'react';

export default function SpinningCard() {
  return (
    <div className="relative mx-auto h-[420px] w-[300px] md:h-[500px] md:w-[360px] perspective">
      <div className="card3d">
        <div className="card3d-face">
          <div className="card-gradient" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/logo.svg" alt="NORWA Coin" width={120} height={120} priority />
          </div>
        </div>
      </div>
    </div>
  );
}
