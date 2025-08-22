import React from 'react';
import { FaTwitter } from 'react-icons/fa';

export default function TwitterButton() {
  return (
    <a
      href="https://x.com/NORWAcoin_sol"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-500 transition-colors"
      aria-label="Visit our Twitter"
    >
      <FaTwitter size={24} />
    </a>
  );
}
