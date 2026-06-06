
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function MagicCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number, y: number, id: string }[]>([]);

  useEffect(() => {
    let counter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const newId = `${Date.now()}-${counter++}`;
      setTrail(prev => [{ x: e.clientX, y: e.clientY, id: newId }, ...prev].slice(0, 5));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ left: position.x, top: position.y }}
      >
        <span className="text-2xl">✨</span>
      </div>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{ left: point.x, top: point.y }}
        />
      ))}
    </>
  );
}
