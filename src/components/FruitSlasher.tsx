import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

const FRUITS = ['🍎', '🍓', '🍊', '🍉', '🍍', '🍇', '🍑'];

export default function FruitSlasher() {
  const { addSticker } = useRewards();
  const [fruits, setFruits] = useState<{ id: number, x: number, y: number, char: string, dx: number, dy: number }[]>([]);
  const [slashed, setSlashed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const start = () => {
    setIsPlaying(true);
    setSlashed(0);
    setFruits([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const spawn = setInterval(() => {
      if (fruits.length < 8) {
        setFruits(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 600,
          char: FRUITS[Math.floor(Math.random() * FRUITS.length)],
          dx: (Math.random() - 0.5) * 10,
          dy: -15 - Math.random() * 10
        }]);
      }
    }, 1000);

    const move = setInterval(() => {
      setFruits(prev => prev.map(f => ({
        ...f,
        x: f.x + f.dx,
        y: f.y + f.dy,
        dy: f.dy + 0.5 // Gravity
      })).filter(f => f.y < 700));
    }, 30);

    return () => {
      clearInterval(spawn);
      clearInterval(move);
    };
  }, [isPlaying, fruits.length]);

  const slash = (id: number) => {
    setFruits(prev => prev.filter(f => f.id !== id));
    setSlashed(s => s + 1);
    const ut = new SpeechSynthesisUtterance("slash");
    ut.volume = 0.3;
    window.speechSynthesis.speak(ut);
    
    if (slashed + 1 === 20) {
      confetti();
      addSticker();
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-[4rem] shadow-2xl relative h-[500px] overflow-hidden border-8 border-white cursor-crosshair">
      <div className="absolute top-6 left-6 text-white font-black text-3xl z-50">Slashed: {slashed}/20</div>

      {!isPlaying ? (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black/40">
           <div className="text-8xl">🍉</div>
           <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Fruit Ninja Jr.</h2>
           <button onClick={start} className="bg-green-500 text-white px-12 py-4 rounded-3xl font-black text-2xl shadow-xl">START CUTTING!</button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {fruits.map(f => (
            <motion.div
              key={f.id}
              onClick={() => slash(f.id)}
              onMouseEnter={() => slash(f.id)}
              className="absolute text-6xl cursor-pointer select-none"
              style={{ left: `${f.x}%`, top: f.y }}
            >
              {f.char}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
