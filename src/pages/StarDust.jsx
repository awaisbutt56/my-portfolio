import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Sparkles, Star, Heart } from 'lucide-react';
import StarDustLoader from '../components/StarDustLoader';
import { useNavigate } from 'react-router-dom';

const StarDust = () => {
  const [loading, setLoading] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [bgIndex, setBgIndex] = useState(0);

  // Different stunning backgrounds for each theme
  const darkStarBackgrounds = [
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013&auto=format",
    "https://images.unsplash.com/photo-1506703719100-f0b3c0c7a1c4?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format",
    "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=2069&auto=format",
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format"
  ];

  const lightStarBackgrounds = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1441974231531-c622288db85a?q=80&w=2071&auto=format",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2074&auto=format",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format"
  ];

  const backgroundImages = theme === 'dark' ? darkStarBackgrounds : lightStarBackgrounds;

  const scriptLines = [
    { id: 1, text: "You're still here...", duration: 2800, type: "whisper", icon: "🌙" },
    { id: 2, text: "That says more than you think.", duration: 2800, type: "reveal", icon: "✨" },
    { id: 3, text: "It wasn't easy...", duration: 2500, type: "pause", icon: "💫" },
    { id: 4, text: "and it wasn't meant to be.", duration: 2600, type: "build", icon: "⭐" },
    { id: 5, text: "But you didn't stop.", duration: 2800, type: "strong", icon: "🔥" },
    { id: 6, text: "Somewhere along the way...", duration: 2700, type: "dream", icon: "🌌" },
    { id: 7, text: "this stopped being just a game.", duration: 3000, type: "revelation", icon: "" },
    { id: 8, text: "You started to mean something...", duration: 2900, type: "emotional", icon: "💖" },
    { id: 9, text: "not because you won...", duration: 2600, type: "pause", icon: "" },
    { id: 10, text: "but because you stayed.", duration: 3200, type: "heart", icon: "❤️" },
    { id: 11, text: "That kind of effort...", duration: 2500, type: "soft", icon: "🌿" },
    { id: 12, text: "It's rare.", duration: 2400, type: "impact", icon: "💎" },
    { id: 13, text: "And rare things...", duration: 2600, type: "pause", icon: "✨" },
    { id: 14, text: "don't go unnoticed.", duration: 2800, type: "warm", icon: "" },
    { id: 15, text: "So no... you're not just playing anymore.", duration: 3100, type: "truth", icon: "" },
    { id: 16, text: "You're part of this now.", duration: 2900, type: "connection", icon: "🔗" },
    { id: 17, text: "And the deeper you go...", duration: 2700, type: "mystery", icon: "🌀" },
    { id: 18, text: "the harder it becomes to walk away.", duration: 3200, type: "gravity", icon: "" },
    { id: 19, text: "So tell me...", duration: 2600, type: "invitation", icon: "💭" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && currentLineIndex < scriptLines.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, scriptLines[currentLineIndex]?.duration || 2500);
      return () => clearTimeout(timer);
    } else if (!loading && currentLineIndex === scriptLines.length) {
      const ctaTimer = setTimeout(() => setShowCTA(true), 1500);
      return () => clearTimeout(ctaTimer);
    }
  }, [loading, currentLineIndex]);

  useEffect(() => {
    if (!loading) {
      const bgInterval = setInterval(() => {
        setBgIndex(prev => (prev + 1) % backgroundImages.length);
      }, 6000);
      return () => clearInterval(bgInterval);
    }
  }, [loading, theme, backgroundImages.length]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    setBgIndex(0);
  };

  const getTextStyle = (type) => {
    if (theme === 'dark') {
      const styles = {
        whisper: "text-3xl md:text-6xl font-light italic text-indigo-200",
        reveal: "text-4xl md:text-7xl font-extralight tracking-wide text-white",
        pause: "text-2xl md:text-5xl font-light text-gray-300",
        build: "text-3xl md:text-6xl font-medium text-white",
        strong: "text-4xl md:text-7xl font-bold text-red-400",
        dream: "text-2xl md:text-5xl font-light italic text-purple-300",
        revelation: "text-3xl md:text-6xl font-semibold text-cyan-300",
        emotional: "text-3xl md:text-6xl font-medium text-pink-300",
        heart: "text-4xl md:text-7xl font-bold text-pink-400",
        soft: "text-2xl md:text-5xl font-light text-gray-300",
        impact: "text-3xl md:text-6xl font-bold text-yellow-400",
        warm: "text-3xl md:text-6xl font-semibold text-orange-400",
        truth: "text-4xl md:text-7xl font-black text-white",
        connection: "text-3xl md:text-6xl font-bold text-blue-400",
        mystery: "text-2xl md:text-5xl font-light italic text-gray-300",
        gravity: "text-3xl md:text-6xl font-semibold text-red-400",
        invitation: "text-4xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
      };
      return styles[type] || styles.whisper;
    } else {
      const styles = {
        whisper: "text-3xl md:text-6xl font-light italic text-indigo-700",
        reveal: "text-4xl md:text-7xl font-extralight tracking-wide text-gray-800",
        pause: "text-2xl md:text-5xl font-light text-gray-600",
        build: "text-3xl md:text-6xl font-medium text-gray-800",
        strong: "text-4xl md:text-7xl font-bold text-red-600",
        dream: "text-2xl md:text-5xl font-light italic text-purple-600",
        revelation: "text-3xl md:text-6xl font-semibold text-cyan-600",
        emotional: "text-3xl md:text-6xl font-medium text-pink-600",
        heart: "text-4xl md:text-7xl font-bold text-pink-600",
        soft: "text-2xl md:text-5xl font-light text-gray-600",
        impact: "text-3xl md:text-6xl font-bold text-orange-600",
        warm: "text-3xl md:text-6xl font-semibold text-amber-600",
        truth: "text-4xl md:text-7xl font-black text-gray-900",
        connection: "text-3xl md:text-6xl font-bold text-blue-600",
        mystery: "text-2xl md:text-5xl font-light italic text-gray-600",
        gravity: "text-3xl md:text-6xl font-semibold text-red-600",
        invitation: "text-4xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent"
      };
      return styles[type] || styles.whisper;
    }
  };

  if (loading) return <StarDustLoader />;

  const currentLine = scriptLines[currentLineIndex];

  return (
    <div className={`relative h-screen w-screen overflow-hidden font-sans transition-colors duration-700 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-amber-50 via-orange-50 to-white'}`}>
      
      {/* BACKGROUND LAYER - Stars theme based */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: theme === 'dark' ? 0.5 : 0.3 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
          />
        </AnimatePresence>
        
        {/* Theme-based gradients */}
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-black via-black/60 to-transparent' : 'from-white/70 via-white/40 to-transparent'}`} />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/30'}`} />
        
        {/* Stars particles - More in dark mode */}
        {[...Array(theme === 'dark' ? 60 : 30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-white/15' : 'bg-yellow-400/20'}`}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* VIGNETTE */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />

      {/* THEME TOGGLE with star icon */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-5 right-5 z-50 rounded-full p-3 backdrop-blur-xl border shadow-2xl transition-all
          ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'}`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-700" />}
      </motion.button>

      {/* ENERGY CARD with star */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`fixed top-5 left-11 z-50 rounded-full px-4 py-2 backdrop-blur-xl border flex items-center gap-2 text-xs font-bold tracking-wider
          ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : 'bg-black/5 border-black/10 text-gray-700'}`}
      >
        <Star size={12} className="text-yellow-400" /> 100 ENERGY CARD <Sparkles size={12} className="text-purple-400" />
      </motion.div>

      {/* MAIN CONTENT */}
      <main className="relative z-20 h-full w-full flex flex-col items-center justify-center px-6 md:px-12 overflow-y-auto">
        
        {/* Neural Badge - Theme based */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-24 left-0 right-0 text-center"
        >
          <span className={`${theme === 'dark' ? 'text-red-400/80' : 'text-purple-600/80'} tracking-[0.3em] text-[8px] md:text-[9px] uppercase font-black flex items-center justify-center gap-2`}>
            <Sparkles size={10} /> STARDUST_CONNECTION_ESTABLISHED <Sparkles size={10} />
          </span>
        </motion.div>

        {/* DYNAMIC TEXT DISPLAY */}
        <div className="w-full max-w-5xl mx-auto text-center min-h-[300px] md:min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentLine && !showCTA && (
              <motion.div
                key={currentLine.id}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: [0.23, 0.86, 0.34, 1.05], exit: { duration: 0.5 } }}
                className="space-y-6"
              >
                {/* Animated Icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-5xl md:text-6xl"
                >
                  {currentLine.icon}
                </motion.div>
                
                <h1 className={`${getTextStyle(currentLine.type)} leading-tight tracking-tight`}>
                  {currentLine.text}
                </h1>
                
                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: currentLine.duration / 1000, ease: "linear" }}
                  className={`h-0.5 bg-gradient-to-r from-transparent via-current to-transparent mx-auto w-32 opacity-40`}
                  style={{ color: theme === 'dark' ? '#ef4444' : '#9333ea' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Bar with stars */}
        <div className="absolute bottom-24 left-0 right-0 px-6">
          <div className="max-w-md mx-auto">
            <div className={`h-1 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}>
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentLineIndex / scriptLines.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[8px] md:text-[9px] font-mono tracking-wider">
              <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>⭐ STARDUST JOURNEY ⭐</span>
              <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{Math.round((currentLineIndex / scriptLines.length) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* FINAL CTA SECTION - Theme based */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className={`absolute inset-0 flex flex-col items-center justify-center z-30 backdrop-blur-2xl ${theme === 'dark' ? 'bg-black/90' : 'bg-white/90'}`}
            >
              <div className="text-center space-y-8 px-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl"
                >
                  💫
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-3xl md:text-6xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                >
                  Are you still playing...
                </motion.h1>
                
                <motion.h1
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className={`text-4xl md:text-7xl font-black bg-gradient-to-r ${theme === 'dark' ? 'from-purple-400 via-pink-400 to-red-400' : 'from-purple-600 via-pink-600 to-red-600'} bg-clip-text text-transparent`}
                >
                  or do you actually mean it?
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="flex flex-col items-center gap-5 pt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168,85,247,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = '/HeroTwo'}
                    className={`px-10 py-4 md:px-14 md:py-5 font-black tracking-[0.2em] text-xs md:text-sm rounded-full transition-all duration-300 shadow-2xl flex items-center gap-2
                      ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'}`}
                  >
                    <Heart size={16} /> I MEAN IT <Star size={16} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03, letterSpacing: "0.2em" }}
                    onClick={() => window.history.back()}
                    className={`text-[12px] md:text-[9px] tracking-[0.3em] uppercase transition-all duration-300 ${theme === 'dark' ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                  >
                    🛡️ Take me back to safety 🛡️
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* DECORATIVE ELEMENTS - Theme based */}
      <div className={`absolute top-6 left-6 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 ${theme === 'dark' ? 'border-purple-500/40' : 'border-purple-400/60'} rounded-tl-2xl z-30`} />
      <div className={`absolute bottom-6 right-6 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 ${theme === 'dark' ? 'border-pink-500/40' : 'border-pink-400/60'} rounded-br-2xl z-30`} />
      
      {/* Scan Line */}
      <motion.div 
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none z-30"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Bottom Status */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-30">
        <p className={`text-[5px] md:text-[6px] tracking-[0.2em] font-mono flex items-center justify-center gap-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
          <Star size={8} className="text-yellow-400" /> STARDUST_PROTOCOL_ACTIVE • ENERGY_LEVEL: 100% • DIMENSIONAL_STABILITY: SECURE <Star size={8} className="text-yellow-400" />
        </p>
      </div>
    </div>
  );
};

export default StarDust;