import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRewards } from '../context/RewardContext';

export default function MathMagic() {
  const { addSticker } = useRewards();
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+' as '+' | '-' });
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 10) + 5;
    const b = Math.floor(Math.random() * 10) + 2;
    const op = Math.random() > 0.5 ? '+' : (a >= b ? '-' : '+');
    const ans = op === '+' ? a + b : a - b;
    
    // Generate tricky options
    const opts = new Set([ans]);
    while(opts.size < 4) {
      opts.add(Math.max(0, ans + Math.floor(Math.random() * 5) - 2));
    }
    
    setProblem({ a, b, op });
    setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleAnswer = (val: number) => {
    const ans = problem.op === '+' ? problem.a + problem.b : problem.a - problem.b;
    if (val === ans) {
      setFeedback('correct');
      setScore(s => s + 1);
      if (score + 1 === 10) {
        confetti();
        addSticker();
      }
      setTimeout(generateProblem, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl flex flex-col items-center gap-12 border-8 border-blue-50">
      <div className="flex items-center gap-4 bg-blue-100 px-6 py-2 rounded-full">
        <Sparkles className="text-blue-500" />
        <span className="font-black text-blue-600 uppercase tracking-tighter text-xl">Math Magic</span>
        <span className="bg-white px-3 py-1 rounded-full text-blue-600 font-bold ml-2">Score: {score}</span>
      </div>

      <div className="flex items-center gap-8 md:gap-12 text-7xl md:text-[8rem] font-black text-slate-800">
        <NumberBox val={problem.a} />
        <span className="text-blue-400">{problem.op}</span>
        <NumberBox val={problem.b} />
        <span className="text-slate-300">=</span>
        <span className="text-blue-500">?</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {options.map((opt) => (
          <motion.button
            key={opt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(opt)}
            className="h-24 bg-slate-50 rounded-3xl text-4xl font-black text-slate-700 shadow-md border-b-8 border-slate-100 hover:bg-white hover:border-blue-400 transition-colors"
          >
            {opt}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`fixed inset-0 pointer-events-none flex items-center justify-center z-[100]`}
          >
            {feedback === 'correct' ? (
              <CheckCircle2 size={200} className="text-green-500 drop-shadow-2xl" />
            ) : (
              <XCircle size={200} className="text-red-500 drop-shadow-2xl" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full transition-colors ${i < score ? 'bg-green-400' : 'bg-slate-200'}`} />
        ))}
      </div>
    </div>
  );
}

function NumberBox({ val }: { val: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {val}
        {/* Visual dots helper */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap gap-1 w-16 justify-center">
          {Array.from({ length: val }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-300" />
          ))}
        </div>
      </div>
    </div>
  );
}
