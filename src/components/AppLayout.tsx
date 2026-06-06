
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Gamepad2, Dog, Sparkles } from 'lucide-react';
import AnimalCard from './AnimalCard';
import DrawingBoard from './DrawingBoard';
import MemoryGame from './MemoryGame';
import { ANIMALS } from '../data/animals';
import type { GameMode } from '../types';

export default function AppLayout() {
  const [mode, setMode] = useState<GameMode>('animals');

  const tabs = [
    { id: 'animals', label: 'Animal Friends', icon: <Dog />, color: 'bg-orange-100 text-orange-600' },
    { id: 'drawing', label: 'Magic Slate', icon: <Palette />, color: 'bg-pink-100 text-pink-600' },
    { id: 'game', label: 'Yummy Match', icon: <Gamepad2 />, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 md:p-8 flex flex-col gap-8">
      <header className="flex flex-col items-center gap-4 text-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 bg-yellow-400 px-6 py-2 rounded-full shadow-lg"
        >
          <Sparkles className="text-white animate-pulse" />
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Kids Joy Park
          </h1>
          <Sparkles className="text-white animate-pulse" />
        </motion.div>
        <p className="text-slate-500 font-semibold max-w-md">
          Explore, Draw, and Play in your magical kingdom! Click things to see what happens.
        </p>
      </header>

      <nav className="flex justify-center flex-wrap gap-4 sticky top-4 z-50">
        {tabs.map((tab) => (
          <button
            id={`tab-${tab.id}`}
            key={tab.id}
            onClick={() => setMode(tab.id as GameMode)}
            className={`flex items-center gap-3 px-6 py-4 rounded-3xl font-bold transition-all shadow-md active:scale-95 border-b-4 ${
              mode === tab.id 
                ? `${tab.color} border-current scale-105 shadow-xl` 
                : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {mode === 'animals' && (
            <motion.div
              key="animals"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {ANIMALS.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </motion.div>
          )}

          {mode === 'drawing' && (
            <motion.div
              key="drawing"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <DrawingBoard />
            </motion.div>
          )}

          {mode === 'game' && (
            <motion.div
              key="game"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <MemoryGame />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-12 text-center text-slate-400 font-medium pb-8">
        Made with ❤️ for all the little champions!
      </footer>
    </div>
  );
}
