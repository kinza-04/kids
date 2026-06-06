import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, MapPin } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

const ANIMALS = [
  { id: '1', name: 'Zebra', emoji: '🦓', bg: 'bg-slate-200' },
  { id: '2', name: 'Giraffe', emoji: '🦒', bg: 'bg-yellow-100' },
  { id: '3', name: 'Elephant', emoji: '🐘', bg: 'bg-blue-100' },
  { id: '4', name: 'Lion', emoji: '🦁', bg: 'bg-orange-100' },
  { id: '5', name: 'Monkey', emoji: '🐒', bg: 'bg-amber-100' },
  { id: '6', name: 'Tiger', emoji: '🐯', bg: 'bg-orange-200' },
];

export default function ZooSafari() {
  const { addSticker } = useRewards();
  const [active, setActive] = useState(ANIMALS[0]);
  const [snaps, setSnaps] = useState<string[]>([]);

  const snap = () => {
    if (!snaps.includes(active.id)) {
        setSnaps(prev => [...prev, active.id]);
        const ut = new SpeechSynthesisUtterance("Click! I got a picture of the " + active.name);
        window.speechSynthesis.speak(ut);
        if (snaps.length + 1 === ANIMALS.length) addSticker();
    }
  };

  return (
    <div className="bg-green-50 p-8 rounded-[4rem] shadow-2xl flex flex-col items-center gap-8 border-8 border-white min-h-[550px]">
      <div className="flex items-center gap-3 bg-white px-8 py-3 rounded-full shadow-sm">
         <MapPin className="text-green-600" />
         <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Wild Safari</h2>
      </div>

      <div className={`w-full max-w-2xl h-80 ${active.bg} rounded-[3rem] shadow-inner border-4 border-white relative overflow-hidden flex items-center justify-center`}>
         <AnimatePresence mode="wait">
           <motion.div
             key={active.id}
             initial={{ x: 100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             exit={{ x: -100, opacity: 0 }}
             className="text-[12rem] drop-shadow-2xl"
           >
             {active.emoji}
           </motion.div>
         </AnimatePresence>
         
         <div className="absolute inset-0 border-[40px] border-black/10 pointer-events-none" />
         <div className="absolute top-4 left-4 text-xs font-black uppercase text-slate-400 bg-white/50 px-2 rounded tracking-widest">Live Feed: Africa</div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
         <button 
           onClick={snap}
           className="bg-slate-900 text-white p-8 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border-4 border-white"
         >
           <Camera size={48} />
         </button>
         
         <div className="flex flex-wrap justify-center gap-3">
            {ANIMALS.map(a => (
              <button
                key={a.id}
                onClick={() => setActive(a)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all shadow-md ${
                  active.id === a.id ? 'bg-green-500 text-white scale-110' : 'bg-white text-slate-400'
                }`}
              >
                {a.emoji}
                {snaps.includes(a.id) && <div className="absolute -top-1 -right-1 text-xs">📸</div>}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
