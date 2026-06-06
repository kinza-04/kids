import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Flame, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

const TOPPINGS = [
  { id: 'pepperoni', emoji: '🍕', label: 'Pepperoni' },
  { id: 'mushroom', emoji: '🍄', label: 'Mushroom' },
  { id: 'pineapple', emoji: '🍍', label: 'Pineapple' },
  { id: 'cheese', emoji: '🧀', label: 'Cheese' },
  { id: 'olive', emoji: '🫒', label: 'Olive' },
];

export default function LittleChef() {
  const { addSticker } = useRewards();
  const [placedToppings, setPlacedToppings] = useState<{ id: string, x: number, y: number, item: string }[]>([]);
  const [isDone, setIsDone] = useState(false);

  const addTopping = (emoji: string) => {
    if (isDone) return;
    setPlacedToppings(prev => [...prev, { 
      id: Math.random().toString(), 
      x: Math.random() * 60 + 20, 
      y: Math.random() * 60 + 20, 
      item: emoji 
    }]);
  };

  const finish = () => {
    if (placedToppings.length < 5) return;
    setIsDone(true);
    confetti();
    addSticker();
  };

  const reset = () => {
    setPlacedToppings([]);
    setIsDone(false);
  };

  return (
    <div className="bg-orange-50 p-8 rounded-[4rem] shadow-2xl flex flex-col items-center gap-8 border-8 border-white min-h-[550px]">
      <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm">
        <Utensils className="text-orange-500" />
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Little Chef</h2>
      </div>

      <div className="relative">
        {/* Pizza Crust */}
        <div className="w-[300px] h-[300px] bg-yellow-100 rounded-full border-[12px] border-orange-200 shadow-2xl relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-2 bg-red-400 rounded-full opacity-30 blur-md" /> {/* Sauce */}
           <div className="absolute inset-4 bg-yellow-200/80 rounded-full" /> {/* Cheese base */}

           <AnimatePresence>
             {placedToppings.map((t) => (
               <motion.div
                 key={t.id}
                 initial={{ scale: 0, rotate: 180 }}
                 animate={{ scale: 1, rotate: Math.random() * 360 }}
                 className="absolute text-4xl cursor-default select-none pointer-events-none"
                 style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
               >
                 {t.item}
               </motion.div>
             ))}
           </AnimatePresence>

           {isDone && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="absolute inset-0 bg-orange-500/20 flex items-center justify-center backdrop-blur-[2px]"
             >
               <div className="bg-white px-6 py-3 rounded-full font-black text-orange-600 shadow-xl border-4 border-orange-100 uppercase tracking-widest text-xl animate-bounce">
                 Delicious! 🍕
               </div>
             </motion.div>
           )}
        </div>
      </div>

      {!isDone ? (
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {TOPPINGS.map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addTopping(t.emoji)}
                className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md border-b-4 border-slate-100 hover:border-orange-400 transition-colors"
              >
                {t.emoji}
              </motion.button>
            ))}
          </div>
          <button 
            disabled={placedToppings.length < 5}
            onClick={finish}
            className="bg-orange-500 text-white px-12 py-4 rounded-3xl font-black text-xl shadow-xl hover:bg-orange-400 disabled:opacity-50 disabled:grayscale transition-all flex items-center gap-3"
          >
            <Flame /> Bake Pizza!
          </button>
        </div>
      ) : (
        <button onClick={reset} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors">
          <RefreshCw size={18} /> Make another one?
        </button>
      )}
    </div>
  );
}
