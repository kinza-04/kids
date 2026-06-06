import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Square, Circle, Triangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

const SHAPES = [
  { id: 'star', icon: <Star />, label: 'Star', color: 'text-yellow-400' },
  { id: 'sq', icon: <Square />, label: 'Square', color: 'text-blue-500' },
  { id: 'cir', icon: <Circle />, label: 'Circle', color: 'text-red-500' },
  { id: 'tri', icon: <Triangle />, label: 'Triangle', color: 'text-green-500' },
];

export default function ShapeSorter() {
  const { addSticker } = useRewards();
  const [target, setTarget] = useState(SHAPES[0]);
  const [score, setScore] = useState(0);

  const next = () => {
    setTarget(SHAPES[Math.floor(Math.random() * SHAPES.length)]);
  };

  const pick = (id: string) => {
    if (id === target.id) {
        setScore(s => s + 1);
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
        if (score + 1 === 10) addSticker();
        next();
    }
  };

  return (
    <div className="bg-white p-12 rounded-[4rem] shadow-2xl border-8 border-purple-50 flex flex-col items-center gap-12 min-h-[550px]">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Shape Sifter</h2>
        <div className="text-xl font-bold bg-purple-100 text-purple-600 px-8 py-3 rounded-full flex items-center gap-3">
           Find the <span className={`uppercase font-black ${target.color}`}>{target.label}</span>
        </div>
      </div>

      <div className="text-[10rem] p-12 bg-slate-50 rounded-[3rem] shadow-inner">
        {React.cloneElement(target.icon as any, { size: 160, className: target.color })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
        {SHAPES.map(s => (
          <motion.button
            key={s.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => pick(s.id)}
            className="h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border-b-8 border-slate-100 transition-all hover:border-purple-400"
          >
            {React.cloneElement(s.icon as any, { size: 60, className: s.color })}
          </motion.button>
        ))}
      </div>
      
      <div className="flex gap-2">
         {Array.from({ length: 10 }).map((_, i) => (
           <div key={i} className={`w-4 h-4 rounded-full ${i < score ? 'bg-green-400' : 'bg-slate-200'}`} />
         ))}
      </div>
    </div>
  );
}
