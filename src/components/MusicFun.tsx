import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

const NOTES = [
  { note: 'C', color: 'bg-red-500', frequency: 261.63, label: 'Do' },
  { note: 'D', color: 'bg-orange-500', frequency: 293.66, label: 'Re' },
  { note: 'E', color: 'bg-yellow-500', frequency: 329.63, label: 'Mi' },
  { note: 'F', color: 'bg-green-500', frequency: 349.23, label: 'Fa' },
  { note: 'G', color: 'bg-blue-500', frequency: 392.00, label: 'Sol' },
  { note: 'A', color: 'bg-indigo-500', frequency: 440.00, label: 'La' },
  { note: 'B', color: 'bg-purple-500', frequency: 493.88, label: 'Si' },
  { note: 'C2', color: 'bg-pink-500', frequency: 523.25, label: 'Do' },
];

export default function MusicFun() {
  const playNote = (freq: number) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
    
    if (Math.random() > 0.8) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#FFD700', '#FF69B4', '#00BFFF']
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 bg-white p-8 rounded-[3rem] shadow-2xl border-8 border-yellow-100">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Magic Xylophone</h2>
        <p className="text-slate-500 font-medium">Tap the colors to make happy music! 🎵</p>
      </div>

      <div className="flex items-end gap-3 h-64 w-full max-w-2xl bg-slate-50 p-6 rounded-3xl border-4 border-slate-100">
        {NOTES.map((n, i) => (
          <motion.button
            id={`note-${n.note}`}
            key={n.note}
            whileHover={{ scaleY: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playNote(n.frequency)}
            style={{ height: `${60 + i * 5}%` }}
            className={`flex-1 ${n.color} rounded-2xl shadow-lg border-x-4 border-white/20 flex flex-col items-center justify-end pb-6 transition-colors hover:brightness-110 active:brightness-125`}
          >
            <span className="text-white font-black text-xl drop-shadow-md">{n.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="w-12 h-12 bg-slate-200 rounded-full animate-bounce delay-75" />
        <div className="w-12 h-12 bg-slate-200 rounded-full animate-bounce delay-150" />
        <div className="w-12 h-12 bg-slate-200 rounded-full animate-bounce delay-300" />
      </div>
    </div>
  );
}
