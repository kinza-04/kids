
export type GameMode = 'animals' | 'drawing' | 'game';

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
