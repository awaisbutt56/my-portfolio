import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const FinalCTA = () => {
  const { theme, isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const faqs = [
    {
      q: "What type of projects do you work on?",
      a: "I build modern frontend React.js applications including dashboards, landing pages, and interactive web apps with high performance."
    },
    {
      q: "Are you available for work?",
      a: "Yes! I'm currently open to freelance opportunities and full-time collaboration where I can contribute to meaningful products."
    },
    {
      q: "What is your focus as a developer?",
      a: "My priority is 'Clean Code & User Delight'. I focus on performance, accessibility, and pixel-perfect UI execution."
    },
    {
      q: "What technologies do you use?",
      a: "I specialize in React.js, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, and Framer Motion for animations."
    }
  ];

  // Stars background
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }
    setStars(newStars);
  }, []);

  // Mouse tracking for desktop glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const themeConfig = {
    dark: {
      bg: 'bg-gradient-to-br from-[#030308] via-[#0a0a1a] to-[#030308]',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      textMuted: 'text-gray-400',
      border: 'border-white/10',
      cardBg: 'bg-white/5',
      cardHover: 'hover:border-white/20',
      accent: 'from-cyan-400 via-blue-500 to-purple-600',
      accentText: 'text-cyan-400',
      descriptionText: 'text-gray-300',
      starColor: 'text-white',
      faqBg: 'bg-white/5',
      faqActiveBg: 'bg-cyan-400/5',
      faqBorder: 'border-white/10',
      faqActiveBorder: 'border-cyan-400/50',
      cardBorder: 'border-cyan-500/30',
      cardBorder2: 'border-purple-500/30',
      glow1: 'bg-cyan-500',
      glow2: 'bg-purple-500',
    },
    light: {
      bg: 'bg-gradient-to-br from-gray-100 via-white to-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-600',
      border: 'border-gray-200',
      cardBg: 'bg-white',
      cardHover: 'hover:shadow-xl',
      accent: 'from-cyan-500 via-blue-600 to-purple-600',
      accentText: 'text-cyan-600',
      descriptionText: 'text-gray-600',
      starColor: 'text-gray-800',
      faqBg: 'bg-white',
      faqActiveBg: 'bg-cyan-50',
      faqBorder: 'border-gray-200',
      faqActiveBorder: 'border-cyan-400/50',
      cardBorder: 'border-cyan-500/30',
      cardBorder2: 'border-purple-500/30',
      glow1: 'bg-cyan-400',
      glow2: 'bg-purple-400',
    }
  };

  const currentTheme = themeConfig[theme];

  return (
    <div className={`relative w-full min-h-screen ${currentTheme.bg} ${currentTheme.text} overflow-hidden transition-colors duration-700 flex items-center justify-center px-4 md:px-8 py-16 md:py-24`}>
      
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className={`absolute rounded-full ${currentTheme.starColor}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mouse Following Glow */}
      <motion.div
        className={`fixed w-[500px] h-[500px] rounded-full ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/5'} blur-3xl pointer-events-none z-0`}
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
      />

      {/* Cinematic Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[120px] opacity-20 ${currentTheme.glow1}`}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] opacity-20 ${currentTheme.glow2}`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className={`text-[10px] font-mono tracking-wider uppercase ${currentTheme.accentText}`}>
                Ready to Create
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter">
                Let's Build Something <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.accent}`}>
                  Powerful Together
                </span>
              </h2>
              <p className={`mt-6 text-base md:text-lg ${currentTheme.descriptionText} leading-relaxed max-w-lg`}>
                I turn complex ideas into smooth, high-performance digital realities. Every pixel is crafted with discipline and passion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Why Me?", text: "Focus on performance & clean UI architecture.", icon: "⚡", border: currentTheme.cardBorder },
                { title: "Mindset", text: "Consistency over motivation. Quality over speed.", icon: "🧠", border: currentTheme.cardBorder2 }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${card.border} ${currentTheme.cardBg} ${currentTheme.cardHover}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{card.icon}</span>
                    <h3 className={`font-bold text-sm uppercase tracking-wider ${currentTheme.accentText}`}>{card.title}</h3>
                  </div>
                  <p className={`text-xs opacity-70 ${currentTheme.textMuted}`}>{card.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE - FAQ */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                <span className={`text-lg font-black ${currentTheme.accentText}`}>?</span>
              </div>
              <h3 className={`text-xl md:text-2xl font-bold ${currentTheme.text}`}>
                Frequently Asked Questions
              </h3>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden
                    ${activeIndex === index 
                      ? `${currentTheme.faqActiveBorder} ${currentTheme.faqActiveBg} shadow-[0_0_20px_rgba(34,211,238,0.1)]` 
                      : `${currentTheme.faqBorder} ${currentTheme.faqBg} ${currentTheme.cardHover}`}`}
                >
                  <button 
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full p-4 md:p-5 text-left flex justify-between items-center group"
                  >
                    <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${activeIndex === index ? currentTheme.accentText : currentTheme.text}`}>
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`text-sm font-bold ${currentTheme.accentText}`}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={`px-4 md:px-5 pb-4 md:pb-5 text-xs md:text-sm leading-relaxed ${currentTheme.textMuted}`}>
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 pt-4"
            >
              <div className="flex -space-x-2">
                {['💬', '📧', '🎯'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-sm border border-white/20"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <p className={`text-[10px] ${currentTheme.textMuted} opacity-60`}>
                Quick response within 24 hours
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ========== MEGA ACTION BUTTON - FIXED ROUTE ========== */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col items-center justify-center mt-16 md:mt-20"
        >
          {/* Glow behind button */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-80 h-20 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 blur-2xl opacity-30"
          />
          
          <motion.button 
            onClick={() => navigate('/project')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 md:px-16 py-4 md:py-5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-base md:text-xl tracking-tighter uppercase shadow-2xl shadow-cyan-500/20 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 md:gap-4">
              Start Your Project Now 
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-xl md:text-2xl"
              >
                →
              </motion.span>
            </span>
            {/* Liquid Shine Effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </motion.button>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className={`w-1 h-1 rounded-full ${currentTheme.accentText} opacity-40`}
              />
            ))}
          </div>
          
          <p className={`text-[8px] md:text-[10px] uppercase tracking-[0.3em] ${currentTheme.textMuted} opacity-40 font-bold`}>
            Design • Code • Deploy • Repeat
          </p>
          
          <p className={`text-[7px] md:text-[8px] uppercase tracking-[0.2em] ${currentTheme.textMuted} opacity-25 mt-2`}>
            Available for Freelance & Full-Time Opportunities
          </p>
        </motion.div>

        {/* DECORATIVE CORNERS */}
        <div className={`absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 ${currentTheme.border} opacity-20 pointer-events-none hidden lg:block`} />
        <div className={`absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 ${currentTheme.border} opacity-20 pointer-events-none hidden lg:block`} />
      </div>
    </div>
  );
};

export default FinalCTA;