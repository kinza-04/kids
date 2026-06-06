import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Waves, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

const ITEMS = [
  { id: 'fish', emoji: '🐠', name: 'Goldfish', x: 20, y: 30 },
  { id: 'crab', emoji: '🦀', name: 'Crabby', x: 80, y: 85 },
  { id: 'pearl', emoji: '⚪', name: 'Pearl', x: 45, y: 60 },
  { id: 'octopus', emoji: '🐙', name: 'Octo', x: 10, y: 70 },
  { id: 'chest', emoji: '📦', name: 'Treasure', x: 70, y: 40 },
];

export default function OceanSearch() {
  const { addSticker } = useRewards();
  const [found, setFound] = useState<string[]>([]);
  const [hint, setHint] = useState<string>(ITEMS[0].name);

  const handleFind = (item: typeof ITEMS[0]) => {
    if (found.includes(item.id)) return;
    
    setFound(prev => [...prev, item.id]);
    const nextToFind = ITEMS.find(i => !found.includes(i.id) && i.id !== item.id);
    if (nextToFind) setHint(nextToFind.name);
    else setHint("All Found!");

    if (found.length + 1 === ITEMS.length) {
      confetti();
      addSticker();
    }
  };

  return (
    <div className="bg-cyan-900 p-8 rounded-[4rem] shadow-2xl relative h-[500px] overflow-hidden border-8 border-cyan-800">
      {/* Ocean BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-blue-900/60 pointer-events-none" />
      <div className="absolute inset-0 flex flex-wrap gap-12 opacity-20 pointer-events-none">
         {Array.from({ length: 15 }).map((_, i) => (
           <motion.div 
             key={i}
             animate={{ y: [0, -100], opacity: [0, 0.5, 0] }}
             transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
             className="text-white text-xl"
           >
             🫧
           </motion.div>
         ))}
      </div>

      {/* UI */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full flex items-center gap-4 border border-white/20 z-50">
        <Search className="text-cyan-300" />
        <span className="text-white font-black uppercase tracking-widest text-lg">
          Find the <span className="text-cyan-300">{hint}</span>
        </span>
      </div>

      <div className="absolute bottom-6 left-6 flex gap-2 z-50">
        {ITEMS.map(item => (
          <div key={item.id} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white/10 border border-white/20 ${found.includes(item.id) ? 'opacity-100' : 'opacity-30'}`}>
            {found.includes(item.id) ? <Check className="text-green-400" /> : item.emoji}
          </div>
        ))}
      </div>

      {/* Game Stage */}
      <div className="relative w-full h-full">
        {ITEMS.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFind(item)}
            className="absolute text-5xl cursor-pointer"
            style={{ left: `${item.x}%`, top: `${item.y}%`, opacity: found.includes(item.id) ? 1 : 0.8 }}
          >
            <span className={found.includes(item.id) ? '' : 'filter brightness-50'}>{item.emoji}</span>
            {found.includes(item.id) && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-4 -right-4 bg-green-500 rounded-full p-1 border-2 border-white">
                <Check size={12} className="text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
