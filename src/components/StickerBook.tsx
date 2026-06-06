import React from 'react';
import { motion } from 'motion/react';
import { STICKERS } from '../data/stickers';
import { useRewards } from '../context/RewardContext';
import { Trophy } from 'lucide-react';

export default function StickerBook() {
  const { earnedStickers } = useRewards();

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-pink-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-3 rounded-2xl text-white">
            <Trophy size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">My Sticker Book</h2>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
              Earned {earnedStickers.length} of {STICKERS.length} Stickers
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {STICKERS.map((sticker) => {
          const isEarned = earnedStickers.includes(sticker.id);
          return (
            <motion.div
              id={`sticker-${sticker.id}`}
              key={sticker.id}
              whileHover={isEarned ? { scale: 1.1, rotate: 5 } : {}}
              className={`aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
                isEarned 
                  ? 'bg-white shadow-lg border-4 border-white' 
                  : 'bg-slate-200 grayscale opacity-30 border-4 border-transparent'
              }`}
            >
              <span className={`text-4xl md:text-5xl ${isEarned ? 'filter drop-shadow-md' : ''}`}>
                {isEarned ? sticker.emoji : '❓'}
              </span>
              
              {isEarned && (
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-transparent pointer-events-none" />
              )}
              
              {sticker.rarity === 'super' && isEarned && (
                <div className="absolute top-1 right-1">
                  <span className="text-xs">✨</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
