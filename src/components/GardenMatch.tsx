import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower, Sun, CloudRain, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

const FLOWERS = ['🌸', '🌻', '🌷', '🌹', '🌼', '🌺'];

export default function GardenMatch() {
  const { addSticker } = useRewards();
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState<'idle' | 'watch' | 'play' | 'win' | 'fail'>('idle');

  const startLevel = () => {
    const newSeq = [];
    for (let i = 0; i < level + 1; i++) {
        newSeq.push(FLOWERS[Math.floor(Math.random() * FLOWERS.length)]);
    }
    setSequence(newSeq);
    setUserSequence([]);
    setStatus('watch');
    setIsShowing(true);
  };

  useEffect(() => {
    if (status === 'watch') {
        const timer = setTimeout(() => {
            setIsShowing(false);
            setStatus('play');
        }, 600 * sequence.length);
        return () => clearTimeout(timer);
    }
  }, [status, sequence]);

  const handlePick = (flower: string) => {
    if (status !== 'play') return;

    const nextUserSeq = [...userSequence, flower];
    setUserSequence(nextUserSeq);

    // Check correction
    if (flower !== sequence[userSequence.length]) {
        setStatus('fail');
        setTimeout(() => setStatus('idle'), 2000);
        return;
    }

    if (nextUserSeq.length === sequence.length) {
        if (level === 8) {
            confetti();
            addSticker();
            setStatus('win');
        } else {
            setLevel(l => l + 1);
            setStatus('idle');
        }
    }
  };

  return (
    <div className="bg-green-50 p-8 rounded-[4rem] shadow-2xl flex flex-col items-center gap-8 border-8 border-white min-h-[500px]">
      <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm">
        <Sun className="text-yellow-500" />
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Garden Match</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
        {status === 'idle' ? (
           <div className="flex flex-col items-center gap-4">
             <div className="text-xl font-bold text-slate-500 uppercase tracking-widest">Level {level}</div>
             <button onClick={startLevel} className="bg-green-500 text-white px-12 py-6 rounded-3xl font-black text-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
               PLANT NOW! 🪴
             </button>
           </div>
        ) : (
           <div className="flex flex-col items-center gap-12 w-full">
             {/* Show Area */}
             <div className="h-32 flex items-center justify-center gap-4">
                <AnimatePresence mode="wait">
                  {status === 'watch' ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-8xl">
                       {sequence[Math.floor((Date.now() / 1000) % sequence.length)]}
                       <div className="text-sm font-black text-center text-slate-400 mt-2 uppercase">Watch Careful!</div>
                    </motion.div>
                  ) : (
                    <div className="flex gap-2">
                       {userSequence.map((s, i) => (
                         <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl">{s}</motion.div>
                       ))}
                       {status === 'play' && Array.from({ length: sequence.length - userSequence.length }).map((_, i) => (
                         <div key={i} className="w-12 h-12 rounded-full border-4 border-dashed border-slate-200" />
                       ))}
                    </div>
                  )}
                </AnimatePresence>
             </div>

             {/* UI Status */}
             {status === 'fail' && <div className="text-red-500 font-black text-2xl uppercase animate-bounce">Oops! Try Again!</div>}
             {status === 'win' && <div className="text-green-600 font-black text-2xl uppercase animate-bounce text-center">Master Gardener! 🏆</div>}

             {/* Input Area */}
             <div className="grid grid-cols-3 gap-4">
                {FLOWERS.map(f => (
                  <motion.button
                    key={f}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePick(f)}
                    disabled={status !== 'play'}
                    className="w-20 h-20 bg-white rounded-3xl text-4xl shadow-md border-b-4 border-slate-100 disabled:opacity-50"
                  >
                    {f}
                  </motion.button>
                ))}
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
