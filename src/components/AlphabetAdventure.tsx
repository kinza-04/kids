import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Trophy } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

const ALPHABET = [
  { letter: 'A', word: 'Apple', emoji: '🍎', color: 'bg-red-400' },
  { letter: 'B', word: 'Butterfly', emoji: '🦋', color: 'bg-blue-400' },
  { letter: 'C', word: 'Cat', emoji: '🐱', color: 'bg-orange-400' },
  { letter: 'D', word: 'Dolphin', emoji: '🐬', color: 'bg-sky-400' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', color: 'bg-slate-400' },
  { letter: 'F', word: 'Flower', emoji: '🌸', color: 'bg-pink-400' },
  { letter: 'G', word: 'Grapes', emoji: '🍇', color: 'bg-purple-400' },
  { letter: 'H', word: 'Horse', emoji: '🐴', color: 'bg-amber-600' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', color: 'bg-cyan-300' },
  { letter: 'J', word: 'Jellyfish', emoji: '🪼', color: 'bg-indigo-300' },
  { letter: 'K', word: 'Kite', emoji: '🪁', color: 'bg-yellow-400' },
  { letter: 'L', word: 'Lion', emoji: '🦁', color: 'bg-orange-500' },
  { letter: 'M', word: 'Moon', emoji: '🌙', color: 'bg-slate-700' },
  { letter: 'N', word: 'Noodles', emoji: '🍜', color: 'bg-red-500' },
  { letter: 'O', word: 'Owl', emoji: '🦉', color: 'bg-amber-800' },
  { letter: 'P', word: 'Panda', emoji: '🐼', color: 'bg-slate-300' },
  { letter: 'Q', word: 'Queen', emoji: '👸', color: 'bg-purple-500' },
  { letter: 'R', word: 'Rainbow', emoji: '🌈', color: 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400' },
  { letter: 'S', word: 'Sun', emoji: '☀️', color: 'bg-yellow-500' },
  { letter: 'T', word: 'Train', emoji: '🚂', color: 'bg-blue-600' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', color: 'bg-purple-300' },
  { letter: 'V', word: 'Violin', emoji: '🎻', color: 'bg-red-700' },
  { letter: 'W', word: 'Whale', emoji: '🐋', color: 'bg-blue-400' },
  { letter: 'X', word: 'Xylophone', emoji: '🎹', color: 'bg-green-400' },
  { letter: 'Y', word: 'Yo-Yo', emoji: '🪀', color: 'bg-green-400' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: 'bg-slate-200' },
];

export default function AlphabetAdventure() {
  const { addSticker } = useRewards();
  const [selected, setSelected] = useState(ALPHABET[0]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (item: typeof ALPHABET[0]) => {
    setSelected(item);
    speak(`${item.letter}. ${item.letter} for ${item.word}.`);
    if (item.letter === 'Z') addSticker('12'); // Robot Pal or similar
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-stretch">
      <div className="flex-1 bg-white p-8 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center text-center gap-6 border-8 border-pink-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.letter}
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, rotate: 10 }}
            className="space-y-4"
          >
            <div className="text-[10rem] leading-none drop-shadow-2xl">
              {selected.emoji}
            </div>
            <div className={`text-8xl font-black text-transparent bg-clip-text ${selected.color} inline-block`}>
              {selected.letter}
            </div>
            <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">
              {selected.word}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full md:w-80 bg-white/50 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border-4 border-white h-[600px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-4 gap-3">
          {ALPHABET.map((item) => (
            <motion.button
              id={`alpha-${item.letter}`}
              key={item.letter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(item)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-2xl font-black transition-all ${
                selected.letter === item.letter
                  ? `${item.color} text-white shadow-lg scale-110`
                  : 'bg-white text-slate-400 hover:text-slate-600'
              }`}
            >
              {item.letter}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
