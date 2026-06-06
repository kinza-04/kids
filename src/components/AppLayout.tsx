import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Gamepad2, Dog, Sparkles, Wind, Music, BookOpen, Star, Binary } from 'lucide-react';
import AnimalCard from './AnimalCard';
import DrawingBoard from './DrawingBoard';
import MemoryGame from './MemoryGame';
import BalloonPop from './BalloonPop';
import MusicFun from './MusicFun';
import AlphabetAdventure from './AlphabetAdventure';
import StickerBook from './StickerBook';
import MathMagic from './MathMagic';
import DinoDiscovery from './DinoDiscovery';
import FunZone from './FunZone';
import { ANIMALS } from '../data/animals';
import type { GameMode } from '../types';

export default function AppLayout() {
  const [mode, setMode] = useState<GameMode>('animals');

  const tabs = [
    { id: 'animals', label: 'Friends', icon: <Dog />, color: 'bg-orange-100 text-orange-600' },
    { id: 'drawing', label: 'Slate', icon: <Palette />, color: 'bg-pink-100 text-pink-600' },
    { id: 'game', label: 'Match', icon: <Gamepad2 />, color: 'bg-purple-100 text-purple-600' },
    { id: 'balloons', label: 'Popper', icon: <Wind />, color: 'bg-sky-100 text-sky-600' },
    { id: 'music', label: 'Music', icon: <Music />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'alphabet', label: 'Letters', icon: <BookOpen />, color: 'bg-green-100 text-green-600' },
    { id: 'math', label: 'Math', icon: <Binary />, color: 'bg-blue-100 text-blue-600' },
    { id: 'dino', label: 'Dino', icon: <Sparkles />, color: 'bg-teal-100 text-teal-600' },
    { id: 'funzone', label: 'Games', icon: <Gamepad2 />, color: 'bg-red-100 text-red-600' },
    { id: 'rewards', label: 'Stickers', icon: <Star />, color: 'bg-yellow-101 text-yellow-600' },
  ];

  // Fix yellow-101 to yellow-100 for safety (keeping 101 for specific branding if desired but Tailwind doesn't have it by default)
  const safeTabs = tabs.map(t => ({ ...t, color: t.color.replace('yellow-101', 'yellow-100') }));

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 md:p-8 flex flex-col gap-8 relative">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="fixed -top-10 -right-10 text-8xl opacity-10 pointer-events-none">☀️</motion.div>
      <header className="flex flex-col items-center gap-4 text-center">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-3 rounded-full shadow-xl">
          <Sparkles className="text-white animate-pulse" /><h1 className="text-3xl font-black text-white uppercase tracking-tighter">Kids Joy Park</h1><Sparkles className="text-white animate-pulse" />
        </motion.div>
        <p className="text-slate-500 font-semibold max-w-md">Explore, Draw, and Play in your magical kingdom!</p>
      </header>

      <nav className="flex justify-center flex-wrap gap-3 sticky top-4 z-50">
        {safeTabs.map((tab) => (
          <button key={tab.id} onClick={() => setMode(tab.id as GameMode)} className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold transition-all shadow-md active:scale-95 border-b-4 ${mode === tab.id ? `${tab.color} border-current scale-105 shadow-xl` : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}>
            {tab.icon}<span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {mode === 'animals' && (
            <motion.div key="animals" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {ANIMALS.map((animal) => (<AnimalCard key={animal.id} animal={animal} />))}
            </motion.div>
          )}
          {mode === 'drawing' && <motion.div key="drawing" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}><DrawingBoard /></motion.div>}
          {mode === 'game' && <motion.div key="game" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}><MemoryGame /></motion.div>}
          {mode === 'balloons' && <motion.div key="balloons" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}><BalloonPop /></motion.div>}
          {mode === 'music' && <motion.div key="music" initial={{ rotate: -5, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 5, opacity: 0 }}><MusicFun /></motion.div>}
          {mode === 'alphabet' && <motion.div key="alphabet" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}><AlphabetAdventure /></motion.div>}
          {mode === 'math' && <motion.div key="math" initial={{ scale: 0.93 }} animate={{ scale: 1 }}><MathMagic /></motion.div>}
          {mode === 'dino' && <motion.div key="dino" initial={{ scale: 0.93 }} animate={{ scale: 1 }}><DinoDiscovery /></motion.div>}
          {mode === 'funzone' && <motion.div key="funzone" initial={{ scale: 0.93 }} animate={{ scale: 1 }}><FunZone /></motion.div>}
          {mode === 'rewards' && <motion.div key="rewards" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}><StickerBook /></motion.div>}
        </AnimatePresence>
      </main>

      <footer className="mt-12 text-center text-slate-400 font-medium pb-8 flex flex-col items-center gap-2">
        <p>Made with ❤️ for all the little champions!</p>
        <div className="flex gap-4 text-2xl grayscale hover:grayscale-0 transition-all cursor-default">🎈 🍭 🦄 🌈 🍕</div>
      </footer>
    </div>
  );
}
