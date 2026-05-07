import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Zap, Clock, Activity, Sparkles, Heart, Shield, Star, Moon, Sun, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagmaFlowLoader from '../components/MagmaFlowLoader';

const MagmaFlow = () => {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [orbs, setOrbs] = useState([]);
  const [penaltyOrbs, setPenaltyOrbs] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // Different beautiful backgrounds for each theme
  const darkBackgrounds = [
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format",
    "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=2069&auto=format",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format"
  ];

  const lightBackgrounds = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1441974231531-c622288db85a?q=80&w=2071&auto=format",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format"
  ];

  const backgrounds = theme === 'dark' ? darkBackgrounds : lightBackgrounds;

  // Shake effect for penalty
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  // Auto-change background
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [theme, backgrounds]);

  const getScript = () => {
    if (score < 3) return { 
        line1: "You didn't just unlock a card…", 
        line2: "You stepped into a living memory.",
        sub: "Move your soul to begin.",
        icon: "✨",
        color: theme === 'dark' ? 'text-rose-400' : 'text-rose-600'
    };
    if (score < 8) return { 
        line1: "Everything here reacts to you…", 
        line2: "Because your presence matters.",
        sub: "This is not a reward... it's recognition.",
        icon: "💫",
        color: theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
    };
    if (score < 15) return { 
        line1: "Even your movement is part of this world…", 
        line2: "Each point is a piece of connection.",
        sub: "Do you feel the pulse?",
        icon: "⚡",
        color: theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
    };
    return { 
        line1: "You stayed long enough to be noticed…", 
        line2: "And that's rare",
        sub: "Don't think you understand this yet...",
        icon: "❤️",
        color: theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
    };
  };

  const currentScript = getScript();
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || isGameOver) return;
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [loading, isGameOver]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Spawn normal orbs (Green/Pink - Time Boost)
  useEffect(() => {
    if (loading || isGameOver) return;
    const interval = setInterval(() => {
      if (orbs.length < 5) {
        setOrbs(prev => [...prev, {
          id: Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          size: Math.random() * 20 + 15,
          type: 'boost'
        }]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, orbs, isGameOver]);

  // Spawn penalty orbs (Red/Dark - Time Penalty) - Less frequent for balance
  useEffect(() => {
    if (loading || isGameOver) return;
    const penaltyInterval = setInterval(() => {
      if (penaltyOrbs.length < 3) {
        setPenaltyOrbs(prev => [...prev, {
          id: Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          size: Math.random() * 18 + 12,
          type: 'penalty'
        }]);
      }
    }, 2500);
    return () => clearInterval(penaltyInterval);
  }, [loading, penaltyOrbs, isGameOver]);

  const eatOrb = (id, type) => {
    if (type === 'boost') {
      setOrbs(prev => prev.filter(orb => orb.id !== id));
      setScore(s => s + 1);
      setTimeLeft(t => t + 2);
    } else {
      setPenaltyOrbs(prev => prev.filter(orb => orb.id !== id));
      setShake(true);
      setTimeLeft(t => {
        const newTime = t - 2;
        if (newTime <= 0) {
          setIsGameOver(true);
          return 0;
        }
        return newTime;
      });
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (loading) return <MagmaFlowLoader />;

  return (
    <div className={`relative h-screen w-full overflow-hidden cursor-none select-none font-sans transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'} ${shake ? 'animate-shake' : ''}`}>
      
      {/* Background with auto-change - Different for dark/light */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isDark ? 0.7 : 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
          />
        </AnimatePresence>
        
        {/* Adaptive gradients based on theme */}
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-black/90 via-black/70 to-black/90' : 'from-white/80 via-white/50 to-white/80'}`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-rose-900/20 via-transparent to-transparent' : 'from-rose-200/20 via-transparent to-transparent'}`} />
      </div>

      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed top-5 right-5 z-50 rounded-full p-2.5 backdrop-blur-xl border shadow-2xl transition-all
          ${isDark ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'}`}
      >
        {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-700" />}
      </motion.button>

      {/* Reactive Mouse Glow - Adaptive color */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{ 
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${isDark ? 'rgba(225,29,72,0.25)' : 'rgba(225,29,72,0.15)'} 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Premium Mouse Trail - Adaptive colors */}
      {!isGameOver && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`fixed pointer-events-none z-50 rounded-full ${isDark ? 'bg-gradient-to-r from-rose-500 to-pink-500' : 'bg-gradient-to-r from-rose-400 to-pink-400'}`}
          animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
          transition={{ type: "spring", stiffness: 200 - i * 12, damping: 20 + i }}
          style={{ 
            width: 10 - i, 
            height: 10 - i, 
            opacity: 0.6 - i * 0.07,
            filter: `blur(${i * 0.5}px)`
          }}
        />
      ))}

      {/* Energy Orbs - Boost Orbs (Greenish/Pink - Time +2) */}
      {!isGameOver && orbs.map((orb) => (
        <motion.div
          key={orb.id}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 2, opacity: 0, filter: "blur(15px)" }}
          onMouseEnter={() => eatOrb(orb.id, 'boost')}
          onTouchStart={() => eatOrb(orb.id, 'boost')}
          className="fixed z-40 cursor-pointer"
          style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1], 
              rotate: [0, 90, 0],
              y: [0, -5, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative flex items-center justify-center"
          >
            <div className={`absolute inset-0 ${isDark ? 'bg-emerald-500/40' : 'bg-emerald-400/30'} blur-xl animate-pulse rounded-full`} />
            <div className={`w-10 h-10 bg-gradient-to-br ${isDark ? 'from-emerald-500 to-teal-600' : 'from-emerald-400 to-teal-500'} rounded-xl rotate-45 flex items-center justify-center shadow-2xl border ${isDark ? 'border-white/30' : 'border-white/50'}`}>
              <Zap size={14} fill="white" className="-rotate-45 text-white" />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-emerald-400 whitespace-nowrap">
              +2s
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Penalty Orbs (Red/Dark - Time -2) */}
      {!isGameOver && penaltyOrbs.map((orb) => (
        <motion.div
          key={`penalty-${orb.id}`}
          initial={{ scale: 0, rotate: 180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 2, opacity: 0, filter: "blur(15px)" }}
          onMouseEnter={() => eatOrb(orb.id, 'penalty')}
          onTouchStart={() => eatOrb(orb.id, 'penalty')}
          className="fixed z-40 cursor-pointer"
          style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1], 
              rotate: [0, -90, 0],
              y: [0, 5, 0]
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="relative flex items-center justify-center"
          >
            <div className={`absolute inset-0 ${isDark ? 'bg-red-600/50' : 'bg-red-500/40'} blur-xl animate-pulse rounded-full`} />
            <div className={`w-10 h-10 bg-gradient-to-br ${isDark ? 'from-red-600 to-rose-700' : 'from-red-500 to-rose-600'} rounded-xl -rotate-45 flex items-center justify-center shadow-2xl border ${isDark ? 'border-red-400/50' : 'border-red-300/60'}`}>
              <AlertTriangle size={14} fill="white" className="rotate-45 text-white" />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-red-400 whitespace-nowrap">
              -2s
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className={`relative z-20 h-full flex flex-col justify-between p-6 md:p-8 transition-all duration-700 ${isGameOver ? 'opacity-0 scale-110 blur-xl' : 'opacity-100'}`}>
        
        {/* Top Bar - Premium Glass Card with theme adaption */}
        <div className={`backdrop-blur-xl rounded-2xl border p-4 ${isDark ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10 shadow-lg'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`absolute inset-0 ${isDark ? 'bg-rose-500/30' : 'bg-rose-400/20'} blur-xl rounded-full`} />
                <div className={`relative w-10 h-10 bg-gradient-to-br ${isDark ? 'from-rose-500 to-pink-600' : 'from-rose-400 to-pink-500'} rounded-full flex items-center justify-center`}>
                  <Sparkles size={18} className="text-white" />
                </div>
              </div>
              <div className={`h-8 w-px ${isDark ? 'bg-white/20' : 'bg-black/10'}`} />
              <div>
                <span className={`text-[7px] font-black tracking-[0.3em] uppercase ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>System Live</span>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={12} className={timeLeft < 5 ? "text-rose-400 animate-pulse" : isDark ? "text-gray-400" : "text-gray-500"} />
                  <span className={`text-xl font-black ${timeLeft < 5 ? 'text-rose-400' : isDark ? 'text-white' : 'text-gray-800'}`}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <p className={`text-2xl md:text-3xl font-black ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>{score}</p>
                <Star size={14} className="text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Mind-Blowing Text Animation with Theme Colors */}
        <div className="max-w-4xl mx-auto text-center relative">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentScript.line1}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl"
              >
                {currentScript.icon}
              </motion.div>
              
              <p className={`${currentScript.color} font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase`}>
                {currentScript.sub}
              </p>
              
              <h2 className={`text-2xl md:text-4xl lg:text-5xl font-black leading-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {currentScript.line1} <br />
                <span className={`mt-2 block ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{currentScript.line2}</span>
              </h2>

              <motion.div 
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className={`h-px w-32 bg-gradient-to-r from-transparent via-${currentScript.color.includes('rose') ? 'rose' : currentScript.color.includes('purple') ? 'purple' : 'pink'}-500 to-transparent mx-auto`}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-px bg-gradient-to-r from-transparent ${isDark ? 'to-white/20' : 'to-black/20'}`} />
            <p className={`text-[7px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Recognition Protocol v.75
            </p>
          </div>
          <div className={`backdrop-blur-md rounded-full px-3 py-1 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
            <p className={`text-[6px] font-mono tracking-tighter ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              🟢 +2s | 🔴 -2s
            </p>
          </div>
        </div>
      </div>

      {/* Premium Game Over Screen - Theme Adaptive */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className={`absolute inset-0 z-[100] backdrop-blur-2xl flex items-center justify-center p-6 ${isDark ? 'bg-black/95' : 'bg-white/95'}`}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="max-w-xl w-full text-center space-y-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative inline-block"
              >
                <div className={`absolute inset-0 ${isDark ? 'bg-rose-500/40' : 'bg-rose-400/30'} blur-3xl animate-pulse rounded-full`} />
                <Activity size={60} className={`relative z-10 ${isDark ? 'text-rose-500' : 'text-rose-600'}`} />
              </motion.div>

              <div className="space-y-4">
                <h3 className={`text-3xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Time Is Up
                </h3>
                <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  The connection was brief, but it was real. <br />
                  Some memories aren't meant to last forever… <br />
                  <span className={`font-bold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>they are meant to be felt in the moment.</span>
                </p>
              </div>

              <div className="space-y-5">
                <div className={`inline-block backdrop-blur-md rounded-full px-4 py-1.5 ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                  <p className={`text-[8px] font-black tracking-[0.3em] uppercase animate-pulse ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                    Unlocking Stage 03...
                  </p>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/HeroTwo')}
                  className={`px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center gap-2 mx-auto hover:shadow-rose-500/50 ${isDark ? 'shadow-rose-500/30' : 'shadow-rose-400/30'}`}
                >
                  Enter Stage 03 
                  <ChevronLeft size={14} className="rotate-180" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MagmaFlow;