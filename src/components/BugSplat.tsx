import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Sparkles, Ghost } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

export default function BugSplat() {
  const { addSticker } = useRewards();
  const [bugs, setBugs] = useState<{ id: number, x: number, y: number, char: string }[]>([]);
  const [splatCount, setSplatCount] = useState(0);

  useEffect(() => {
    const spawn = setInterval(() => {
      if (bugs.length < 12) {
        setBugs(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          char: ['🐜', '🪲', '🪳', '🕸️'][Math.floor(Math.random() * 4)]
        }]);
      }
    }, 800);
    return () => clearInterval(spawn);
  }, [bugs.length]);

  const splat = (id: number) => {
    setBugs(prev => prev.filter(b => b.id !== id));
    setSplatCount(s => s + 1);
    if (splatCount + 1 === 30) addSticker();
  };

  return (
    <div className="bg-green-100 p-8 rounded-[4rem] shadow-2xl relative h-[500px] overflow-hidden border-8 border-white cursor-crosshair">
      <div className="absolute top-6 left-6 text-green-800 font-black text-3xl z-50">Bug Squash: {splatCount}</div>
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap gap-20">
         {Array.from({ length: 12 }).map((_, i) => <Ghost key={i} size={80} />)}
      </div>

      <AnimatePresence>
        {bugs.map((bug) => (
          <motion.button
            key={bug.id}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            exit={{ scale: 2, opacity: 0 }}
            onClick={() => splat(bug.id)}
            className="absolute text-5xl z-20 cursor-pointer transition-transform active:scale-150"
            style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
          >
            {bug.char}
          </motion.button>
        ))}
      </AnimatePresence>
      
      <div className="absolute bottom-6 right-6 text-green-400 font-bold uppercase tracking-widest text-sm pointer-events-none">
        TAP THE BUGS! 👞
      </div>
    </div>
  );
}
