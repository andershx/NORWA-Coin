'use client';
import { useMemo, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

declare global {
  interface Window {
    solana?: any;
    phantom?: { solana?: any };
  }
}

const isMobile = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
};

const getBrowser = () => {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'edge';
  if (/Chrome\//.test(ua)) return 'chrome';
  if (/Brave/i.test(ua)) return 'brave';
  if (/Firefox\//.test(ua)) return 'firefox';
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'safari';
  return 'unknown';
};

const installLinkForBrowser = () => {
  const b = getBrowser();
  switch (b) {
    case 'chrome':
    case 'edge':
    case 'brave':
      return 'https://phantom.app/download';
    case 'firefox':
      return 'https://addons.mozilla.org/en-US/firefox/addon/phantom-app/';
    default:
      return 'https://phantom.app/';
  }
};

const openInPhantomLink = () => {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : '');
  return site
    ? `https://phantom.app/ul/browse/${encodeURIComponent(site)}`
    : 'https://phantom.app/';
};

const detectPhantom = () => {
  const w = typeof window !== 'undefined' ? (window as any) : {};
  const ext = w?.solana?.isPhantom || w?.phantom?.solana?.isPhantom;
  return Boolean(ext);
};

export default function ConnectButton() {
  const { connected, connecting, publicKey, connect, disconnect } = useWallet();
  const [hasPhantom, setHasPhantom] = useState(false);

  useEffect(() => {
    const check = () => {
      const ok = detectPhantom();
      setHasPhantom(ok);
      // helpful diagnostics in DevTools:
      // open Console to verify detection on desktop
      console.debug('[NORWA][PhantomDetect] hasPhantom=', ok, 'UA=', navigator.userAgent);
    };
    check();
    const id = setInterval(check, 1500);
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
      const url = isMobile() ? openInPhantomLink() : installLinkForBrowser();
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    try {
      await connect();
    } catch (e: any) {
      console.warn('[NORWA][AdapterConnectError]', e);
      // Fallback to direct provider connect (helps on some desktop setups)
      try {
        const provider =
          (window as any)?.solana ||
          (window as any)?.phantom?.solana;
        if (provider && provider.isPhantom && provider.connect) {
          const res = await provider.connect();
          console.debug('[NORWA][ProviderConnect] connected', res?.publicKey?.toBase58?.());
        } else {
          throw new Error('Phantom provider not found');
        }
      } catch (e2) {
        console.error('[NORWA][ProviderConnectError]', e2);
        alert('Please ensure the Phantom extension is installed and enabled, then refresh the page.');
      }
    }
  };

  if (!hasPhantom && !connected) {
    const url = isMobile() ? openInPhantomLink() : installLinkForBrowser();
    const label = isMobile() ? 'Open in Phantom' : 'Install Phantom';
    return (
      <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
        {label}
      </a>
    );
  }

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {connecting ? 'Connecting…' : connected ? `Phantom ${short}` : 'Connect Phantom'}
    </button>
  );
}
