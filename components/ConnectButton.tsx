'use client';
import { useMemo, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

declare global {
  interface Window {
    solana?: any;
    phantom?: { solana?: any };
  }
}

function isPhantomAvailable() {
  // Desktop extension
  const w = typeof window !== 'undefined' ? window : ({} as any);
  const ext = w?.solana?.isPhantom || w?.phantom?.solana?.isPhantom;
  return Boolean(ext);
}

function isMobile() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

function phantomInstallLink() {
  // Official install page
  return 'https://phantom.app/';
}

function phantomOpenAppLink() {
  // Universal link to open Phantom in-app browser to your site
  const site = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  if (!site) return 'https://phantom.app/';
  // Open in Phantom's browser
  return `https://phantom.app/ul/browse/${encodeURIComponent(site)}`;
}

export default function ConnectButton(){
  const { connected, connecting, publicKey, connect, disconnect } = useWallet();
  const [available, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    setAvailable(isPhantomAvailable());
    const id = setInterval(() => setAvailable(isPhantomAvailable()), 1500);
    return () => clearInterval(id);
  }, []);

  const short = useMemo(() => {
    if (!publicKey) return '';
    const b58 = publicKey.toBase58();
    return b58.slice(0, 4) + '…' + b58.slice(-4);
  }, [publicKey]);

  const onClick = async () => {
    if (connected) {
      await disconnect();
      return;
    }
    if (!available) {
      // No Phantom detected; show install/open options by navigating instead of alert
      const url = isMobile() ? phantomOpenAppLink() : phantomInstallLink();
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    try {
      await connect();
    } catch (e) {
      console.error('Phantom connect error', e);
    }
  };

  // Render different states
  if (!available && !connected) {
    // Offer a clear install/open action
    const url = isMobile() ? phantomOpenAppLink() : phantomInstallLink();
    return (
      <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary" aria-label="Install Phantom">
        {isMobile() ? 'Open in Phantom' : 'Install Phantom'}
      </a>
    );
  }

  return (
    <button
      className="btn btn-primary"
      onClick={onClick}
      aria-label={connected ? 'Disconnect Phantom' : 'Connect Phantom'}
    >
      {connecting ? 'Connecting…' : connected ? `Phantom ${short}` : 'Connect Phantom'}
    </button>
  );
}
