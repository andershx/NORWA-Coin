'use client';
import { motion } from 'framer-motion';

export default function FanableSection() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black">
      <div className="max-w-6xl mx-auto text-center px-6">
        <motion.img
          src="https://fanable.io/logo192.png"
          alt="Fanable Logo"
          className="mx-auto mb-8 w-32 h-32"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h2
          className="text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Explore the Fanable.io Market
        </motion.h2>
        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover exclusive items and experiences with our partner{' '}
          <span className="font-semibold">Fanable.io</span>. Own a piece of
          what you love.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            href="https://fanable.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-yellow-400 font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transform transition"
          >
            Visit Fanable.io
          </a>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <motion.img
            src="https://fanable.io/assets/example1.jpg"
            alt="Fanable Item 1"
            className="rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <motion.img
            src="https://fanable.io/assets/example2.jpg"
            alt="Fanable Item 2"
            className="rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <motion.img
            src="https://fanable.io/assets/example3.jpg"
            alt="Fanable Item 3"
            className="rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </div>
    </section>
  );
}
