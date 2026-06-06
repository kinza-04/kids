import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Trophy, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

export default function TrafficFun() {
  const { addSticker } = useRewards();
  const [lane, setLane] = useState(1); // 0, 1, 2
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [enemies, setEnemies] = useState<{ id: number, lane: number, y: number, char: string }[]>([]);

  const start = () => {
    setIsPlaying(true);
    setScore(0);
    setEnemies([]);
    setLane(1);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const spawn = setInterval(() => {
      setEnemies(prev => [...prev, {
        id: Date.now(),
        lane: Math.floor(Math.random() * 3),
        y: -100,
        char: ['🚚', '🚜', '🚛', '🚧'][Math.floor(Math.random() * 4)]
      }]);
    }, 1200);

    const move = setInterval(() => {
      setEnemies(prev => prev.map(e => ({ ...e, y: e.y + 10 })).filter(e => {
        if (e.y > 600) {
            setScore(s => s + 1);
            if (score + 1 === 15) {
                confetti();
                addSticker();
            }
            return false;
        }
        return true;
      }));
    }, 50);

    return () => { clearInterval(spawn); clearInterval(move); };
  }, [isPlaying, score]);

  // Collision
  useEffect(() => {
    if (!isPlaying) return;
    enemies.forEach(e => {
      if (e.y > 350 && e.y < 450 && e.lane === lane) {
        setIsPlaying(false);
      }
    });
  }, [enemies, lane, isPlaying]);

  return (
    <div className="bg-slate-700 p-8 rounded-[4rem] shadow-2xl relative h-[500px] overflow-hidden border-8 border-slate-600">
      {!isPlaying ? (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 gap-6">
           <div className="text-8xl">🏎️</div>
           <h2 className="text-4xl font-black text-white">CITY RACER</h2>
           <button onClick={start} className="bg-yellow-400 text-slate-900 px-12 py-4 rounded-3xl font-black text-2xl">VROOM VROOM!</button>
        </div>
      ) : (
        <>
          <div className="absolute top-6 left-6 text-white font-black text-2xl z-50">Points: {score}</div>
          
          {/* Lanes */}
          <div className="absolute inset-0 flex">
             {[0, 1, 2].map(i => (
               <div key={i} className={`flex-1 border-r-4 border-dashed border-slate-500 last:border-0 h-full cursor-pointer hover:bg-white/5`} onClick={() => setLane(i)} />
             ))}
          </div>

          <AnimatePresence>
            {enemies.map(e => (
              <motion.div
                key={e.id}
                initial={{ opacity: 1 }}
                animate={{ y: e.y }}
                className="absolute text-7xl z-10 -translate-x-1/2"
                style={{ left: `${16.6 + e.lane * 33.3}%` }}
              >
                {e.char}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Car */}
          <motion.div 
            animate={{ left: `${16.6 + lane * 33.3}%` }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute bottom-10 -translate-x-1/2 text-8xl z-20 drop-shadow-2xl"
          >
            🏎️
          </motion.div>
        </>
      )}
    </div>
  );
}
