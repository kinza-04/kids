
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
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      className={`${animal.color} p-6 rounded-3xl shadow-xl cursor-pointer flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group`}
      onClick={() => speak(`${animal.name}. ${animal.fact}`)}
    >
      <div className="text-8xl mb-2 filter drop-shadow-lg group-hover:animate-bounce">
        {animal.emoji}
      </div>
      <h3 className="text-2xl font-bold text-white tracking-wide uppercase">
        {animal.name}
      </h3>
      <button 
        className="bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-colors"
      >
        <Volume2 size={24} />
      </button>
      
      {/* Decorative bubbles */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
    </motion.div>
  );
}
