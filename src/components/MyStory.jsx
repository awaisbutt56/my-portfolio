import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const storyData = [
  {
    id: "intro",
    label: "01. Intro",
    heading: "journey begins...",
    subtext: "Mine didn't start with clarity it started with curiosity. I wasn't born a developer I became one step by step through learning practice and real experience. Every mistake shaped my journey and pushed me forward. Over time curiosity turned into passion and that passion built who I am today.",
    color: "from-cyan-500 to-blue-600",
    lightColor: "from-cyan-600 to-blue-700",
    icon: "🌌",
    bgGlow: "from-cyan-500/15 via-blue-500/5 to-transparent",
    lightBgGlow: "from-cyan-400/10 via-blue-400/5 to-transparent"
  },
  {
    id: "roots",
    label: "02. Roots",
    heading: "Quiet Beginning",
    subtext: "I come from a simple place where life is calm, but my dreams were never small. No roadmap, no clear direction — just a weird confidence that I was meant to build something bigger than my surroundings. I kept moving forward, learning along the way, and turning that belief into reality.",
    color: "from-green-500 to-emerald-700",
    lightColor: "from-green-600 to-emerald-800",
    icon: "🌱",
    bgGlow: "from-green-500/15 via-emerald-500/5 to-transparent",
    lightBgGlow: "from-green-400/10 via-emerald-400/5 to-transparent"
  },
  {
    id: "Discipline",
    label: "03. Discipline",
    heading: "The Real Learning",
    subtext: "Outside coding I stay active in sports and physical discipline. Football is my passion and I play with focus and consistency. I also learned gymnastics through dedication and discipline. These sports built my mental and physical strength. I believe in action and I never stop until I achieve my goal.",
    color: "from-purple-500 to-indigo-600",
    lightColor: "from-purple-600 to-indigo-700",
    icon: "🧭",
    bgGlow: "from-purple-500/15 via-indigo-500/5 to-transparent",
    lightBgGlow: "from-purple-400/10 via-indigo-400/5 to-transparent"
  },
  {
    id: "struggle",
    label: "04. Struggle",
    heading: "Living the Code",
    subtext: "Countless hours of practice facing bugs I could not solve and errors I did not understand. I still stayed consistent and kept pushing forward. Every failure taught me something new and over time those challenges became the foundation of my growth",
    color: "from-orange-500 to-red-600",
    lightColor: "from-orange-600 to-red-700",
    icon: "⚔️",
    bgGlow: "from-orange-500/15 via-red-500/5 to-transparent",
    lightBgGlow: "from-orange-400/10 via-red-400/5 to-transparent"
  },
  {
    id: "pro",
    label: "05. Growth",
    heading: "Stampa Solutions",
    subtext: "Today I work at Stampa Solutions in Lahore building real products with real teams where every detail counts. It's not just about code it's about real impact. I focus on growth not comfort always improving and never settling because I want to be better than yesterday.",
    color: "from-blue-600 to-cyan-400",
    lightColor: "from-blue-700 to-cyan-500",
    icon: "🚀",
    bgGlow: "from-blue-600/15 via-cyan-400/5 to-transparent",
    lightBgGlow: "from-blue-500/10 via-cyan-400/5 to-transparent"
  },
  {
    id: "philosophy",
    label: "06. Belief",
    heading: "The Experience",
    subtext: "Anyone can build a website. But not everyone can build an experience. For me, it's not just about code or design, it's about how it feels and how it connects. That's the difference I focus on, turning simple ideas into something meaningful. This is just the beginning.",
    color: "from-pink-600 to-rose-400",
    lightColor: "from-pink-700 to-rose-500",
    icon: "🧠",
    bgGlow: "from-pink-600/15 via-rose-400/5 to-transparent",
    lightBgGlow: "from-pink-500/10 via-rose-400/5 to-transparent"
  }
];

