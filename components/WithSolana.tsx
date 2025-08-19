'use client';
import SolanaWalletProvider from '@/components/solana/SolanaWalletProvider';
import { ReactNode } from 'react';

export default function WithSolana({ children }:{ children: ReactNode }) {
  return <SolanaWalletProvider>{children}</SolanaWalletProvider>;
}
