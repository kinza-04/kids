import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Utensils, Zap, Moon, Sun, Sparkles } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

export default function PetCare() {
  const { addSticker } = useRewards();
  const [hunger, setHunger] = useState(80);
  const [happiness, setHappiness] = useState(80);
  const [energy, setEnergy] = useState(100);
  const [isSleeping, setIsSleeping] = useState(false);
  const [petMood, setPetMood] = useState<'happy' | 'sad' | 'eating' | 'sleeping'>('happy');

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSleeping) {
        setHunger(h => Math.max(0, h - 4));
        setHappiness(hp => Math.max(0, hp - 3));
        setEnergy(e => Math.max(0, e - 2));
      } else {
        setEnergy(e => Math.min(100, e + 3));
        if (energy >= 100) setIsSleeping(false);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isSleeping, energy]);

  useEffect(() => {
    if (hunger < 30 || happiness < 30) setPetMood('sad');
    else if (!isSleeping) setPetMood('happy');
  }, [hunger, happiness, isSleeping]);

  const feed = () => {
    setHunger(h => Math.min(100, h + 20));
    setPetMood('eating');
    setTimeout(() => setPetMood('happy'), 2000);
    if (hunger >= 90) addSticker();
  };

  const play = () => {
    if (energy < 20) return;
    setHappiness(h => Math.min(100, h + 20));
    setEnergy(e => Math.max(0, e - 20));
    if (happiness >= 90) addSticker();
  };

  return (
    <div className={`p-8 rounded-[4rem] shadow-2xl border-8 transition-colors duration-1000 ${isSleeping ? 'bg-indigo-950 border-indigo-900' : 'bg-sky-50 border-sky-100'}`}>
      <div className="flex flex-col items-center gap-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full">
          <StatBar icon={<Utensils size={16} />} color="bg-orange-400" value={hunger} label="Hunger" />
          <StatBar icon={<Heart size={16} />} color="bg-pink-400" value={happiness} label="Joy" />
          <StatBar icon={<Zap size={16} />} color="bg-yellow-400" value={energy} label="Energy" />
        </div>

        {/* Pet Display */}
        <div className="relative h-64 flex items-center justify-center">
           <motion.div
             animate={isSleeping ? { scale: [1, 1.05, 1], y: [0, -5, 0] } : { y: [0, -10, 0] }}
             transition={isSleeping ? { duration: 3, repeat: Infinity } : { duration: 2, repeat: Infinity }}
             className="text-[10rem] drop-shadow-2xl cursor-pointer"
             onClick={() => setHappiness(h => Math.min(100, h + 5))}
           >
             {isSleeping ? '😴' : (petMood === 'eating' ? '😋' : (petMood === 'sad' ? '🥺' : '🐱'))}
           </motion.div>
           {isSleeping && (
             <motion.div animate={{ opacity: [0, 1, 0], y: [-20, -50] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-0 right-0 text-4xl font-bold text-sky-300">Zzz</motion.div>
           )}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <ControlButton icon={<Utensils />} label="Feed" color="bg-orange-500" onClick={feed} />
          <ControlButton icon={<Sparkles />} label="Play" color="bg-pink-500" onClick={play} disabled={energy < 20} />
          <ControlButton icon={isSleeping ? <Sun /> : <Moon />} label={isSleeping ? "Wake" : "Sleep"} color="bg-indigo-500" onClick={() => setIsSleeping(!isSleeping)} />
        </div>
      </div>
    </div>
  );
}

function StatBar({ icon, color, value, label }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 text-[10px] uppercase font-black text-slate-500 tracking-tighter">
        {icon} {label}
      </div>
      <div className="h-4 bg-white/50 rounded-full overflow-hidden border border-white/20">
        <motion.div animate={{ width: `${value}%` }} className={`h-full ${color}`} />
      </div>
    </div>
  );
}

function ControlButton({ icon, label, color, onClick, disabled }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${color} text-white px-6 py-4 rounded-3xl flex flex-col items-center gap-1 shadow-lg disabled:opacity-50 disabled:grayscale transition-all`}
    >
      {icon}
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </motion.button>
  );
}
