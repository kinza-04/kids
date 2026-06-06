import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Timer, Sparkles } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

export default function ClockLearn() {
  const { addSticker } = useRewards();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hDeg = (hours % 12) * 30 + minutes * 0.5;
  const mDeg = minutes * 6;
  const sDeg = seconds * 6;

  return (
    <div className="bg-white p-12 rounded-[4rem] shadow-2xl flex flex-col items-center gap-12 border-8 border-pink-50 min-h-[550px]">
      <div className="bg-pink-100 px-8 py-3 rounded-full flex items-center gap-3">
         <Clock className="text-pink-600" />
         <span className="text-2xl font-black text-pink-600 uppercase tracking-tighter">Clock Master</span>
      </div>

      <div className="relative w-80 h-80 bg-slate-50 rounded-full border-[12px] border-white shadow-inner flex items-center justify-center">
         {/* Numbers */}
         {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i + 1) * 30;
            const x = Math.sin(angle * Math.PI / 180) * 120;
            const y = -Math.cos(angle * Math.PI / 180) * 120;
            return (
              <div key={i} className="absolute font-black text-2xl text-slate-400" style={{ transform: `translate(${x}px, ${y}px)` }}>
                {i + 1}
              </div>
            );
         })}

         {/* Hands */}
         <motion.div animate={{ rotate: hDeg }} className="absolute w-2 h-20 bg-slate-800 rounded-full origin-bottom -translate-y-10" />
         <motion.div animate={{ rotate: mDeg }} className="absolute w-1.5 h-32 bg-slate-600 rounded-full origin-bottom -translate-y-16" />
         <motion.div animate={{ rotate: sDeg }} className="absolute w-0.5 h-36 bg-pink-500 rounded-full origin-bottom -translate-y-18" />
         <div className="absolute w-4 h-4 bg-pink-600 rounded-full z-50 border-4 border-white" />
      </div>

      <div className="bg-slate-900 text-white px-10 py-6 rounded-[2.5rem] shadow-xl text-5xl font-black font-mono tracking-widest border-4 border-slate-700">
         {hours.toString().padStart(2, '0')}:
         <span className="text-pink-400">{minutes.toString().padStart(2, '0')}</span>:
         <span className="text-slate-500">{seconds.toString().padStart(2, '0')}</span>
      </div>

      <button onClick={() => addSticker()} className="flex items-center gap-2 text-pink-400 font-bold hover:animate-pulse">
         <Sparkles size={20} /> I learned the time!
      </button>
    </div>
  );
}
