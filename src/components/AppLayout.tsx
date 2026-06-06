import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Gamepad2, Dog, Sparkles, Wind, Music, BookOpen, Star, Binary, Rocket, Heart, Waves, Utensils, Flower, Target, Cloud, Clock, Car, Zap } from 'lucide-react';
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
import SpaceQuest from './SpaceQuest';
import PetCare from './PetCare';
import OceanSearch from './OceanSearch';
import LittleChef from './LittleChef';
import GardenMatch from './GardenMatch';
import BirdFlight from './BirdFlight';
import FruitSlasher from './FruitSlasher';
import DrumKit from './DrumKit';
import WeatherWorld from './WeatherWorld';
import ClockLearn from './ClockLearn';
import TrafficFun from './TrafficFun';
import BugSplat from './BugSplat';
import ShapeSorter from './ShapeSorter';
import DoodleJump from './DoodleJump';
import ZooSafari from './ZooSafari';
import { ANIMALS } from '../data/animals';
import type { GameMode } from '../types';

export default function AppLayout() {
  const [mode, setMode] = useState<GameMode>('animals');

  const tabs = [
    { id: 'animals', label: 'Friends', icon: <Dog />, color: 'bg-orange-100 text-orange-600' },
    { id: 'drawing', label: 'Slate', icon: <Palette />, color: 'bg-pink-100 text-pink-600' },
    { id: 'game', label: 'Match', icon: <Gamepad2 />, color: 'bg-purple-100 text-purple-600' },
    { id: 'balloons', label: 'Popper', icon: <Wind />, color: 'bg-sky-100 text-sky-600' },
    { id: 'music', label: 'Music', icon: <Music />, color: 'bg-yellow-101 text-yellow-600' },
    { id: 'alphabet', label: 'Letters', icon: <BookOpen />, color: 'bg-green-100 text-green-600' },
    { id: 'math', label: 'Math', icon: <Binary />, color: 'bg-blue-100 text-blue-600' },
    { id: 'dino', label: 'Dino', icon: <Sparkles />, color: 'bg-teal-100 text-teal-600' },
    { id: 'space', label: 'Space', icon: <Rocket />, color: 'bg-slate-700 text-white' },
    { id: 'pet', label: 'Pet', icon: <Heart />, color: 'bg-pink-100 text-pink-600' },
    { id: 'ocean', label: 'Sea', icon: <Waves />, color: 'bg-cyan-100 text-cyan-600' },
    { id: 'chef', label: 'Chef', icon: <Utensils />, color: 'bg-orange-100 text-orange-600' },
    { id: 'puzzle', label: 'Garden', icon: <Flower />, color: 'bg-green-100 text-green-600' },
    { id: 'birds', label: 'Flight', icon: <Wind />, color: 'bg-sky-100 text-sky-600' },
    { id: 'fruits', label: 'Slash', icon: <Target />, color: 'bg-red-100 text-red-600' },
    { id: 'drums', label: 'Drums', icon: <Music />, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'weather', label: 'Weather', icon: <Cloud />, color: 'bg-slate-100 text-slate-600' },
    { id: 'clock', label: 'Clock', icon: <Clock />, color: 'bg-pink-100 text-pink-600' },
    { id: 'traffic', label: 'Race', icon: <Car />, color: 'bg-slate-200 text-slate-800' },
    { id: 'bugs', label: 'Squash', icon: <Target />, color: 'bg-green-100 text-green-600' },
    { id: 'shapes', label: 'Shapes', icon: <Binary />, color: 'bg-purple-100 text-purple-600' },
    { id: 'jump', label: 'Hops', icon: <Zap />, color: 'bg-pink-100 text-pink-600' },
    { id: 'safari', label: 'Safari', icon: <Dog />, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'funzone', label: 'Center', icon: <Gamepad2 />, color: 'bg-red-100 text-red-600' },
    { id: 'rewards', label: 'Stickers', icon: <Star />, color: 'bg-yellow-101 text-yellow-600' },
  ];

  // Fix yellow-101 to yellow-100 for safety (keeping 101 for specific branding if desired but Tailwind doesn't have it by default)
  const safeTabs = tabs.map(t => ({ ...t, color: t.color.replace('yellow-101', 'yellow-100') }));

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-8 relative">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="fixed -top-10 -right-10 text-8xl opacity-10 pointer-events-none">☀️</motion.div>
      <header className="flex flex-col items-center gap-4 text-center">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-3 rounded-full shadow-xl">
          <Sparkles className="text-white animate-pulse" /><h1 className="text-3xl font-black text-white uppercase tracking-tighter">Kids Joy Park</h1><Sparkles className="text-white animate-pulse" />
        </motion.div>
        <p className="text-slate-500 font-semibold max-w-md">The Ultimate Adventure World for Little Explorers!</p>
      </header>

      <div className="bg-white/50 backdrop-blur-md p-4 rounded-[2.5rem] sticky top-4 z-50 border border-white shadow-xl">
        <nav className="flex justify-start md:justify-center overflow-x-auto gap-2 no-scrollbar pb-2">
          {safeTabs.map((tab) => (
            <button key={tab.id} onClick={() => setMode(tab.id as GameMode)} className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 border-b-2 whitespace-nowrap min-w-fit ${mode === tab.id ? `${tab.color} border-current scale-105` : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}>
              <div className="scale-75">{tab.icon}</div><span className="text-[10px] uppercase">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {mode === 'animals' && (
            <motion.div key="animals" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {ANIMALS.map((animal) => (<AnimalCard key={animal.id} animal={animal} />))}
            </motion.div>
          )}
          {mode === 'drawing' && <motion.div key="drawing" initial={{ y: 20 }} animate={{ y: 0 }}><DrawingBoard /></motion.div>}
          {mode === 'game' && <motion.div key="game" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><MemoryGame /></motion.div>}
          {mode === 'balloons' && <motion.div key="balloons" initial={{ scale: 0.8 }} animate={{ scale: 1 }}><BalloonPop /></motion.div>}
          {mode === 'music' && <motion.div key="music" initial={{ rotate: -5 }} animate={{ rotate: 0 }}><MusicFun /></motion.div>}
          {mode === 'alphabet' && <motion.div key="alphabet" initial={{ y: 50 }} animate={{ y: 0 }}><AlphabetAdventure /></motion.div>}
          {mode === 'math' && <motion.div key="math" initial={{ scale: 0.93 }} animate={{ scale: 1 }}><MathMagic /></motion.div>}
          {mode === 'dino' && <motion.div key="dino" initial={{ scale: 0.93 }} animate={{ scale: 1 }}><DinoDiscovery /></motion.div>}
          {mode === 'space' && <motion.div key="space" initial={{ y: 50 }} animate={{ y: 0 }}><SpaceQuest /></motion.div>}
          {mode === 'pet' && <motion.div key="pet" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><PetCare /></motion.div>}
          {mode === 'ocean' && <motion.div key="ocean" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><OceanSearch /></motion.div>}
          {mode === 'chef' && <motion.div key="chef" initial={{ x: -20 }} animate={{ x: 0 }}><LittleChef /></motion.div>}
          {mode === 'puzzle' && <motion.div key="puzzle" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><GardenMatch /></motion.div>}
          {mode === 'birds' && <motion.div key="birds" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><BirdFlight /></motion.div>}
          {mode === 'fruits' && <motion.div key="fruits" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><FruitSlasher /></motion.div>}
          {mode === 'drums' && <motion.div key="drums" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><DrumKit /></motion.div>}
          {mode === 'weather' && <motion.div key="weather" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><WeatherWorld /></motion.div>}
          {mode === 'clock' && <motion.div key="clock" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><ClockLearn /></motion.div>}
          {mode === 'traffic' && <motion.div key="traffic" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><TrafficFun /></motion.div>}
          {mode === 'bugs' && <motion.div key="bugs" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><BugSplat /></motion.div>}
          {mode === 'shapes' && <motion.div key="shapes" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><ShapeSorter /></motion.div>}
          {mode === 'jump' && <motion.div key="jump" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><DoodleJump /></motion.div>}
          {mode === 'safari' && <motion.div key="safari" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><ZooSafari /></motion.div>}
          {mode === 'funzone' && <motion.div key="funzone" initial={{ scale: 0.93 }} animate={{ scale: 1 }}><FunZone /></motion.div>}
          {mode === 'rewards' && <motion.div key="rewards" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><StickerBook /></motion.div>}
        </AnimatePresence>
      </main>

      <footer className="mt-12 text-center text-slate-400 font-medium pb-8 flex flex-col items-center gap-2">
        <p>Made with ❤️ for all the little champions!</p>
        <div className="flex gap-4 text-2xl grayscale hover:grayscale-0 transition-all cursor-default">🎈 🍭 🦄 🌈 🍕</div>
      </footer>
    </div>
  );
}
