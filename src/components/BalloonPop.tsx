
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

import { useRewards } from '../context/RewardContext';

interface Balloon {
  id: number;
  x: number;
  color: string;
  size: number;
  speed: number;
}

const BALLOON_COLORS = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400'];

export default function BalloonPop() {
  const { addSticker } = useRewards();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const counterRef = React.useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (balloons.length < 15) {
        const newBalloon: Balloon = {
          id: counterRef.current++,
          x: Math.random() * 80 + 10, // 10% to 90%
          color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          size: Math.random() * 30 + 50, // 50px to 80px (smaller)
          speed: Math.random() * 3 + 2, // 2s to 5s (faster)
        };
        setBalloons(prev => [...prev, newBalloon]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [balloons.length]);

  const popBalloon = (id: number) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
    
    // Play a "pop" sound effect via synthesis or simple audio
    const utterance = new SpeechSynthesisUtterance("pop");
    utterance.volume = 0.5;
    utterance.pitch = 2;
    utterance.rate = 2;
    window.speechSynthesis.speak(utterance);

    if (score > 0 && score % 10 === 0) {
      confetti({
        particleCount: 50,
        spread: 30,
        origin: { y: 0.8 }
      });
      if (score === 50) addSticker('1'); // Super Star at 50 pops
    }
  };

  return (
    <div className="relative h-[600px] bg-sky-50 rounded-3xl overflow-hidden border-4 border-sky-200">
      <div className="absolute top-4 left-4 z-10 bg-white/80 px-4 py-2 rounded-2xl shadow-sm border-2 border-sky-100 backdrop-blur-sm">
        <span className="text-xl font-black text-sky-600">Popped: {score}</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 opacity-50 text-sky-300 font-bold uppercase tracking-widest text-sm pointer-events-none">
        Pop them all!
      </div>

      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            initial={{ bottom: -100, opacity: 1 }}
            animate={{ bottom: '120%' }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: balloon.speed, ease: "linear" }}
            onAnimationComplete={() => setBalloons(prev => prev.filter(b => b.id !== balloon.id))}
            onClick={() => popBalloon(balloon.id)}
            style={{ 
              left: `${balloon.x}%`, 
              width: balloon.size, 
              height: balloon.size * 1.2 
            }}
            className={`absolute cursor-pointer rounded-full ${balloon.color} shadow-lg shadow-white/20 flex items-center justify-center`}
          >
            {/* Balloon string */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300/50" />
            
            {/* Reflection */}
            <div className="absolute top-4 left-4 w-4 h-8 bg-white/30 rounded-full blur-[1px]" />
            
            {/* Knot */}
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 ${balloon.color.replace('bg-', 'bg-opacity-80 bg-')} rounded-t-full`} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
