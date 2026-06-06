import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Star, Zap, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

export default function SpaceQuest() {
  const { addSticker } = useRewards();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState<{ id: number, x: number, y: number }[]>([]);
  const [comets, setComets] = useState<{ id: number, x: number, y: number }[]>([]);
  const [shipPos, setShipPos] = useState(50);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStars([]);
    setComets([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const spawn = setInterval(() => {
      setStars(prev => [...prev, { id: Date.now(), x: Math.random() * 90 + 5, y: -10 }]);
      if (Math.random() > 0.5) {
        setComets(prev => [...prev, { id: Date.now() + 1, x: Math.random() * 90 + 5, y: -10 }]);
      }
    }, 1000);

    const move = setInterval(() => {
      setStars(prev => prev.map(s => ({ ...s, y: s.y + 1.5 })).filter(s => s.y < 110));
      setComets(prev => prev.map(c => ({ ...c, y: c.y + 2.5 })).filter(c => c.y < 110));
    }, 40);

    return () => {
      clearInterval(spawn);
      clearInterval(move);
    };
  }, [isPlaying]);

  // Collision detection
  useEffect(() => {
    if (!isPlaying) return;
    
    stars.forEach(s => {
      if (s.y > 80 && s.y < 95 && Math.abs(s.x - shipPos) < 10) {
        setScore(v => v + 1);
        setStars(prev => prev.filter(item => item.id !== s.id));
        if (score + 1 === 10) {
          confetti();
          addSticker();
        }
      }
    });

    comets.forEach(c => {
      if (c.y > 80 && c.y < 95 && Math.abs(c.x - shipPos) < 10) {
        setIsPlaying(false);
      }
    });
  }, [stars, comets, shipPos, isPlaying, score]);

  return (
    <div className="bg-slate-950 p-8 rounded-[3.5rem] shadow-2xl relative h-[500px] overflow-hidden border-8 border-slate-900 group">
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }} />
         ))}
      </div>

      {!isPlaying ? (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm gap-6">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-slate-800 p-6 rounded-full shadow-2xl">
            <Rocket size={64} className="text-blue-400" />
          </motion.div>
          <div className="text-center">
            <h2 className="text-4xl font-black text-white uppercase tracking-widest">Space Quest</h2>
            <p className="text-slate-400 font-bold">Collect 10 stars! Avoid comets!</p>
          </div>
          <button onClick={startGame} className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-3xl font-black text-2xl shadow-xl transition-all active:scale-95">
            LAUNCH MISSION
          </button>
          {score > 0 && <div className="text-yellow-400 font-bold">Previous Score: {score}</div>}
        </div>
      ) : (
        <>
          <div className="absolute top-6 left-6 text-white bg-slate-800/80 px-6 py-2 rounded-2xl font-black text-xl flex items-center gap-2 border border-slate-700">
            <Star className="text-yellow-400 fill-yellow-400" /> {score}/10
          </div>
          
          <div 
            className="absolute inset-0 touch-none cursor-ew-resize"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setShipPos(((e.clientX - rect.left) / rect.width) * 100);
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const touch = e.touches[0];
              setShipPos(((touch.clientX - rect.left) / rect.width) * 100);
            }}
          >
            {/* Stars */}
            {stars.map(s => (
              <motion.div key={s.id} className="absolute text-3xl" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                ⭐
              </motion.div>
            ))}

            {/* Comets */}
            {comets.map(c => (
              <motion.div key={c.id} className="absolute text-3xl" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                ☄️
              </motion.div>
            ))}

            {/* Ship */}
            <motion.div 
              animate={{ x: `${shipPos}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute bottom-10 -translate-x-1/2 text-5xl"
            >
              <Rocket className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" size={60} />
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-orange-500 to-transparent blur-sm animate-pulse" />
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
