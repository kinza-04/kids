import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Play, Volume2, Sparkles, Ghost, Timer, Target, Cloud, Heart, Star, Rocket, Waves } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

type MiniGame = 'emoji-catcher' | 'sound-tap' | 'ghost-hunter' | 'quick-count' | 'color-mix' | 'bubble-pop' | 'cloud-jump' | 'shape-match' | 'cake-decor' | 'ocean-find' | 'space-race' | 'farm-talk';

export default function FunZone() {
  const { addSticker } = useRewards();
  const [activeGame, setActiveGame] = useState<MiniGame | null>(null);

  const games: { id: MiniGame, title: string, icon: any, color: string }[] = [
    { id: 'emoji-catcher', title: 'Emoji Catch', icon: <Target className="text-red-500" />, color: 'bg-red-50 border-red-200' },
    { id: 'ghost-hunter', title: 'Ghost Hunt', icon: <Ghost className="text-purple-500" />, color: 'bg-purple-50 border-purple-200' },
    { id: 'sound-tap', title: 'Sound Board', icon: <Volume2 className="text-blue-500" />, color: 'bg-blue-50 border-blue-200' },
    { id: 'quick-count', title: 'Star Click', icon: <Timer className="text-yellow-500" />, color: 'bg-yellow-50 border-yellow-200' },
    { id: 'color-mix', title: 'Color Mix', icon: <Sparkles className="text-pink-500" />, color: 'bg-pink-50 border-pink-200' },
    { id: 'bubble-pop', title: 'Bubble Pop', icon: <Sparkles className="text-sky-500" />, color: 'bg-sky-50 border-sky-200' },
    { id: 'cloud-jump', title: 'Cloud Jump', icon: <Cloud className="text-blue-400" />, color: 'bg-blue-50 border-blue-100' },
    { id: 'shape-match', title: 'Shape Snap', icon: <Star className="text-yellow-600" />, color: 'bg-yellow-100 border-yellow-200' },
    { id: 'cake-decor', title: 'Cake Party', icon: <Heart className="text-pink-600" />, color: 'bg-pink-100 border-pink-200' },
    { id: 'ocean-find', title: 'Ocean Find', icon: <Waves className="text-cyan-500" />, color: 'bg-cyan-50 border-cyan-200' },
    { id: 'space-race', title: 'Space Jam', icon: <Rocket className="text-slate-600" />, color: 'bg-slate-50 border-slate-200' },
    { id: 'farm-talk', title: 'Farm Talk', icon: <Volume2 className="text-orange-500" />, color: 'bg-orange-50 border-orange-200' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {!activeGame ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {games.map(g => (
            <GameOption key={g.id} title={g.title} icon={g.icon} color={g.color} onClick={() => setActiveGame(g.id)} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-8 border-white relative min-h-[500px]">
          <button onClick={() => setActiveGame(null)} className="absolute top-4 left-4 bg-slate-100 px-4 py-2 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 transition-colors z-50 text-sm">← Back</button>
          <div className="mt-8">
            {activeGame === 'emoji-catcher' && <EmojiCatcher onWin={() => addSticker()} />}
            {activeGame === 'ghost-hunter' && <GhostHunter onWin={() => addSticker()} />}
            {activeGame === 'quick-count' && <QuickClick onWin={() => addSticker()} />}
            {activeGame === 'sound-tap' && <SoundBoard onWin={() => addSticker()} />}
            {activeGame === 'color-mix' && <ColorMixer onWin={() => addSticker()} />}
            {activeGame === 'bubble-pop' && <BubblePopper onWin={() => addSticker()} />}
            {activeGame === 'cloud-jump' && <CloudJumper onWin={() => addSticker()} />}
            {activeGame === 'shape-match' && <ShapeMatch onWin={() => addSticker()} />}
            {activeGame === 'cake-decor' && <CakeDecor onWin={() => addSticker()} />}
            {activeGame === 'ocean-find' && <OceanFind onWin={() => addSticker()} />}
            {activeGame === 'space-race' && <SpaceRace onWin={() => addSticker()} />}
            {activeGame === 'farm-talk' && <FarmTalk onWin={() => addSticker()} />}
          </div>
        </div>
      )}
    </div>
  );
}

function GameOption({ title, icon, color, onClick }: any) {
  return (
    <motion.button whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick} className={`p-4 rounded-[2rem] border-4 ${color} text-center flex flex-col items-center gap-2 shadow-lg`}>
      <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">{React.cloneElement(icon, { size: 20 })}</div>
      <h3 className="text-sm font-black text-slate-800 uppercase tracking-tighter">{title}</h3>
    </motion.button>
  );
}

// Reuse previous ones and add new ones...
function EmojiCatcher({ onWin }: any) { 
  const [s, setS] = useState(0); 
  const handle = () => {
    const next = s + 1;
    setS(next);
    if(next === 5) { confetti(); onWin(); }
  };
  return <div onClick={handle} className="h-[400px] bg-red-50 rounded-3xl flex items-center justify-center text-8xl cursor-pointer">🍎 <span className="absolute top-4 right-4 text-2xl font-bold">{s}/5</span></div>; 
}
function GhostHunter({ onWin }: any) { 
  const [s, setS] = useState(0);
  const handle = () => {
    const next = s + 1;
    setS(next);
    if(next === 5) { confetti(); onWin(); }
  };
  return <div onClick={handle} className="h-[400px] bg-purple-900 rounded-3xl flex items-center justify-center text-8xl cursor-pointer">👻 <span className="absolute top-4 right-4 text-2xl font-bold text-white">{s}/5</span></div>;
}
function QuickClick({ onWin }: any) { 
  const [s, setS] = useState(0);
  const handle = () => {
    const next = s + 1;
    setS(next);
    if(next === 10) { confetti(); onWin(); }
  };
  return <div onClick={handle} className="h-[400px] bg-yellow-50 rounded-3xl flex items-center justify-center text-8xl cursor-pointer">⭐ <span className="absolute top-4 right-4 text-2xl font-bold">{s}/10</span></div>;
}
function SoundBoard({ onWin }: any) {
  const play = (t:string) => { window.speechSynthesis.speak(new SpeechSynthesisUtterance(t)); onWin(); };
  return <div className="grid grid-cols-2 gap-4 h-[400px]">{['Meow', 'Woof', 'Roar', 'Oink'].map(t => <button key={t} onClick={() => play(t)} className="bg-blue-50 rounded-3xl text-3xl font-bold">{t}!</button>)}</div>;
}
function ColorMixer({ onWin }: any) { return <div className="h-[400px] flex items-center justify-center text-5xl font-black gap-4" onClick={onWin}>🔴 + 🔵 = 🟣</div>; }
function BubblePopper({ onWin }: any) { return <div className="h-[400px] bg-sky-50 rounded-3xl flex items-center justify-center text-8xl cursor-pointer" onClick={onWin}>🫧</div>; }
function CloudJumper({ onWin }: any) { return <div className="h-[400px] bg-blue-400 rounded-3xl flex items-center justify-center text-8xl cursor-pointer" onClick={onWin}>☁️</div>; }
function ShapeMatch({ onWin }: any) { return <div className="h-[400px] bg-yellow-100 rounded-3xl flex items-center justify-center text-8xl cursor-pointer" onClick={onWin}>🔺</div>; }
function CakeDecor({ onWin }: any) { return <div className="h-[400px] bg-pink-100 rounded-3xl flex items-center justify-center text-8xl cursor-pointer" onClick={onWin}>🍰</div>; }
function OceanFind({ onWin }: any) { return <div className="h-[400px] bg-cyan-700 rounded-3xl flex items-center justify-center text-8xl cursor-pointer" onClick={onWin}>🐙</div>; }
function SpaceRace({ onWin }: any) { return <div className="h-[400px] bg-slate-900 rounded-3xl flex items-center justify-center text-8xl cursor-pointer" onClick={onWin}>🚀</div>; }
function FarmTalk({ onWin }: any) { return <div className="h-[400px] bg-orange-100 rounded-3xl flex items-center justify-center text-8xl cursor-pointer" onClick={onWin}>🐮</div>; }
