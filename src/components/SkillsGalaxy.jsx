import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SkillsGalaxy = () => {
  const { theme, isDark } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Left side skills
  const leftSkills = [
    { name: "React.js", icon: "⚛️", color: "#22d3ee", lightColor: "#0891b2", level: 92, desc: "Building dynamic UIs with hooks & context" },
    { name: "JavaScript", icon: "🟨", color: "#fbbf24", lightColor: "#d97706", level: 90, desc: "Modern JS, Async, DOM mastery" },
    { name: "Redux Toolkit", icon: "🔴", color: "#a855f7", lightColor: "#7c3aed", level: 88, desc: "State management like a pro" },
    { name: "API Integration", icon: "🔗", color: "#10b981", lightColor: "#059669", level: 85, desc: "RESTful APIs, GraphQL" },
    { name: "Component Arch", icon: "🏗️", color: "#ec4899", lightColor: "#db2777", level: 90, desc: "Modular, reusable components" },
    { name: "State Management", icon: "📦", color: "#f43f5e", lightColor: "#e11d48", level: 88, desc: "Zustand, Context, Redux" }
  ];

  // Right side skills
  const rightSkills = [
    { name: "HTML5", icon: "🌐", color: "#f97316", lightColor: "#ea580c", level: 95, desc: "Semantic markup, SEO friendly" },
    { name: "CSS3", icon: "🎨", color: "#3b82f6", lightColor: "#2563eb", level: 92, desc: "Flexbox, Grid, Animations" },
    { name: "Tailwind CSS", icon: "💨", color: "#38bdf8", lightColor: "#0284c7", level: 93, desc: "Utility-first CSS framework" },
    { name: "Bootstrap", icon: "🅱️", color: "#a855f7", lightColor: "#7c3aed", level: 85, desc: "Responsive grid system" },
    { name: "Responsive", icon: "📱", color: "#10b981", lightColor: "#059669", level: 92, desc: "Mobile-first approach" },
    { name: "UI Development", icon: "✨", color: "#f43f5e", lightColor: "#e11d48", level: 90, desc: "Pixel-perfect interfaces" }
  ];

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Stars background
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 120; i++) {
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

    const newShootingStars = [];
    for (let i = 0; i < 5; i++) {
      newShootingStars.push({
        id: i,
        delay: Math.random() * 15,
        duration: Math.random() * 3 + 2,
        startX: Math.random() * 60 + 20,
        startY: Math.random() * 40,
      });
    }
    setShootingStars(newShootingStars);
  }, []);

  // Mouse tracking for desktop
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const themeConfig = {
    dark: {
      bg: 'bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]',
      text: 'text-white',
      textMuted: 'text-gray-400',
      accent: 'from-cyan-400 to-blue-500',
      accentText: 'text-cyan-400',
      starColor: 'text-white',
      modalBg: 'bg-black/95',
      cardBg: 'bg-white/5',
      cardBorder: 'border-white/10',
      divider: 'from-cyan-500 via-purple-500 to-blue-600',
      iconBg: 'bg-white/5',
    },
    light: {
      bg: 'bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100',
      text: 'text-gray-900',
      textMuted: 'text-gray-600',
      accent: 'from-cyan-500 to-blue-600',
      accentText: 'text-cyan-600',
      starColor: 'text-gray-800',
      modalBg: 'bg-white/98',
      cardBg: 'bg-white/70',
      cardBorder: 'border-gray-200',
      divider: 'from-cyan-500 via-purple-500 to-blue-500',
      iconBg: 'bg-white/60',
    }
  };

  const currentTheme = themeConfig[theme];

  const handleIconClick = (skill, side) => {
    setSelectedSkill({ ...skill, side });
  };

  const closeModal = () => {
    setSelectedSkill(null);
  };

  return (
    <div className={`relative w-full min-h-screen ${currentTheme.bg} ${currentTheme.text} overflow-hidden transition-colors duration-700`}>
      
      {/* ========== STARS BACKGROUND ========== */}
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
              opacity: [0.1, 0.7, 0.1],
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

        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <motion.div
            key={`shooting-${star.id}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ 
              x: `${star.startX}%`, 
              y: `${star.startY}%`, 
              width: 0, 
              opacity: 0 
            }}
            animate={{ 
              x: `${star.startX + 50}%`, 
              y: `${star.startY + 25}%`, 
              width: [0, 80, 0],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 10,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ========== MOUSE FOLLOWING GLOW (Desktop only) ========== */}
      {!isMobile && (
        <motion.div
          className={`fixed w-[400px] h-[400px] rounded-full ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/5'} blur-3xl pointer-events-none z-0`}
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
        />
      )}

      {/* ========== HEADING ========== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-6 pb-4 md:pt-12 md:pb-10 relative z-10 px-4"
      >
        <h2 className="text-2xl md:text-5xl lg:text-6xl font-black tracking-tight">
          Skills <span className={`bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>Galaxy</span>
        </h2>
        <div className="flex justify-center gap-2 mt-2 md:mt-3">
          <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
          <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.accentText}`} />
          <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
        </div>
        <p className={`text-[10px] md:text-sm ${currentTheme.textMuted} mt-2 max-w-xl mx-auto opacity-60`}>
          ✦ {isMobile ? "Tap any icon to explore" : "Hover over cards to explore"} ✦
          <p className="text-sm md:text-base opacity-70 mt-4 max-w-2xl mx-auto">
          A visual breakdown of the technologies I use to build modern, scalable, and interactive web experiences.
        </p>
        </p>
      </motion.div>

      {/* ========== MAIN CONTENT - Mobile Optimized ========== */}
      <div className="relative z-10 h-[calc(100vh-140px)] md:h-auto flex items-center justify-center">
        
        {isMobile ? (
          // ========== MOBILE LAYOUT: Center Line + Small Icons ==========
          <div className="flex items-center justify-between w-full max-w-md mx-auto px-4 gap-2">
            
            {/* Left Side Icons */}
            <div className="flex-1 space-y-3">
              {leftSkills.map((skill, idx) => (
                <motion.div
                  key={`left-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  onClick={() => handleIconClick(skill, 'left')}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center justify-center p-3 rounded-xl backdrop-blur-sm border cursor-pointer transition-all duration-200 ${currentTheme.iconBg} ${currentTheme.cardBorder} active:scale-95`}
                >
                  <span className="text-2xl">{skill.icon}</span>
                </motion.div>
              ))}
            </div>

            {/* Center Animated Line */}
            <div className="relative h-[320px] flex justify-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`w-[2px] bg-gradient-to-b ${currentTheme.divider} rounded-full`}
              />
              {/* Top Glow Node */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [0.5, 1, 0.5],
                  top: ["0%", "10%", "0%"]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"
              />
              {/* Center Glow Node */}
              <motion.div
                animate={{ 
                  scale: [1, 1.8, 1], 
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_12px_purple]"
              />
              {/* Bottom Glow Node */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [0.5, 1, 0.5],
                  top: ["100%", "90%", "100%"]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_blue]"
              />
              {/* Pulsing ring on center */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-1/2 -translate-y-1/2 -left-3 w-7 h-7 rounded-full border border-cyan-400/30"
              />
            </div>

            {/* Right Side Icons */}
            <div className="flex-1 space-y-3">
              {rightSkills.map((skill, idx) => (
                <motion.div
                  key={`right-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  onClick={() => handleIconClick(skill, 'right')}
                  whileTap={{ scale: 0.9 }}
                  className={`flex items-center justify-center p-3 rounded-xl backdrop-blur-sm border cursor-pointer transition-all duration-200 ${currentTheme.iconBg} ${currentTheme.cardBorder} active:scale-95`}
                >
                  <span className="text-2xl">{skill.icon}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // ========== DESKTOP LAYOUT: Full Cards ==========
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid grid-cols-3 gap-10 items-start">
              
              {/* Left Side Full Cards */}
              <div className="space-y-4">
                {leftSkills.map((skill, idx) => (
                  <motion.div
                    key={`left-${idx}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${currentTheme.cardBg} ${currentTheme.cardBorder} hover:border-cyan-400/50 hover:bg-cyan-500/10`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold ${currentTheme.text}`}>{skill.name}</h3>
                          <span className={`text-xs font-mono ${currentTheme.accentText}`}>{skill.level}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                        </div>
                        <p className={`text-[10px] mt-2 ${currentTheme.textMuted} opacity-70`}>{skill.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Center Divider Desktop */}
              <div className="relative flex justify-center h-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`w-[2px] bg-gradient-to-b ${currentTheme.divider} rounded-full`}
                />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]"
                />
              </div>

              {/* Right Side Full Cards */}
              <div className="space-y-4">
                {rightSkills.map((skill, idx) => (
                  <motion.div
                    key={`right-${idx}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ x: -8, scale: 1.02 }}
                    className={`p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 cursor-pointer ${currentTheme.cardBg} ${currentTheme.cardBorder} hover:border-blue-400/50 hover:bg-blue-500/10`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold ${currentTheme.text}`}>{skill.name}</h3>
                          <span className={`text-xs font-mono ${currentTheme.accentText}`}>{skill.level}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                        </div>
                        <p className={`text-[10px] mt-2 ${currentTheme.textMuted} opacity-70`}>{skill.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========== MOBILE SKILL DETAIL MODAL ========== */}
      <AnimatePresence>
        {isMobile && selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-md rounded-t-3xl p-6 backdrop-blur-xl border-t ${currentTheme.modalBg} ${currentTheme.cardBorder}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-500/30 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${selectedSkill.color}20` }}
                >
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${currentTheme.text}`}>{selectedSkill.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedSkill.color }}
                      />
                    </div>
                    <span className={`text-xs font-mono ${currentTheme.accentText}`}>{selectedSkill.level}%</span>
                  </div>
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${currentTheme.textMuted}`}>
                {selectedSkill.desc}
              </p>

              <button
                onClick={closeModal}
                className={`mt-6 w-full py-3 rounded-xl border ${currentTheme.cardBorder} ${currentTheme.text} font-medium ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-all`}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== FOOTER ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center py-4 md:py-6 relative z-10"
      >
        <div className="flex justify-center gap-1 mb-2">
          {[...leftSkills, ...rightSkills].slice(0, 8).map((skill, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.03 }}
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: isDark ? skill.color : skill.lightColor || skill.color }}
            />
          ))}
        </div>
        <p className={`text-[7px] md:text-[9px] font-mono tracking-wider uppercase ${currentTheme.textMuted} opacity-40`}>
          ⚡ Every skill is part of my journey ⚡
        </p>
      </motion.div>

      {/* Decorative corners */}
      <div className={`absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 ${currentTheme.cardBorder} opacity-20 pointer-events-none hidden md:block`} />
      <div className={`absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 ${currentTheme.cardBorder} opacity-20 pointer-events-none hidden md:block`} />
    </div>
  );
};

export default SkillsGalaxy;