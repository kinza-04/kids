import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Sticker } from '../types';
import { STICKERS } from '../data/stickers';
import confetti from 'canvas-confetti';

interface RewardContextType {
  earnedStickers: string[];
  addSticker: (id?: string) => void;
  showReward: Sticker | null;
  closeReward: () => void;
}

const RewardContext = createContext<RewardContextType | undefined>(undefined);

export function RewardProvider({ children }: { children: React.ReactNode }) {
  const [earnedStickers, setEarnedStickers] = useState<string[]>([]);
  const [showReward, setShowReward] = useState<Sticker | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('kids_joy_stickers');
    if (saved) setEarnedStickers(JSON.parse(saved));
  }, []);

  const addSticker = (id?: string) => {
    let sticker: Sticker;
    if (id) {
      sticker = STICKERS.find(s => s.id === id) || STICKERS[0];
    } else {
      // Pick a random sticker the user doesn't have yet, or just a random one
      const available = STICKERS.filter(s => !earnedStickers.includes(s.id));
      const pool = available.length > 0 ? available : STICKERS;
      sticker = pool[Math.floor(Math.random() * pool.length)];
    }

    if (!earnedStickers.includes(sticker.id)) {
      const newEarned = [...earnedStickers, sticker.id];
      setEarnedStickers(newEarned);
      localStorage.setItem('kids_joy_stickers', JSON.stringify(newEarned));
    }

    setShowReward(sticker);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#00BFFF']
    });

    const utterance = new SpeechSynthesisUtterance(`Yay! You won a ${sticker.name} sticker!`);
    window.speechSynthesis.speak(utterance);
  };

  const closeReward = () => setShowReward(null);

  return (
    <RewardContext.Provider value={{ earnedStickers, addSticker, showReward, closeReward }}>
      {children}
    </RewardContext.Provider>
  );
}

export const useRewards = () => {
  const context = useContext(RewardContext);
  if (!context) throw new Error('useRewards must be used within a RewardProvider');
  return context;
}
