'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

// === SETT DENNE ===
const SALE_ADDRESS = '0xDIN_SALE_KONTRAKT'; // bytt til adressen for NorwaSale

export default function BuyNorwaButton() {
  const [ethAmount, setEthAmount] = useState('0.05');
  const [status, setStatus] = useState('');

  const buy = async () => {
    setStatus('');
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setStatus('Installer MetaMask');
      return;
    }

    try {
      // Sørg for at vi er på Ethereum mainnet
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x1') {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // Send ETH til salgs-kontrakten
      const tx = await signer.sendTransaction({
        to: SALE_ADDRESS,
        value: ethers.parseEther(ethAmount || '0.05'),
      });

      setStatus('Venter bekreftelse…');
      await tx.wait();
      setStatus('Kjøp fullført! NORWA sendt til wallet.');
    } catch (err: any) {
      setStatus(err?.shortMessage || err?.message || 'Feil ved kjøp');
    }
  };

  return (
    <div className="flex items-center gap-3 mt-3">
      <input
        type="number"
        step="0.01"
        min="0.001"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
        className="rounded-xl border border-[#28324d] bg-[#0e1422] px-3 py-2 w-28"
        aria-label="ETH-beløp"
      />
      <button className="btn btn-primary" onClick={buy}>
        Kjøp NORWA Coin
      </button>
      <span className="text-sm" style={{ color: 'var(--muted)' }}>
        {status}
      </span>
    </div>
  );
}
