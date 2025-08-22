'use client';
import { motion } from 'framer-motion';

const FanableSection = () => {
  const logo = process.env.NEXT_PUBLIC_FANABLE_LOGO_URL || '/fanable-logo.png';
  const items = (process.env.NEXT_PUBLIC_FANABLE_ITEM_IMAGES?.split(',') ?? [
    'https://placehold.co/300x200/FFD700/000?text=Item+1',
    'https://placehold.co/300x200/FFD700/000?text=Item+2',
    'https://placehold.co/300x200/FFD700/000?text=Item+3',
  ]).map((url) => url.trim());

  return (
    <motion.a
      href="https://fanable.io"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      className="block rounded-2xl p-8 my-16 shadow-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-center cursor-pointer"
    >
      <motion.img
        src={logo}
        alt="Fanable Logo"
        className="mx-auto mb-6 h-16 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />
      <h2 className="text-3xl font-extrabold mb-4">Explore the Fanable Marketplace</h2>
      <p className="mb-8 text-lg">Real world assets, collectibles and more — now partnered with NORWA Coin</p>

      <div className="flex justify-center gap-6 overflow-x-auto pb-4">
        {items.map((url, i) => (
          <motion.img
            key={i}
            src={url}
            alt={`Fanable item ${i+1}`}
            className="rounded-xl w-48 h-32 object-cover shadow-md"
            whileHover={{ scale: 1.08 }}
          />
        ))}
      </div>
    </motion.a>
  );
};

export default FanableSection;
