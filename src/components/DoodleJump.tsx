import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Zap, Trophy, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

export default function DoodleJump() {
  const { addSticker } = useRewards();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pos, setPos] = useState({ x: 150, y: 400 });
  const [velY, setVelY] = useState(0);
  const [platforms, setPlatforms] = useState<{ id: number, x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);

  const start = () => {
    setIsPlaying(true);
    setScore(0);
    setPos({ x: 150, y: 400 });
    setVelY(-15);
    const initial = [];
    for(let i=0; i<6; i++) {
        initial.push({ id: Math.random(), x: Math.random()*250, y: i*100 });
    }
    setPlatforms(initial);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const game = setInterval(() => {
      setPos(p => {
        const nextY = p.y + velY;
        if (nextY > 500) { setIsPlaying(false); return p; }
        return { ...p, y: nextY };
      });
      setVelY(v => v + 0.8); // Gravity

      // Check jump on platforms
      platforms.forEach(plat => {
        if (velY > 0 && pos.y + 40 > plat.y && pos.y + 40 < plat.y + 20 && pos.x + 40 > plat.x && pos.x < plat.x + 80) {
            setVelY(-18);
            if (plat.y < 100) {
                setScore(s => s + 1);
                if (score + 1 === 20) { confetti(); addSticker(); }
            }
        }
      });

      // Move platforms down if player is high
      if (pos.y < 200) {
          setPos(p => ({ ...p, y: 200 }));
          setPlatforms(prev => prev.map(p => ({ ...p, y: p.y + 10 })).filter(p => {
            if (p.y > 600) {
                return false;
            }
            return true;
          }));
          if (Math.random() > 0.95) {
            setPlatforms(prev => [...prev, { id: Date.now(), x: Math.random()*250, y: -50 }]);
          }
      }
    }, 30);

    return () => clearInterval(game);
  }, [isPlaying, pos, velY, platforms, score]);

  return (
    <div className="bg-sky-50 p-8 rounded-[4rem] shadow-2xl relative h-[500px] overflow-hidden border-8 border-white cursor-pointer select-none"
         onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos(p => ({ ...p, x: ((e.clientX - rect.left) / rect.width) * 300 - 20 }));
         }}
         onTouchMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos(p => ({ ...p, x: ((e.touches[0].clientX - rect.left) / rect.width) * 300 - 20 }));
         }}
    >
      <div className="absolute top-6 left-6 text-sky-600 font-black text-2xl z-50">Height: {score}</div>
      
      {!isPlaying ? (
        <div className="absolute inset-0 z-[100] bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
           <div className="text-8xl">🐰</div>
           <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">Super Hopper</h2>
           <button onClick={start} className="bg-pink-500 text-white px-12 py-4 rounded-3xl font-black text-2xl shadow-xl">JUMP JUMP!</button>
        </div>
      ) : (
        <>
          <motion.div animate={{ x: pos.x, y: pos.y }} className="absolute text-5xl z-50">🐰</motion.div>
          {platforms.map(p => (
            <div key={p.id} className="absolute bg-green-400 border-b-4 border-green-500 rounded-full" style={{ left: p.x, top: p.y, width: 80, height: 15 }} />
          ))}
        </>
      )}
    </div>
  );
}
