
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy } from 'lucide-react';
import type { Card } from '../types';

const EMOJIS = ['🍦', '🍭', '🍕', '🍩', '🍔', '🍟', '🍓', '🍇'];

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(m => m + 1);
          
          if (matches + 1 === EMOJIS.length) {
            confetti({
              particleCount: 150,
              spread: 100,
              origin: { y: 0.6 }
            });
          }
        }, 600);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center justify-between w-full max-w-md bg-white p-4 rounded-3xl shadow-md border-4 border-purple-200">
        <div className="flex items-center gap-2 font-bold text-purple-600">
          <Trophy size={20} />
          <span>Matches: {matches}/{EMOJIS.length}</span>
        </div>
        <div className="font-bold text-slate-500">Moves: {moves}</div>
        <button 
          id="reset-game"
          onClick={initGame}
          className="p-2 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-md">
        {cards.map((card) => (
          <motion.div
            id={`card-${card.id}`}
            key={card.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square cursor-pointer relative preserve-3d transition-duration-500`}
            onClick={() => handleCardClick(card.id)}
          >
            <AnimatePresence mode='wait'>
              {!card.isFlipped && !card.isMatched ? (
                <motion.div
                  key="back"
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: 90 }}
                  className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white"
                >
                  <span className="text-4xl text-white font-black opacity-30">?</span>
                </motion.div>
              ) : (
                <motion.div
                  key="front"
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  exit={{ rotateY: 90 }}
                  className={`w-full h-full rounded-2xl flex items-center justify-center text-4xl shadow-lg border-4 border-white ${card.isMatched ? 'bg-green-100 grayscale-0' : 'bg-white'}`}
                >
                  {card.emoji}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {matches === EMOJIS.length && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-green-500 text-white px-8 py-4 rounded-3xl font-bold text-xl shadow-2xl flex items-center gap-3 animate-bounce"
        >
          <Trophy /> You Won Super Kid!
        </motion.div>
      )}
    </div>
  );
}
