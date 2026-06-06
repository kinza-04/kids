
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import type { Animal } from '../types';

interface AnimalCardProps {
  animal: Animal;
  key?: string | number;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`${animal.color} p-6 rounded-[2.5rem] shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group border-4 border-white/30`}
      onClick={() => speak(`${animal.name}. ${animal.fact}`)}
    >
      <div className="text-8xl mb-2 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-300">
        {animal.emoji}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-black text-white tracking-wide uppercase drop-shadow-sm">
          {animal.name}
        </h3>
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{animal.sound}</p>
      </div>
      <button 
        className="bg-white/40 p-3 rounded-full text-white hover:bg-white/60 transition-colors shadow-lg active:scale-90"
      >
        <Volume2 size={24} fill="currentColor" />
      </button>
      
      {/* Interactive Sparkles on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xl">✨</span>
      </div>
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
    </motion.div>
  );
}
