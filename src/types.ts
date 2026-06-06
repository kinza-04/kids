
export type GameMode = 'animals' | 'drawing' | 'game' | 'balloons' | 'music' | 'alphabet' | 'rewards' | 'math' | 'coloring' | 'funzone' | 'dino';

export interface Sticker {
  id: string;
  emoji: string;
  name: string;
  rarity: 'common' | 'rare' | 'super';
  earnedAt?: number;
}

export interface Animal {
  id: string;
  name: string;
  emoji: string;
  sound: string;
  color: string;
  fact: string;
}

export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}
