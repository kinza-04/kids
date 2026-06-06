import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

const DINOS = [
  { id: 't-rex', name: 'T-Rex', emoji: '🦖', fact: 'I am the King of Dinosaurs with very sharp teeth!', color: 'bg-green-500' },
  { id: 'tri', name: 'Triceratops', emoji: '󾓥', fact: 'I have three horns to protect myself from big dinos!', color: 'bg-blue-500' }, // Using similar emoji or just generic dino
  { id: 'bronto', name: 'Brontosaurus', emoji: '🦕', fact: 'I have a very long neck to reach high trees!', color: 'bg-teal-500' },
  { id: 'pter', name: 'Pterodactyl', emoji: '🦅', fact: 'I am not a dinosaur, but a flying reptile friend!', color: 'bg-orange-500' },
  { id: 'egg', name: 'Dino Egg', emoji: '🥚', fact: 'Something is clicking inside... hatch it!', color: 'bg-yellow-500' },
];

export default function DinoDiscovery() {
  const { addSticker } = useRewards();
  const [selected, setSelected] = useState(DINOS[0]);
  const [hatched, setHatched] = useState(false);

  const speak = (text: string) => {
    const ut = new SpeechSynthesisUtterance(text);
    ut.pitch = 0.8;
    window.speechSynthesis.speak(ut);
  };

  const handleSelect = (dino: typeof DINOS[0]) => {
    setSelected(dino);
    if (dino.id === 'egg') {
       speak("Tap the egg to hatch a surprise!");
       setHatched(false);
    } else {
       speak(dino.fact);
    }
  };

  const hatch = () => {
    if (selected.id === 'egg' && !hatched) {
      setHatched(true);
      speak("Rawr! A baby T-Rex is born!");
      addSticker('3'); // Space Explorer or similar, but let's just trigger a reward
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-12 rounded-[4rem] shadow-2xl border-8 border-green-50 flex flex-col items-center text-center gap-6 min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id + (hatched ? 'hatched' : '')}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            onClick={hatch}
            className={`text-[12rem] cursor-pointer drop-shadow-2xl transition-transform active:scale-90`}
          >
            {selected.id === 'egg' && hatched ? '🦖' : selected.emoji}
          </motion.div>
        </AnimatePresence>

        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
            {selected.id === 'egg' && hatched ? 'Baby T-Rex' : selected.name}
          </h2>
          <p className="text-xl text-slate-500 font-bold max-w-md">
            {selected.id === 'egg' && !hatched ? 'A mystery awaits...' : selected.fact}
          </p>
        </div>

        {selected.id === 'egg' && !hatched && (
           <motion.div 
             animate={{ x: [-2, 2, -2] }}
             transition={{ repeat: Infinity, duration: 0.2 }}
             className="text-pink-500 font-black animate-pulse"
           >
             TAP TO HATCH!
           </motion.div>
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-4">
        {DINOS.map((dino) => (
          <motion.button
            key={dino.id}
            whileHover={{ y: -5 }}
            onClick={() => handleSelect(dino)}
            className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg border-b-4 transition-all ${
              selected.id === dino.id ? `${dino.color} border-current scale-110 shadow-xl` : 'bg-white border-slate-100 grayscale opacity-70'
            }`}
          >
            {dino.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
