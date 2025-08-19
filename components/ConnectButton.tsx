'use client';
import { useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

export default function ConnectButton(){
  const { connected, connecting, publicKey, connect, disconnect, wallet } = useWallet();

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
    try {
      await connect();
    } catch (e) {
      console.error('Phantom connect error', e);
      alert('Please install Phantom (phantom.app) and try again.');
    }
  };

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
