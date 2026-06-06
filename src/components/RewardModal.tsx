import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

export default function RewardModal() {
  const { showReward, closeReward } = useRewards();

  return (
    <AnimatePresence>
      {showReward && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 15 }}
            className="bg-white rounded-[3rem] p-8 max-w-sm w-full shadow-2xl border-8 border-yellow-400 relative text-center"
          >
            <button 
              onClick={closeReward}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={24} className="text-slate-400" />
            </button>

            <div className="mb-6">
              <Sparkles className="mx-auto text-yellow-400 w-12 h-12 animate-pulse" />
            </div>

            <div className="text-9xl mb-6 filter drop-shadow-xl animate-bounce">
              {showReward.emoji}
            </div>

            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-2">
              New Sticker!
            </h2>
            <p className="text-xl font-bold text-pink-500 mb-6 uppercase tracking-widest">
              {showReward.name}
            </p>

            <button
              onClick={closeReward}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95 text-xl uppercase"
            >
              Cool!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
