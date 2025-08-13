'use client';
import { useEffect, useState } from 'react';

export default function ConnectButton(){
  const [label, setLabel] = useState('Koble lommebok');
  useEffect(()=>{ if(!(window as any).ethereum){ setLabel('Installer MetaMask') } },[]);
  const onClick = async () => {
    const eth = (window as any).ethereum;
    if(!eth){ window.open('https://metamask.io','_blank'); return; }
    try{ const accounts = await eth.request({ method:'eth_requestAccounts' }); setLabel(`Tilkoblet ${accounts[0].slice(0,6)}…`); }
    catch{ setLabel('Avbrutt'); }
  };
  return <button className="btn btn-primary" onClick={onClick} aria-live="polite">{label}</button>;
}