const MyStory = () => {
  // Global theme from context
  const { theme, isDark } = useTheme();
  
  const [activeTab, setActiveTab] = useState(storyData[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [autoPlay, setAutoPlay] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const autoPlayRef = useRef(null);
  const timerRef = useRef(null);
  const [hoveredNav, setHoveredNav] = useState(null);

  // Theme colors configuration for both modes
  const themeConfig = {
    dark: {
      bg: 'bg-[#0a0a0a]',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      border: 'border-white/10',
      cardBg: 'bg-black/30',
      cardHover: 'hover:bg-white/5',
      activeCardBg: 'bg-white/10',
      sidebarBg: 'bg-black/30',
      footerBg: 'bg-black/10',
      watermark: 'text-white/[0.02]',
      progressBar: 'from-cyan-400 via-blue-500 to-purple-500',
      headingGradient: 'from-white via-white to-gray-400',
      badgeText: 'text-black',
      descriptionText: 'text-gray-300',
      iconOpacity: 'opacity-60',
      particleBg: 'bg-white/15',
      scrollbarTrack: 'rgba(255, 255, 255, 0.05)',
      headerBg: 'bg-black/20',
      footerText: 'text-gray-600',
      accentText: 'text-cyan-400',
      accentTextLight: 'text-cyan-400',
      timerText: 'text-cyan-400/70',
      timerBg: 'bg-black/50',
      hoverHint: 'text-white/15'
    },
    light: {
      bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-600',
      border: 'border-gray-200/50',
      cardBg: 'bg-white/40',
      cardHover: 'hover:bg-white/60',
      activeCardBg: 'bg-white/70',
      sidebarBg: 'bg-white/30',
      footerBg: 'bg-white/20',
      watermark: 'text-gray-900/[0.03]',
      progressBar: 'from-cyan-500 via-blue-600 to-purple-600',
      headingGradient: 'from-gray-900 via-gray-800 to-gray-600',
      badgeText: 'text-white',
      descriptionText: 'text-gray-700',
      iconOpacity: 'opacity-80',
      particleBg: 'bg-gray-600/10',
      scrollbarTrack: 'rgba(0, 0, 0, 0.05)',
      headerBg: 'bg-white/20',
      footerText: 'text-gray-500',
      accentText: 'text-cyan-600',
      accentTextLight: 'text-cyan-600',
      timerText: 'text-cyan-700/70',
      timerBg: 'bg-white/80',
      hoverHint: 'text-gray-500/30'
    }
  };

  const currentTheme = themeConfig[theme];

  // Mouse tracking with throttle for better performance
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate functionality with 30-second delay
  const startAutoRotate = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    
    setTimeRemaining(30);
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) return 30;
        return prev - 1;
      });
    }, 1000);
    
    autoPlayRef.current = setInterval(() => {
      if (autoPlay) {
        const currentIndex = storyData.findIndex(item => item.id === activeTab.id);
        const nextIndex = (currentIndex + 1) % storyData.length;
        setActiveTab(storyData[nextIndex]);
        setTimeRemaining(30);
      }
    }, 30000);
  }, [autoPlay, activeTab.id]);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoRotate]);

  const handleTabChange = (item) => {
    setAutoPlay(false);
    setActiveTab(item);
    setTimeRemaining(30);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  useEffect(() => {
    if (autoPlay) setTimeRemaining(30);
  }, [activeTab, autoPlay]);

  const particles = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 40; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        xMove: (Math.random() - 0.5) * 80,
        yMove: (Math.random() - 0.5) * 80,
      });
    }
    return items;
  }, []);

  const navItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <div className={`relative h-screen w-full ${currentTheme.bg} ${currentTheme.text} overflow-hidden font-sans transition-colors duration-500`}>
      
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${currentTheme.scrollbarTrack};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #22d3ee, #60a5fa);
        }
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* Simplified Background - Better Performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${currentTheme.particleBg}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: [0, particle.xMove, 0],
              y: [0, particle.yMove, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Glow Background - Changes with theme */}
      <motion.div
        key={`${activeTab.id}-${theme}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? activeTab.color.split(' ')[1]?.replace('to', '') + '15' : activeTab.lightColor?.split(' ')[1]?.replace('to', '') + '10' || '#06b6d4'}15, transparent 70%)`
        }}
      />

      {/* Header */}
      <header className={`relative z-20 p-4 md:p-6 flex justify-between items-center backdrop-blur-sm border-b ${currentTheme.border} ${currentTheme.headerBg}`}>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] ${currentTheme.accentText}`}>
            ✦ Narrative Arc ✦
          </h2>
          <h1 className={`text-sm md:text-xl font-bold tracking-tighter mt-1 ${currentTheme.text}`}>
            Evolution — <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>BEYOND THE SCREEN</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:flex items-center gap-3">
            <div className={`text-[10px] font-mono ${autoPlay ? currentTheme.accentText : (isDark ? 'text-gray-500' : 'text-gray-400')}`}>
              {autoPlay ? `● NEXT IN ${timeRemaining}s` : '■ PAUSED'}
            </div>
            <div className={`w-20 h-1 ${isDark ? 'bg-white/10' : 'bg-gray-300/30'} rounded-full overflow-hidden`}>
              <motion.div
                className={`h-full bg-gradient-to-r ${currentTheme.progressBar} rounded-full`}
                animate={{ width: autoPlay ? '100%' : '0%' }}
                transition={{ duration: 30, ease: "linear", repeat: autoPlay ? Infinity : 0 }}
              />
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className={`relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-65px)] md:h-[calc(100vh-85px)]`}>
        
        {/* Left Sidebar */}
<nav className={`lg:col-span-4 border-r ${currentTheme.border} ${currentTheme.sidebarBg} backdrop-blur-md overflow-y-auto custom-scrollbar`}>
  <div className="p-3 md:p-5 space-y-3">
    {storyData.map((item, index) => (
      <motion.button
        key={item.id}
        custom={index}
        variants={navItemVariants}
        initial="hidden"
        animate="visible"
        onClick={() => handleTabChange(item)}
        onMouseEnter={() => setHoveredNav(item.id)}
        onMouseLeave={() => setHoveredNav(null)}
        className={`group relative flex items-center justify-between w-full p-4 md:p-5 rounded-2xl transition-all duration-300 overflow-hidden ${
          activeTab.id === item.id 
            ? `${currentTheme.activeCardBg} border ${currentTheme.border} shadow-xl scale-[1.02]` 
            : `${currentTheme.cardHover} border border-transparent hover:scale-[1.01]`
        }`}
      >
        {activeTab.id === item.id && (
          <motion.div
            layoutId="activeBg"
            className={`absolute inset-0 bg-gradient-to-r ${isDark ? item.color : item.lightColor} opacity-15`}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        
        <div className="relative z-10 flex items-center gap-4">
          <motion.span 
            className={`text-2xl md:text-3xl transition-all duration-300 ${
              activeTab.id === item.id ? 'scale-110' : `group-hover:scale-110 ${currentTheme.iconOpacity} group-hover:opacity-100`
            }`}
            animate={activeTab.id === item.id ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            {item.icon}
          </motion.span>
          
          <div className="text-left">
            {/* Label: Pehle text-[11px] tha, ab base size barha diya hai */}
            <p className={`text-xs md:text-sm font-bold font-mono tracking-widest uppercase ${
              activeTab.id === item.id ? currentTheme.accentText : (isDark ? 'text-gray-400' : 'text-gray-500')
            }`}>
              {item.label}
            </p>
            
            {/* Heading: Pehle text-[9px] tha, ab kafi wazay kar diya hai */}
            <p className={`text-[13px] md:text-base font-semibold leading-tight truncate max-w-[150px] md:max-w-[220px] mt-0.5 ${
              activeTab.id === item.id ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-500' : 'text-gray-400')
            }`}>
              {item.heading.substring(0, 35)}
            </p>
          </div>
        </div>
        
        {activeTab.id === item.id && (
          <motion.div
            layoutId="activeDot"
            className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]"
            transition={{ type: "spring", duration: 0.4 }}
          />
        )}
      </motion.button>
    ))}
  </div>
</nav>

        {/* Right Content */}
<section className="lg:col-span-8 relative flex flex-col items-center lg:justify-center p-6 md:p-8 lg:p-12 h-full overflow-y-auto custom-scrollbar">
  <AnimatePresence mode="wait">
    <motion.div
      key={`${activeTab.id}-${isDark}`} // theme ki jagah isDark check kar raha hun taake render ho
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-2xl w-full my-auto lg:my-0" // Mobile par margin auto taake content natural rahay
    >
      {/* Chapter Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-5 md:mb-6"
      >
        <span className={`inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r ${isDark ? activeTab.color : activeTab.lightColor} ${currentTheme.badgeText} shadow-md`}>
          <span>{activeTab.icon}</span>
          Chapter: {activeTab.id}
        </span>
      </motion.div>
      
      {/* Main Heading - Futuristic & Adaptive */}
      <motion.h3 
        initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
        className={`
          text-2xl md:text-4xl lg:text-6xl font-extrabold leading-[1.2] mb-4 md:mb-8 
          text-transparent bg-clip-text bg-300% animate-gradient
          ${isDark 
            ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500'
          }
        `}
      >
        {activeTab.heading}
      </motion.h3>
      
      {/* Premium Description / Subtext */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="relative pl-6 md:pl-8"
      >
        {/* Left Decorative Accent Line */}
        <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b ${isDark ? 'from-cyan-500 via-purple-500 to-transparent' : 'from-blue-600 via-indigo-400 to-transparent'} opacity-70`} />

        <motion.p 
          className={`
            text-base md:text-lg lg:text-xl 
            ${isDark ? 'text-gray-300/90' : 'text-gray-700'} 
            leading-[1.8] font-medium italic tracking-wide
            transition-colors duration-500
          `}
        >
          <span className={`text-2xl md:text-3xl font-serif ${isDark ? 'text-cyan-400' : 'text-blue-600'} opacity-50 mr-1`}>“</span>
          {activeTab.subtext}
          <span className={`text-2xl md:text-3xl font-serif ${isDark ? 'text-cyan-400' : 'text-blue-600'} opacity-50 ml-1`}>”</span>
        </motion.p>

        {/* Subtle Glassy Tagline background for mobile polish */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1 }}
          className={`h-[1px] mt-4 bg-gradient-to-r from-transparent via-${isDark ? 'white/10' : 'black/5'} to-transparent`}
        />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "auto" }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="mt-6 md:mt-8 flex gap-2"
      >
        <div className={`h-0.5 w-12 md:w-16 rounded-full bg-gradient-to-r ${isDark ? activeTab.color : activeTab.lightColor}`} />
        <div className={`h-0.5 w-2 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-400/30'}`} />
        <div className={`h-0.5 w-2 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-400/30'}`} />
      </motion.div>

      {/* Continue Reading Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02, x: 3 }}
        whileTap={{ scale: 0.98 }}
        className={`mt-6 md:mt-8 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-white/5 to-white/0 border ${currentTheme.border} backdrop-blur-sm text-xs md:text-sm font-medium transition-all duration-300 group ${isDark ? 'hover:border-cyan-400/40' : 'hover:border-cyan-500/40'}`}
        onClick={() => {
          const currentIndex = storyData.findIndex(item => item.id === activeTab.id);
          const nextIndex = (currentIndex + 1) % storyData.length;
          handleTabChange(storyData[nextIndex]);
        }}
      >
        <span className={`flex items-center gap-2 ${currentTheme.text}`}>
          Continue Reading
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, repeatDelay: 0.5 }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  </AnimatePresence>

  {/* Background Watermark */}
  <div className={`absolute bottom-0 right-0 text-[6rem] md:text-[10rem] font-black ${currentTheme.watermark} select-none pointer-events-none transition-colors duration-500`}>
    {activeTab.id}
  </div>
