'use client';
import { useMemo, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

declare global {
  interface Window {
    solana?: any;
    phantom?: { solana?: any };
  }
}

function phantomInstalled() {
  const w = typeof window !== 'undefined' ? window : ({} as any);
  return Boolean(w?.solana?.isPhantom || w?.phantom?.solana?.isPhantom);
}

function isMobile() {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
}

function installLink() {
  return 'https://phantom.app/';
}

function openInPhantomLink() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  return site ? `https://phantom.app/ul/browse/${encodeURIComponent(site)}` : 'https://phantom.app/';
}

export default function ConnectButton() {
  const { connected, connecting, publicKey, connect, disconnect } = useWallet();
  const [hasPhantom, setHasPhantom] = useState(false);

  useEffect(() => {
    setHasPhantom(phantomInstalled());
    const id = setInterval(() => setHasPhantom(phantomInstalled()), 1500);
    return () => clearInterval(id);
  }, []);

  const short = useMemo(() => {
    if (!publicKey) return '';
    const b58 = publicKey.toBase58();
    return b58.slice(0, 4) + '…' + b58.slice(-4);
  }, [publicKey]);

  const handleClick = async () => {
    if (connected) {
      await disconnect();
      return;
    }
    if (!hasPhantom) {
      const url = isMobile() ? openInPhantomLink() : installLink();
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    try {
      await connect();
    } catch (e) {
      console.error('Phantom connect error:', e);
    }
  };

  if (!hasPhantom && !connected) {
    const url = isMobile() ? openInPhantomLink() : installLink();
    return (
      <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
        {isMobile() ? 'Open in Phantom' : 'Install Phantom'}
      </a>
    );
  }

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {connecting ? 'Connecting…' : connected ? `Phantom ${short}` : 'Connect Phantom'}
    </button>
  );
}
