import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, Sparkles, Zap, ShieldCheck, Moon, Sun, Star, Award, Gem, Crown } from 'lucide-react';
import NeonPulseLoader from '../components/NeonPulseLoader';
import firstCardImg from '../assets/images/dpfirstcard.jpeg';
import navbarImg from '../assets/images/navbarr.jpg';



const NeonPulse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [bgIndex, setBgIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(false);

  // Premium background images collection
  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format",
      gradient: "from-purple-900/30 via-transparent to-pink-900/30"
    },
    {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format",
      gradient: "from-blue-900/30 via-transparent to-purple-900/30"
    },
    {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format",
      gradient: "from-cyan-900/30 via-transparent to-indigo-900/30"
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format",
      gradient: "from-amber-900/30 via-transparent to-orange-900/30"
    },
    {
      url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format",
      gradient: "from-emerald-900/30 via-transparent to-teal-900/30"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const bgInterval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % backgroundImages.length);
      }, 8000);
      return () => clearInterval(bgInterval);
    }
  }, [isLoading]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const themeStyles = {
    dark: {
      bg: 'bg-black',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-400',
      textMuted: 'text-gray-500',
      accent: 'from-rose-500 via-purple-500 to-cyan-500',
      accentSolid: 'rose-500',
      borderGlow: 'border-white/10',
      cardBg: 'bg-white/5 backdrop-blur-3xl border-white/10',
      glassEffect: 'bg-white/5 backdrop-blur-xl',
      buttonGradient: 'from-indigo-500 via-purple-500 to-pink-500',
      shadowGlow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]',
      watermarkOpacity: 'opacity-[0.15]'
    },
    light: {
      bg: 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      textMuted: 'text-gray-400',
      accent: 'from-rose-600 via-purple-600 to-cyan-600',
      accentSolid: 'rose-600',
      borderGlow: 'border-gray-200',
      cardBg: 'bg-white/70 backdrop-blur-3xl border-gray-200',
      glassEffect: 'bg-white/60 backdrop-blur-xl',
      buttonGradient: 'from-indigo-600 via-purple-600 to-pink-600',
      shadowGlow: 'shadow-[0_0_30px_rgba(236,72,153,0.2)]',
      watermarkOpacity: 'opacity-[0.08]'
    }
  };

  const currentTheme = themeStyles[theme];

  const containerVars = {
    animate: { transition: { staggerChildren: 0.15 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  if (isLoading) return <NeonPulseLoader />;

  return (
    <div className={`min-h-screen md:h-screen w-full ${currentTheme.bg} overflow-y-auto md:overflow-hidden flex items-center justify-center relative p-4 md:p-6 lg:p-10 font-sans transition-colors duration-700`}>
      
      {/* BACKGROUND IMAGES LAYER - AUTO CHANGING */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: theme === 'dark' ? 0.4 : 0.15 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[bgIndex].url})` }}
          />
        </AnimatePresence>
        
        {/* Dynamic gradient overlays */}
        <div className={`absolute inset-0 bg-gradient-to-br ${backgroundImages[bgIndex].gradient}`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-black via-black/50 to-transparent' : 'from-white/80 via-white/30 to-transparent'}`} />
        
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-purple-300/15'}`}
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, (Math.random() - 0.5) * 80, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      {/* VIGNETTE EFFECT */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]" />

      {/* NOISE TEXTURE - Fixed version without quotes issue */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`
        }}
      />

      {/* THEME TOGGLE BUTTON */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-5 right-5 z-50 rounded-full p-3 ${currentTheme.glassEffect} border ${currentTheme.borderGlow} shadow-2xl transition-all duration-300`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-700" />}
      </motion.button>

      {/* WATERMARK IMAGE - Bottom Right */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="relative"
        >
          {/* Glow behind watermark */}
          <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.accent} blur-2xl rounded-full ${currentTheme.watermarkOpacity}`} />
          <img 
            src={navbarImg}
            alt="Watermark"
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-full ${currentTheme.watermarkOpacity} blur-[1px] transition-all duration-500`}
          />
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <motion.div 
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-between gap-8 md:gap-12 py-6 md:py-8"
      >
        
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          
          {/* LEFT SIDE - Logo & Brand */}
          <motion.div variants={itemVars} className="flex items-center gap-3 md:gap-4">
            
            {/* Premium Logo Frame */}
            <div className="relative group">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative p-[2px] rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500">
                <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-full p-1.5 md:p-2`}>
                  <img 
                    src={firstCardImg}
                    alt="Logo"
                    className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={`hidden md:block h-10 w-px ${currentTheme.borderGlow}`} />

            {/* Brand Text */}
            <div className="space-y-1">
              <motion.p 
                className={`${theme === 'dark' ? 'text-rose-500' : 'text-rose-600'} font-black tracking-[0.3em] md:tracking-[0.6em] uppercase text-[8px] md:text-[9px] flex items-center gap-2`}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap size={10} className="md:w-3 md:h-3" />
                Memory_Core_Unlocked
              </motion.p>
              <h1 className={`text-lg sm:text-xl md:text-3xl font-black italic tracking-tight bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                NEON_PULSE.exe
              </h1>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Status Badge */}
          <motion.div 
            variants={itemVars} 
            className={`${currentTheme.textMuted} text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-b ${theme === 'dark' ? 'border-rose-500/20' : 'border-rose-400/30'} pb-1 text-center md:text-right`}
          >
            <span className="flex items-center gap-2">
              <Award size={12} className={theme === 'dark' ? 'text-rose-500' : 'text-rose-600'} />
              Level 01 // Stability: 100%
            </span>
          </motion.div>
        </div>

        {/* MIDDLE SECTION - Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN - Text Content */}
          <div className="space-y-6">
            <motion.div variants={itemVars} className="space-y-3">
              <p className={`${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'} text-xs font-bold tracking-widest flex items-center gap-2`}>
                <Star size={14} className="text-yellow-500" />
                You unlocked something...
              </p>
              <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter ${currentTheme.textPrimary}`}>
                AND IT'S NOT JUST <br /> 
                <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} italic`}>A_CARD.</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVars} className={`border-l-2 ${theme === 'dark' ? 'border-rose-500/30' : 'border-rose-400/50'} pl-5 md:pl-6 space-y-4`}>
              <p className={`text-lg md:text-xl ${currentTheme.textSecondary} font-medium italic`}>
                <Heart className="inline w-4 h-4 md:w-5 md:h-5 text-rose-500 mr-1" />
                It's a small beginning... <br />
                <span className={`${currentTheme.textPrimary} not-italic`}>a moment where I started noticing you.</span>
              </p>
              <p className={`text-sm ${currentTheme.textMuted} leading-relaxed`}>
                <Sparkles className="inline w-3 h-3 md:w-4 md:h-4 text-yellow-400 mr-1" />
                You didn't rush. You didn't quit. <br />
                <span className={`${theme === 'dark' ? 'text-rose-300' : 'text-rose-700'}`}>You stayed... and that says a lot.</span>
              </p>
            </motion.div>

            {/* Hidden gems */}
            <motion.div variants={itemVars} className="flex gap-3 pt-4">
              <div className={`px-3 py-1.5 rounded-full ${currentTheme.glassEffect} border ${currentTheme.borderGlow} text-[11px] font-bold uppercase tracking-wider`}>
                <Gem className="inline w-3 h-3 mr-1" /> RARE
              </div>
              <div className={`px-3 py-1.5 rounded-full ${currentTheme.glassEffect} border ${currentTheme.borderGlow} text-[9px] font-bold uppercase tracking-wider`}>
                <Crown className="inline w-3 h-3 mr-1" /> LEGENDARY
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Premium Card */}
          <motion.div 
            variants={itemVars}
            className="relative group"
            onHoverStart={() => setHoveredCard(true)}
            onHoverEnd={() => setHoveredCard(false)}
          >
            {/* Animated background glow */}
            <motion.div 
              className={`absolute inset-0 ${theme === 'dark' ? 'bg-rose-600/20' : 'bg-rose-400/15'} rounded-[3rem] transition-all duration-1000`}
              animate={{ 
                scale: hoveredCard ? 1.05 : 0.95,
                opacity: hoveredCard ? 0.8 : 0.5
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Main Card */}
            <motion.div 
              className={`relative ${currentTheme.cardBg} backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] shadow-2xl overflow-hidden border ${currentTheme.borderGlow}`}
              animate={{ 
                rotateY: hoveredCard ? 5 : 0,
                rotateX: hoveredCard ? -3 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border gradient */}
              <motion.div 
                className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              
              <p className={`text-xl md:text-3xl font-serif italic ${currentTheme.textSecondary} leading-relaxed relative z-10`}>
                If I'm being honest... <br />
                I like the way you try. <br />
                <motion.span 
                  className={`${theme === 'dark' ? 'text-rose-500' : 'text-rose-600'} not-italic font-black text-4xl md:text-6xl block mt-4`}
                  animate={{ 
                    textShadow: hoveredCard 
                      ? '0 0 30px rgba(244,63,94,0.8)' 
                      : '0 0 10px rgba(244,63,94,0.3)'
                  }}
                >
                  It feels real 
                  <Heart className="inline w-8 h-8 md:w-10 md:h-10 ml-2 text-rose-500 animate-pulse" />
                </motion.span>
              </p>
              
              <div className={`mt-8 pt-8 border-t ${currentTheme.borderGlow} flex items-center gap-3 ${currentTheme.textMuted} text-[10px] font-black uppercase tracking-widest`}>
                <ShieldCheck size={14} className={theme === 'dark' ? 'text-rose-500' : 'text-rose-600'} />
                Authenticity Verified
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <motion.div variants={itemVars} className="max-w-md space-y-2">
              <p className={`${currentTheme.textMuted} text-sm italic leading-relaxed`}>
                <Moon className="inline w-3 h-3 mr-1" />
                And in a world where most things are temporary... <br />
                that matters more than you think.
              </p>
              <p className={`${theme === 'dark' ? 'text-amber-500' : 'text-amber-600'} font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-2`}>
                <Sparkles size={10} />
                But don't get comfortable just yet...
              </p>
            </motion.div>

            <motion.div variants={itemVars} className="text-left md:text-right">
              <p className={`text-lg md:text-xl ${currentTheme.textPrimary} italic font-bold`}>
                This is only the first layer.
              </p>
              <p className={`${currentTheme.textMuted} text-[10px] uppercase tracking-widest font-black`}>
                There's more waiting... <span className={`${theme === 'dark' ? 'text-rose-500' : 'text-rose-600'} underline decoration-rose-500/20`}>deeper than this.</span>
              </p>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.div variants={itemVars} className="flex flex-col md:flex-row items-center gap-6 pt-4">
            <div className="flex justify-start w-full">
              <motion.button 
                onClick={() => window.history.back()}
                className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-purple-500/30 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <ChevronLeft size={14} strokeWidth={3} />
                <span>Go Back</span>
              </motion.button>
            </div>
            
            <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
            
            <motion.p 
              className={`text-[9px] ${currentTheme.textMuted} font-bold uppercase tracking-[0.4em]`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sync_Status: 25%
            </motion.p>
          </motion.div>
        </div>

      </motion.div>

      {/* DECORATIVE CORNERS */}
      <div className={`absolute top-6 left-6 w-12 h-12 md:w-16 md:h-16 border-t border-l ${currentTheme.borderGlow} z-30`} />
      <div className={`absolute bottom-6 right-6 w-12 h-12 md:w-16 md:h-16 border-b border-r ${currentTheme.borderGlow} z-30`} />
      
      {/* SCAN LINE EFFECT */}
      <motion.div 
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent pointer-events-none z-30"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default NeonPulse;