</section>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 p-3 md:p-4 border-t ${currentTheme.border} flex justify-between text-[7px] md:text-[9px] font-mono ${currentTheme.footerText} tracking-wider backdrop-blur-sm ${currentTheme.footerBg}`}>
        <span>✦ EST. 2024</span>
        <span className={currentTheme.accentTextLight}>AVAILABLE FOR IMPACT</span>
        <span>© AWAIS BUTT</span>
      </footer>

      {/* Auto-rotate Progress Bar */}
      {autoPlay && (
        <>
          <motion.div
            className={`fixed bottom-0 left-0 h-0.5 bg-gradient-to-r ${currentTheme.progressBar} z-30`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          />
          <div className="fixed bottom-2 right-4 z-30 md:hidden">
            <div className={`text-[8px] font-mono ${currentTheme.timerText} ${currentTheme.timerBg} px-2 py-1 rounded-full backdrop-blur-sm`}>
              Next: {timeRemaining}s
            </div>
          </div>
        </>
      )}

      {/* Hover Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none md:block hidden">
        <p className={`text-[7px] ${currentTheme.hoverHint} font-mono tracking-wider`}>
          ◀ CLICK SIDEBAR OR AUTO NEXT IN {timeRemaining}s ▼
        </p>
      </div>
    </div>
  );
};

export default MyStory;