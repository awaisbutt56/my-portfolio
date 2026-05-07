import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext'; // Import global theme hook
import aboutHeroImg from '../assets/images/aboutimghero.jpeg';

const AboutHero = () => {
  // Global theme se le rahe hain - NO local theme state
  const { theme, toggleTheme, isDark } = useTheme();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitch, setGlitch] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationPermission, setLocationPermission] = useState('pending');
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  // Lahore fixed coordinates
  const lahoreCoords = {
    lat: 31.5497,
    lon: 74.3436
  };

  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        setUserLocation(userCoords);
        
        const dist = calculateDistance(
          userCoords.lat, userCoords.lon,
          lahoreCoords.lat, lahoreCoords.lon
        );
        setDistance(Math.round(dist));
        setLocationPermission('granted');
        setShowLocationPrompt(false);
      },
      (error) => {
        console.error('Location error:', error);
        setLocationPermission('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  // Auto-request location on load with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (locationPermission === 'pending') {
        getUserLocation();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  // Theme-based styles with dynamic text colors
  const themes = {
    dark: {
      bg: 'bg-black',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      border: 'border-white/10',
      cardBg: 'bg-white/5',
      gradient: 'from-white via-cyan-400 to-blue-500',
      textGradient: 'from-cyan-400 to-blue-500',
      accent: 'cyan-400',
      accentGlow: 'cyan-500',
      starColor: 'white',
      bubbleColor1: 'from-cyan-400/20 to-blue-500/20',
      bubbleColor2: 'from-purple-400/20 to-pink-500/20',
      bubbleColor3: 'from-emerald-400/20 to-teal-500/20',
      badgeText: 'text-cyan-400',
      descriptionText: 'text-gray-300',
      ctaText: 'text-white',
    },
    light: {
      bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-600',
      border: 'border-gray-200',
      cardBg: 'bg-black/5',
      gradient: 'from-gray-900 via-cyan-600 to-blue-600',
      textGradient: 'from-cyan-600 to-blue-600',
      accent: 'cyan-600',
      accentGlow: 'cyan-500',
      starColor: 'gray-700',
      bubbleColor1: 'from-cyan-400/15 to-blue-500/15',
      bubbleColor2: 'from-purple-400/15 to-pink-500/15',
      bubbleColor3: 'from-emerald-400/15 to-teal-500/15',
      badgeText: 'text-cyan-600',
      descriptionText: 'text-gray-700',
      ctaText: 'text-white',
    }
  };

  const currentTheme = themes[isDark ? 'dark' : 'light'];

  // Generate beautiful floating bubbles
  const [bubbles] = useState(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 60 + 20,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      xRange: (Math.random() - 0.5) * 200,
      yRange: (Math.random() - 0.5) * 150,
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
      type: Math.floor(Math.random() * 3),
    }))
  );

  // Small floating particles
  const [particles] = useState(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 8,
      xMove: (Math.random() - 0.5) * 100,
      yMove: (Math.random() - 0.5) * 100,
    }))
  );

  const getBubbleGradient = (type) => {
    if (type === 0) return currentTheme.bubbleColor1;
    if (type === 1) return currentTheme.bubbleColor2;
    return currentTheme.bubbleColor3;
  };

  return (
    <section className={`relative min-h-screen ${currentTheme.bg} ${currentTheme.text} flex flex-col justify-center items-center px-6 overflow-hidden transition-colors duration-700`}>
      
      {/* ========== THEME TOGGLE BUTTON (GLOBAL) ========== */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${currentTheme.cardBg} backdrop-blur-xl ${currentTheme.border} border shadow-2xl transition-all duration-300 hover:scale-110`}
      >
        {isDark ? (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.button>

      {/* ========== FLOATING BUBBLES BACKGROUND ========== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Bubbles */}
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full bg-gradient-to-br ${getBubbleGradient(bubble.type)} backdrop-blur-sm`}
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: bubble.size,
              height: bubble.size,
            }}
            animate={{
              x: [0, bubble.xRange, 0],
              y: [0, bubble.yRange, 0],
              rotate: [0, bubble.rotateDirection * 360, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Small Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${isDark ? 'bg-white/40' : 'bg-gray-600/30'}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: [0, particle.xMove, 0],
              y: [0, particle.yMove, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating Glow Orbs */}
        {bubbles.slice(0, 20).map((bubble) => (
          <motion.div
            key={`glow-${bubble.id}`}
            className={`absolute rounded-full ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/10'} blur-xl`}
            style={{
              left: `${bubble.left + 5}%`,
              top: `${bubble.top + 5}%`,
              width: bubble.size + 10,
              height: bubble.size + 10,
            }}
            animate={{
              x: [0, bubble.xRange * 0.8, 0],
              y: [0, bubble.yRange * 0.8, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: bubble.duration + 2,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated Gradient Orbs */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`orb-${i}`}
            className={`absolute rounded-full bg-gradient-to-r ${i === 0 ? 'from-cyan-500/10 to-blue-500/10' : i === 1 ? 'from-purple-500/10 to-pink-500/10' : 'from-emerald-500/10 to-teal-500/10'} blur-2xl`}
            style={{
              width: 300,
              height: 300,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100, 0],
              y: [0, (Math.random() - 0.5) * 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ========== SUBTLE BACKGROUND GRADIENT ========== */}
      <div className={`absolute inset-0 opacity-30 pointer-events-none ${
        isDark ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent' : 
        'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent'
      }`} />

      {/* ========== MOUSE FOLLOWING GLOW ========== */}
      <motion.div
        className={`fixed w-96 h-96 rounded-full ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/15'} blur-3xl pointer-events-none z-0`}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.8 }}
      />

      {/* ========== MAIN CONTENT ========== */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full z-10 relative"
      >
        {/* Glitch Effect Overlay */}
        <AnimatePresence>
          {glitch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 pointer-events-none"
              style={{ mixBlendMode: 'overlay' }}
            />
          )}
        </AnimatePresence>

        {/* 2-Column Professional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Text Content with Dynamic Colors */}
          <div className="space-y-8">
            {/* Location Distance Card */}
            <motion.div 
              variants={itemVariants}
              className="relative group"
            >
              {locationPermission === 'pending' && showLocationPrompt && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl ${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.border} cursor-pointer hover:scale-105 transition-all duration-300`}
                  onClick={getUserLocation}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md animate-pulse"></div>
                    <svg className="relative w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-xs font-mono ${currentTheme.textMuted}`}>LOCATION ACCESS</p>
                    <p className={`text-sm font-semibold ${currentTheme.text}`}>I'm from Lahore, Pakistan,</p>
                  </div>
                </motion.div>
              )}

              {locationPermission === 'granted' && distance && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative overflow-hidden rounded-xl ${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.border} p-5 group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-cyan-500 rounded-full blur-md"
                        />
                        <svg className="relative w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className={`text-xs font-mono ${currentTheme.textMuted} uppercase tracking-wider`}>away from your current location, according to your IP address.</p>
                        <motion.p 
                          key={distance}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent`}
                        >
                          {distance.toLocaleString()} km
                        </motion.p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30"></div>
                        <motion.div
                          animate={{ 
                            x: [0, Math.sin(Date.now() / 1000) * 5, 0],
                            y: [0, Math.cos(Date.now() / 1000) * 5, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              )}

              {locationPermission === 'denied' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl ${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.border}`}
                >
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className={`text-sm ${currentTheme.textMuted}`}>Location access needed for distance feature</p>
                </motion.div>
              )}
            </motion.div>

            {/* Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-4 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
              <span className={`h-2 w-2 bg-${currentTheme.accent} rounded-full animate-pulse transition-colors duration-700`}></span>
              <p className={`${currentTheme.badgeText} font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-700`}>
                ✦ CREATIVE ENGINEER ✦
              </p>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tighter leading-tight">
                I'm <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient} font-bold transition-all duration-700`}>
                  Muhammad Awais Butt.
                </span>
              </h1>
              <p className={`mt-4 text-lg md:text-xl ${currentTheme.textSecondary} font-light tracking-wide transition-colors duration-700`}>
                Frontend Architect — Digital Experience Creator
              </p>
            </motion.div>

            {/* Professional Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className={`text-xl md:text-2xl leading-relaxed ${currentTheme.descriptionText} transition-colors duration-700 font-light`}>
                "I don't just write code. I craft{" "}
                <span className={`${currentTheme.badgeText} font-semibold relative inline-block group transition-colors duration-700`}>
                  experiences
                  <motion.span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-${currentTheme.accentGlow} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
                  />
                </span>{" "}
                that live in your memory forever."
              </p>
              
              <div className={`h-px w-20 bg-gradient-to-r from-${currentTheme.accent} to-transparent transition-all duration-700`}></div>
              
              <p className={`text-base md:text-lg ${currentTheme.textMuted} leading-relaxed transition-colors duration-700`}>
                Born from curiosity, shaped by obsession. Every pixel tells a story — 
                this is my canvas, and code is my brush.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Professional Image Card Container */}
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Main Image Card */}
            <div className="relative group">
              <div className={`absolute inset-[-3px] bg-gradient-to-r from-${currentTheme.accent} via-blue-500 to-purple-500 rounded-2xl animate-border-spin opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md`} />
              
              <div className={`relative ${currentTheme.cardBg} backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02]`}>
                <div className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden">
                  <img
                    src={aboutHeroImg}
                    alt="About Hero"
                    className="w-full h-full object-cover object-bottom transition-all duration-700 group-hover:scale-110 block"
                    style={{
                      transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${isDark ? 'black/60' : 'gray-900/40'} via-transparent to-transparent pointer-events-none`} />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute -top-6 -right-6 w-16 h-16 rounded-xl ${currentTheme.cardBg} backdrop-blur-md border-2 ${currentTheme.border} opacity-60 group-hover:opacity-100 transition-all duration-300`}
              />
            </div>

            {/* Height Box */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-6 group flex items-center gap-6 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 w-full max-w-[320px] md:max-w-[380px]"
            >
              <div className="relative flex flex-col items-center justify-center">
                <div className="w-10 h-16 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="5" r="3.5" fill="currentColor" className="text-white" />
                    <path 
                      d="M12 9c-3.5 0-5 2-5 4v3.5c0 .3.2.5.5.5h1.5v5c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-5h1.5c.3 0 .5-.2.5-.5V13c0-2-1.5-4-5-4z" 
                      fill="currentColor" 
                      className="text-slate-400 group-hover:text-white transition-colors duration-300"
                    />
                  </svg>
                </div>
                <div className="w-6 h-1 bg-blue-500/10 blur-md rounded-full mt-1" />
              </div>

              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
                    5'7"
                  </p>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tall</span>
                </div>
                
                <p className="text-[10px] leading-relaxed text-slate-500 mt-1 font-medium tracking-tight group-hover:text-slate-400 transition-colors">
                  HEIGHT IS AVERAGE, BUT MY <span className="text-blue-500/80">CODE</span> DOESN'T COME WITH BUGS… USUALLY 😅
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Professional Decorative Lines */}
      <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 ${currentTheme.border} opacity-40 transition-all duration-700`}></div>
      <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 ${currentTheme.border} opacity-40 transition-all duration-700`}></div>
      
      <style jsx="true">{`
        @keyframes border-spin {
          0% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(10deg);
          }
          100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
        }
        .animate-border-spin {
          background-size: 200% 200%;
          animation: border-spin 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutHero;