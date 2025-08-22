'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function FanableSection() {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-red-700 to-red-500 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore the Fanable Market</h2>
        <p className="text-lg mb-8">
          We have proudly partnered with <span className="font-semibold">Fanable.io</span> to bring
          you access to a wider ecosystem of real-world assets and opportunities.
        </p>
        <Link href="https://fanable.io" target="_blank">
          <div className="inline-flex items-center space-x-3 bg-white text-red-600 px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition cursor-pointer">
            <Image src="/fanable-logo.png" alt="Fanable Logo" width={40} height={40} />
            <span className="text-lg font-semibold">Visit Fanable.io</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
