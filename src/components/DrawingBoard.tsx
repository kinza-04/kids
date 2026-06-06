
import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, Trash2, Download } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

import { useRewards } from '../context/RewardContext';

export default function DrawingBoard() {
  const { addSticker } = useRewards();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF6B6B');
  const [lineWidth, setLineWidth] = useState(8);

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C', '#70D6FF', '#FF70A6'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Save current content
        const data = canvas.toDataURL();
        canvas.width = parent.clientWidth;
        canvas.height = 500;
        
        // Restore content
        const img = new Image();
        img.src = data;
        img.onload = () => ctx.drawImage(img, 0, 0);
        
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d')?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    // Tiny chance of reward on clear to encourage exploration
    if (Math.random() > 0.95) addSticker();
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-masterpiece.png';
    link.href = canvas.toDataURL();
    link.click();
    addSticker('5'); // Give Master Artist sticker
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl shadow-lg border-4 border-yellow-200">
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              id={`color-${c}`}
              key={c}
              className={`w-10 h-10 rounded-full border-4 transition-transform active:scale-90 ${color === c ? 'border-slate-800 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="2" 
            max="30" 
            value={lineWidth} 
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32 accent-pink-500"
          />
          <div className="flex gap-2">
            <button
              id="clear-canvas"
              onClick={clear}
              className="p-3 bg-red-100 text-red-600 rounded-2xl hover:bg-red-200 transition-colors shadow-sm"
              title="Clear Canvas"
            >
              <Trash2 size={24} />
            </button>
            <button
              id="download-canvas"
              onClick={download}
              className="p-3 bg-green-100 text-green-600 rounded-2xl hover:bg-green-200 transition-colors shadow-sm"
              title="Download Masterpiece"
            >
              <Download size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white p-1 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full touch-none"
        />
        <div className="absolute top-4 right-4 text-slate-300 pointer-events-none font-bold uppercase tracking-widest opacity-50">
          Magic Slate
        </div>
      </div>
    </div>
  );
}
