import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Snowflake } from 'lucide-react';
import { useRewards } from '../context/RewardContext';

type Weather = 'sunny' | 'rainy' | 'stormy' | 'windy' | 'snowy';

export default function WeatherWorld() {
  const { addSticker } = useRewards();
  const [weather, setWeather] = useState<Weather>('sunny');

  const change = (w: Weather) => {
    setWeather(w);
    const ut = new SpeechSynthesisUtterance(`It is a ${w} day!`);
    window.speechSynthesis.speak(ut);
    if (Math.random() > 0.8) addSticker();
  };

  return (
    <div className={`p-12 rounded-[4rem] shadow-2xl border-8 transition-colors duration-1000 min-h-[550px] relative overflow-hidden ${
      weather === 'sunny' ? 'bg-sky-400 border-sky-300' :
      weather === 'rainy' ? 'bg-slate-400 border-slate-300' :
      weather === 'stormy' ? 'bg-slate-900 border-slate-800' :
      weather === 'windy' ? 'bg-blue-200 border-blue-100' :
      'bg-blue-50 border-white'
    }`}>
      {/* Background FX */}
      <AnimatePresence>
        {weather === 'rainy' && <Particles char="💧" speed={1} />}
        {weather === 'snowy' && <Particles char="❄️" speed={2} />}
        {weather === 'stormy' && (
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-white z-10"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center gap-12">
        <motion.div 
          key={weather}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-[12rem] drop-shadow-2xl"
        >
          {weather === 'sunny' ? '☀️' : 
           weather === 'rainy' ? '🌧️' : 
           weather === 'stormy' ? '⛈️' : 
           weather === 'windy' ? '💨' : '🌨️'}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
           <WeatherBtn icon={<Sun />} active={weather === 'sunny'} onClick={() => change('sunny')} color="bg-yellow-400" />
           <WeatherBtn icon={<CloudRain />} active={weather === 'rainy'} onClick={() => change('rainy')} color="bg-blue-500" />
           <WeatherBtn icon={<CloudLightning />} active={weather === 'stormy'} onClick={() => change('stormy')} color="bg-slate-700" />
           <WeatherBtn icon={<Wind />} active={weather === 'windy'} onClick={() => change('windy')} color="bg-cyan-400" />
           <WeatherBtn icon={<Snowflake />} active={weather === 'snowy'} onClick={() => change('snowy')} color="bg-indigo-300" />
        </div>
        
        <h2 className="text-4xl font-black text-white uppercase tracking-widest drop-shadow-md">
          {weather === 'sunny' ? 'Golden Sun' : 
           weather === 'rainy' ? 'Happy Rain' : 
           weather === 'stormy' ? 'Mega Storm' : 
           weather === 'windy' ? 'Breezy Wind' : 'Magical Snow'}
        </h2>
      </div>
    </div>
  );
}

function WeatherBtn({ icon, active, onClick, color }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`p-6 rounded-3xl ${active ? color : 'bg-white/20 hover:bg-white/40'} text-white shadow-xl border-4 ${active ? 'border-white' : 'border-transparent'} transition-all`}
    >
      {React.cloneElement(icon, { size: 32 })}
    </motion.button>
  );
}

function Particles({ char, speed }: { char: string, speed: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex justify-around">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100 }}
          animate={{ y: 600 }}
          transition={{ duration: 2 + Math.random() * speed, repeat: Infinity, delay: Math.random() * 2 }}
          className="text-white text-2xl"
        >
          {char}
        </motion.div>
      ))}
    </div>
  );
}
