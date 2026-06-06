import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Trophy, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

export default function BirdFlight() {
  const { addSticker } = useRewards();
  const [isPlaying, setIsPlaying] = useState(false);
  const [birdY, setBirdY] = useState(250);
  const [score, setScore] = useState(0);
  const [pipes, setPipes] = useState<{ id: number, x: number, topHeight: number }[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  const start = () => {
    setIsPlaying(true);
    setBirdY(250);
    setScore(0);
    setPipes([]);
  };

  const jump = () => {
    if (!isPlaying) return;
    setBirdY(y => Math.max(0, y - 60));
  };

  useEffect(() => {
    if (!isPlaying) return;

    const gravity = setInterval(() => {
      setBirdY(y => {
        if (y > 450) {
            setIsPlaying(false);
            return 450;
        }
        return y + 5;
      });
    }, 30);

    const pipeSpawn = setInterval(() => {
      setPipes(prev => [...prev, { id: Date.now(), x: 500, topHeight: Math.random() * 200 + 50 }]);
    }, 2000);

    const pipeMove = setInterval(() => {
      setPipes(prev => prev.map(p => ({ ...p, x: p.x - 5 })).filter(p => {
        if (p.x < -60) {
            setScore(s => s + 1);
            if (score + 1 === 10) {
                confetti();
                addSticker();
            }
            return false;
        }
        return true;
      }));
    }, 30);

    return () => {
      clearInterval(gravity);
      clearInterval(pipeSpawn);
      clearInterval(pipeMove);
    };
  }, [isPlaying, score]);

  // Collision
  useEffect(() => {
    if (!isPlaying) return;
    const birdRect = { top: birdY, bottom: birdY + 40, left: 100, right: 140 };
    
    pipes.forEach(p => {
      if (p.x < 140 && p.x + 60 > 100) {
        if (birdY < p.topHeight || birdY + 40 > p.topHeight + 150) {
          setIsPlaying(false);
        }
      }
    });
  }, [birdY, pipes, isPlaying]);

  return (
    <div 
      className="bg-sky-400 p-8 rounded-[4rem] shadow-2xl relative h-[500px] overflow-hidden border-8 border-white cursor-pointer select-none"
      onClick={jump}
    >
      <div className="absolute top-4 left-4 text-white font-black text-2xl z-50">Score: {score}</div>
      
      {!isPlaying ? (
        <div className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
          <div className="text-8xl animate-bounce">🐦</div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter text-center">Happy Birdie</h2>
          <button onClick={(e) => { e.stopPropagation(); start(); }} className="bg-white text-sky-500 px-12 py-4 rounded-3xl font-black text-2xl shadow-xl flex items-center gap-2">
            <Play fill="currentColor" /> FLY!
          </button>
        </div>
      ) : (
        <>
          <motion.div 
            animate={{ y: birdY, rotate: isPlaying ? -15 : 0 }}
            className="absolute left-[100px] text-5xl z-50"
          >
            🐦
          </motion.div>

          {pipes.map(p => (
            <React.Fragment key={p.id}>
              {/* Top pipe */}
              <div 
                className="absolute bg-green-500 border-x-4 border-b-8 border-green-600 rounded-b-2xl"
                style={{ left: p.x, top: 0, width: 60, height: p.topHeight }}
              />
              {/* Bottom pipe */}
              <div 
                className="absolute bg-green-500 border-x-4 border-t-8 border-green-600 rounded-t-2xl"
                style={{ left: p.x, top: p.topHeight + 150, width: 60, bottom: 0 }}
              />
            </React.Fragment>
          ))}
          
          <div className="absolute bottom-0 inset-x-0 h-10 bg-green-400 border-t-4 border-green-500 z-40" />
        </>
      )}
    </div>
  );
}
