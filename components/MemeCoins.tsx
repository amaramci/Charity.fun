import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const coins = [
  '/coins/doge.png',
  '/coins/shiba.png',
  '/coins/pepe.png',
  '/coins/elon.png',
];

const generateRandom = (min: number, max: number) => Math.random() * (max - min) + min;

export default function MemeCoins() {
  const [coinElements, setCoinElements] = useState<any[]>([]);

  useEffect(() => {
    const newCoins = Array.from({ length: 20 }).map((_, idx) => ({
      id: idx,
      src: coins[Math.floor(Math.random() * coins.length)],
      left: generateRandom(0, 200),
      right: generateRandom(0, 200),
      delay: generateRandom(1,2),
      size: generateRandom(25, 45),
    }));
    setCoinElements(newCoins);
  }, []);

  return (
    <>
      {/* Left side coins */}
      <div className="fixed top-0 left-0 h-full w-80 overflow-hidden z-10">
        {coinElements.map((coin) => (
          <motion.img
            key={`left-${coin.id}`}
            src={coin.src}
            className="absolute"
            style={{
              width: `${coin.size}px`,
              left: `${coin.left}%`,
            }}
            initial={{ y: '110vh' }}
            animate={{ y: '-10vh' }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: generateRandom(6, 12),
              delay: coin.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Right side coins */}
      <div className="fixed top-0 right-0 h-full w-80 overflow-hidden z-10">
        {coinElements.map((coin) => (
          <motion.img
            key={`right-${coin.id}`}
            src={coin.src}
            className="absolute"
            style={{
              width: `${coin.size}px`,
              right: `${coin.right}%`,
            }}
            initial={{ y: '110vh' }}
            animate={{ y: '-10vh' }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: generateRandom(6, 12),
              delay: coin.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </>
  );
}
