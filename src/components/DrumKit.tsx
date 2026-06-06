import React from 'react';
import { motion } from 'motion/react';
import { Music2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

const DRUMS = [
  { id: '1', emoji: '🥁', note: 'Kick', freq: 60, color: 'bg-red-500' },
  { id: '2', emoji: '🥁', note: 'Snare', freq: 150, color: 'bg-blue-500' },
  { id: '3', emoji: '💿', note: 'Hi-Hat', freq: 400, color: 'bg-yellow-500' },
  { id: '4', emoji: '🪇', note: 'Tom', freq: 100, color: 'bg-green-500' },
  { id: '5', emoji: '🔔', note: 'Cowbell', freq: 800, color: 'bg-purple-500' },
];

export default function DrumKit() {
  const { addSticker } = useRewards();

  const play = (freq: number) => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.type = freq < 100 ? 'square' : 'sine';
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);

    if (Math.random() > 0.95) addSticker();
  };

  return (
    <div className="bg-slate-50 p-12 rounded-[4rem] shadow-2xl flex flex-col items-center gap-12 border-8 border-white">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-4 justify-center">
          <Music2 size={40} className="text-pink-500" /> Rock Band!
        </h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">TAP TO MAKE SOME NOISE!</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {DRUMS.map(d => (
          <motion.button
            key={d.id}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            onClick={() => play(d.freq)}
            className={`w-32 h-32 rounded-full ${d.color} shadow-2xl border-8 border-white/30 flex flex-col items-center justify-center gap-2 transition-all hover:brightness-110`}
          >
            <span className="text-5xl">{d.emoji}</span>
            <span className="text-white font-black text-xs uppercase">{d.note}</span>
          </motion.button>
        ))}
      </div>
      
      <div className="flex gap-4">
        {['🥁', '🎹', '🎸', '🎺'].map((e, i) => (
           <motion.div key={i} animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1, delay: i*0.2 }} className="text-4xl opacity-20">{e}</motion.div>
        ))}
      </div>
    </div>
  );
}
