'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function BuyNorwaButton() {
  const [status, setStatus] = useState<string>('');

  // TODO: paste your deployed NorwaSale address here
  const SALE_ADDRESS = '0xYOUR_SALE_CONTRACT_ADDRESS';

  const buy = async () => {
    if (!(window as any).ethereum) {
      setStatus('Installér MetaMask');
      return;
    }
    try {
      setStatus('Kobler...');
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      // Example: buy for 0.05 ETH
      const tx = await signer.sendTransaction({
        to: SALE_ADDRESS,
        value: ethers.parseEther('0.05'),
      });
      setStatus('Venter bekreftelse...');
      await tx.wait();
      setStatus('Kjøp fullført! NORWA sendt til wallet.');
    } catch (e: any) {
      setStatus(e?.message || 'Feil ved kjøp');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
      <button className="btn btn-primary" onClick={buy}>Kjøp NORWA for 0.05 ETH</button>
      <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{status}</span>
    </div>
  );
}
