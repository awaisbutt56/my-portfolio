import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import aboutHeroImg from '../assets/images/aboutimghero.jpeg';
import aboutHeroImgone from '../assets/images/aboutHeroImgone.jpeg';

const AboutHero = () => {
  const { toggleTheme, isDark } = useTheme();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitch, setGlitch] = useState(false);
  const [distance, setDistance] = useState(null);
  const [locationPermission, setLocationPermission] = useState('pending');
  const [imageIndex, setImageIndex] = useState(0);
  const [showSecondText, setShowSecondText] = useState(false);

  const lahoreCoords = { lat: 31.5497, lon: 74.3436 };
  const images = [aboutHeroImg, aboutHeroImgone];

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = calculateDistance(
          position.coords.latitude, position.coords.longitude,
          lahoreCoords.lat, lahoreCoords.lon
        );
        setDistance(Math.round(dist));
        setLocationPermission('granted');
      },
      () => setLocationPermission('denied'),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (locationPermission === 'granted' && distance !== null) {
      setShowSecondText(false);
      const timer = setTimeout(() => {
        setShowSecondText(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [locationPermission, distance]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
  };

  const themes = {
    dark: {
      bg: 'bg-black',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      border: 'border-white/10',
      cardBg: 'bg-white/5',
      textGradient: 'from-cyan-400 to-blue-500',
      accent: 'cyan-400',
      accentGlow: 'cyan-500',
      badgeText: 'text-cyan-400',
      descriptionText: 'text-gray-300',
      bubbleColor1: 'from-cyan-400/20 to-blue-500/20',
      bubbleColor2: 'from-purple-400/20 to-pink-500/20',
      bubbleColor3: 'from-emerald-400/20 to-teal-500/20',
    },
    light: {
      bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-600',
      border: 'border-gray-200',
      cardBg: 'bg-black/5',
      textGradient: 'from-cyan-600 to-blue-600',
      accent: 'cyan-600',
      accentGlow: 'cyan-500',
      badgeText: 'text-cyan-600',
      descriptionText: 'text-gray-700',
      bubbleColor1: 'from-cyan-400/15 to-blue-500/15',
      bubbleColor2: 'from-purple-400/15 to-pink-500/15',
      bubbleColor3: 'from-emerald-400/15 to-teal-500/15',
    }
  };

  const currentTheme = themes[isDark ? 'dark' : 'light'];

  const [bubbles] = useState(() => 
    Array.from({ length: 40 }, (_, i) => ({
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

  const [particles] = useState(() => 
    Array.from({ length: 60 }, (_, i) => ({
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
    /* ✅ Update 1: pt-24 (padding-top) add kiya taake navbar k liye space bane aur overlap na ho */
    <section className={`relative min-h-screen ${currentTheme.bg} ${currentTheme.text} flex flex-col justify-center items-center px-6 pt-16 pb-12 overflow-hidden transition-colors duration-700 z-10`}>
      
      {/* ✅ Update 2: top-28 kiya taake navbar k options k sath clash na ho */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={toggleTheme}
        className={`fixed top-28 right-6 z-40 p-3 rounded-full ${currentTheme.cardBg} backdrop-blur-xl ${currentTheme.border} border shadow-2xl transition-all duration-300 hover:scale-110`}
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

      {/* Background elements with low z-index */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full bg-gradient-to-br ${getBubbleGradient(bubble.type)} backdrop-blur-sm`}
            style={{ left: `${bubble.left}%`, top: `${bubble.top}%`, width: bubble.size, height: bubble.size }}
            animate={{ x: [0, bubble.xRange, 0], y: [0, bubble.yRange, 0], rotate: [0, bubble.rotateDirection * 360, 0], scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: bubble.duration, delay: bubble.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${isDark ? 'bg-white/40' : 'bg-gray-600/30'}`}
            style={{ left: `${particle.left}%`, top: `${particle.top}%`, width: particle.size, height: particle.size }}
            animate={{ x: [0, particle.xMove, 0], y: [0, particle.yMove, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className={`absolute inset-0 opacity-30 pointer-events-none z-0 ${
        isDark ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent' : 
        'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent'
      }`} />

      <motion.div
        className={`fixed w-96 h-96 rounded-full ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-400/15'} blur-3xl pointer-events-none z-0`}
        animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.8 }}
      />

      {/* Main Content Container */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl w-full z-10 relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="relative group">
              
              {locationPermission === 'pending' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl ${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.border}`}
                >
                  <svg className="w-5 h-5 text-cyan-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <div>
                    <p className={`text-xs font-mono ${currentTheme.textMuted}`}>LOCATION ACCESS</p>
                    <p className={`text-sm font-semibold ${currentTheme.text}`}>Requesting location...</p>
                  </div>
                </motion.div>
              )}

              {locationPermission === 'granted' && distance !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative overflow-hidden rounded-xl ${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.border} p-5 group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-cyan-500 rounded-full blur-md" />
                        <svg className="relative w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <AnimatePresence mode="wait">
                          {!showSecondText ? (
                            <motion.div
                              key="first-text"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.5 }}
                            >
                              <p className={`text-xs font-mono ${currentTheme.textMuted}`}>LOCATION ACCESS</p>
                              <p className={`text-sm font-semibold ${currentTheme.text}`}>I'm from Lahore, Pakistan</p>
                            </motion.div>
                          ) : (
                            <motion.div
  key="second-text"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.5 }}
>
  <p className={`text-xs font-mono ${currentTheme.textMuted} uppercase tracking-wider`}>
    AWAY FROM YOUR CURRENT LOCATION,
  </p>
  {/* ✅ Mobile par text-xs kiya aur desktop par wapis text-sm ho jayega */}
  <p className={`text-xs sm:text-sm font-semibold ${currentTheme.text}`}>
    ACCORDING TO YOUR IP ADDRESS
  </p>
</motion.div>
                          )}
                        </AnimatePresence>
                        
                        <motion.p 
                          key={distance}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentTheme.textGradient} bg-clip-text text-transparent mt-2`}
                        >
                          {distance.toLocaleString()} km
                        </motion.p>
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
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl ${currentTheme.cardBg} backdrop-blur-md border ${currentTheme.border}`}
                >
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-mono ${currentTheme.textMuted}`}>LOCATION REQUIRED</p>
                    <p className={`text-sm ${currentTheme.text} font-medium`}>
                      Enable location to see the distance between us
                    </p>
                  </div>
                  <button
                    onClick={getUserLocation}
                    className={`px-4 py-2 rounded-lg ${currentTheme.cardBg} border ${currentTheme.border} text-sm font-semibold hover:scale-105 transition-all duration-300 ${currentTheme.text}`}
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-4 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
              <span className={`h-2 w-2 bg-${currentTheme.accent} rounded-full animate-pulse`}></span>
              <p className={`${currentTheme.badgeText} font-mono text-xs tracking-[0.2em] uppercase`}>✦ CREATIVE ENGINEER ✦</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tighter leading-tight">
                I'm <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.textGradient} font-bold`}>Muhammad Awais Butt.</span>
              </h1>
              <p className={`mt-4 text-lg md:text-xl ${currentTheme.textSecondary} font-light tracking-wide`}>Frontend Architect — Digital Experience Creator</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className={`text-xl md:text-2xl leading-relaxed ${currentTheme.descriptionText} font-light`}>
                "I don't just write code. I craft <span className={`${currentTheme.badgeText} font-semibold relative inline-block group`}>experiences</span> that live in your memory forever."
              </p>
              <div className={`h-px w-20 bg-gradient-to-r from-${currentTheme.accent} to-transparent`}></div>
              <p className={`text-base md:text-lg ${currentTheme.textMuted} leading-relaxed`}>developer passionate about building clean, modern, and interactive web experiences with smooth design, creative thinking, and attention to every detail.</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative flex flex-col items-center justify-center">
            <div className="relative group cursor-pointer">
              <motion.div
                className="absolute inset-[-4px] opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition-opacity duration-500"
                style={{ background: `conic-gradient(from 180deg at 50% 50%, ${currentTheme.accent} 0deg, #3b82f6 120deg, #8b5cf6 240deg, ${currentTheme.accent} 360deg)` }}
                animate={{ borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 30% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"], rotate: [0, 360] }}
                transition={{ borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 12, repeat: Infinity, ease: "linear" } }}
              />
              <motion.div className={`relative w-80 h-80 md:w-96 md:h-96 overflow-hidden ${currentTheme.cardBg} backdrop-blur-md shadow-2xl transition-transform duration-500 group-hover:scale-[1.05]`} animate={{ borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 30% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageIndex}
                    src={images[imageIndex]}
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1.15 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    alt="Hero Slideshow"
                    className="w-[125%] h-[125%] max-w-none object-cover object-center absolute"
                    style={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02, left: "-12.5%", top: "-12.5%" }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className={`absolute inset-0 bg-gradient-to-t from-${isDark ? "black/70" : "gray-900/40"} via-transparent to-transparent`} />
                </div>
              </motion.div>
              <motion.div animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} className={`absolute -top-6 -right-6 w-16 h-16 rounded-xl ${currentTheme.cardBg} backdrop-blur-md border-2 ${currentTheme.border} opacity-60 group-hover:opacity-100 z-10`} />
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="mt-6 group flex items-center gap-6 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 w-full max-w-[320px] md:max-w-[380px]">
              <div className="relative flex flex-col items-center justify-center">
                <div className="w-10 h-16 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="5" r="3.5" fill="currentColor" className="text-white" />
                    <path d="M12 9c-3.5 0-5 2-5 4v3.5c0 .3.2.5.5.5h1.5v5c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-5h1.5c.3 0 .5-.2.5-.5V13c0-2-1.5-4-5-4z" fill="currentColor" className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                  </svg>
                </div>
                <div className="w-6 h-1 bg-blue-500/10 blur-md rounded-full mt-1" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">5'7"</p>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tall</span>
                </div>
                <p className="text-[10px] leading-relaxed text-slate-500 mt-1 font-medium tracking-tight group-hover:text-slate-400 transition-colors">HEIGHT IS AVERAGE, BUT MY <span className="text-blue-500/80">CODE</span> DOESN'T COME WITH BUGS… USUALLY 😅</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Border Corners decoration - Hidden on mobile to avoid overlap */}
      <div className={`hidden md:block absolute top-24 left-12 w-20 h-20 border-t-2 border-l-2 ${currentTheme.border} opacity-40`}></div>
      <div className={`hidden md:block absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 ${currentTheme.border} opacity-40`}></div>
    </section>
  );
};

export default AboutHero;