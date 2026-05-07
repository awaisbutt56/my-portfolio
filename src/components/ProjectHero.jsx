import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ChevronRight, Zap, Sparkles, Code, Eye, Menu, X } from 'lucide-react';

const ProjectHero = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(10);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Toggle Function
  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('projectTheme', !isDark ? 'dark' : 'light');
  };

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('projectTheme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }
  }, []);

  const skillOptions = [
    { id: 1, name: "React.js Frontend", price: 5, icon: "⚛️", level: "Expert" },
    { id: 2, name: "Tailwind CSS UI", price: 3, icon: "🎨", level: "Master" },
    { id: 3, name: "JavaScript (ES6+)", price: 4, icon: "⚙️", level: "Advanced" },
    { id: 4, name: "API Integration", price: 5, icon: "🔌", level: "Expert" },
    { id: 5, name: "Framer Animations", price: 4, icon: "✨", level: "Master" },
    { id: 6, name: "Responsive Layout", price: 3, icon: "📱", level: "Advanced" },
    { id: 7, name: "Redux Toolkit", price: 6, icon: "🚀", level: "Expert" },
    { id: 8, name: "Database Setup", price: 5, icon: "💾", level: "Advanced" },
    { id: 9, name: "Authentication", price: 4, icon: "🔐", level: "Expert" },
    { id: 10, name: "Bootstrap", price: 7, icon: "🅱️", level: "Expert" },
  ];

  // Calculate price
  useEffect(() => {
    const basePrice = 10;
    const additional = selectedSkills.reduce((acc, curr) => {
      const skill = skillOptions.find(s => s.name === curr);
      return acc + (skill ? skill.price : 0);
    }, 0);
    setPrice(Math.min(basePrice + additional, 50));
  }, [selectedSkills]);

  const toggleSkill = (skillName) => {
    setSelectedSkills(prev => 
      prev.includes(skillName) ? prev.filter(s => s !== skillName) : [...prev, skillName]
    );
  };

  const handleWhatsApp = () => {
    const now = new Date();
    const timestamp = now.toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    const complexity = selectedSkills.length > 5 ? "High" : selectedSkills.length > 2 ? "Medium" : "Low";
    const estimatedDays = Math.ceil(selectedSkills.reduce((acc, curr) => {
      const skill = skillOptions.find(s => s.name === curr);
      return acc + (skill ? skill.price : 0);
    }, 0) / 2);
    
    const message = encodeURIComponent(
      `🚀 *NEW PROJECT REQUEST* 🚀\n\n` +
      `*━━━━━━━━━━━━━━━━━━━━*\n` +
      `📅 *Date/Time:* ${timestamp}\n` +
      `📊 *Complexity Level:* ${complexity}\n` +
      `⏱️ *Est. Timeline:* ${estimatedDays} days\n\n` +
      `*🛠️ SELECTED TECH STACK:*\n` +
      `${selectedSkills.length > 0 ? selectedSkills.map(skill => `▸ ${skill}`).join('\n') : '▸ Not specified yet'}\n\n` +
      `*💰 PRICE BREAKDOWN:*\n` +
      `▸ Base Package: $10\n` +
      `▸ Add-ons Total: $${price - 10}\n` +
      `▸ *Total Cost: $${price} USD*\n\n` +
      `*📝 PROJECT DESCRIPTION:*\n${description || "No description provided."}\n\n` +
      `*━━━━━━━━━━━━━━━━━━━━*\n` +
      `_Generated via Portfolio Project Architect_`
    );
    
    window.open(`https://wa.me/923126013409?text=${message}`, '_blank');
  };

  const skillCount = selectedSkills.length;

  return (
    <div className={`relative w-full min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden transition-all duration-700
      ${isDark ? 'bg-gradient-to-br from-[#030308] via-[#0a0a1a] to-[#000000] text-white' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-white text-gray-900'}`}>
      
      {/* 🌓 Theme Toggle Button - Responsive Position */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={toggleTheme}
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-xl transition-all duration-500
          ${isDark ? 'bg-white/10 border border-white/20 hover:bg-white/20' : 'bg-black/10 border border-black/10 hover:bg-black/20'}`}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="sun" initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 180, opacity: 0 }}>
              <Sun className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div key="moon" initial={{ rotate: 180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -180, opacity: 0 }}>
              <Moon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Animated Background Particles - Hidden on mobile for performance */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${isDark ? 'bg-cyan-500/30' : 'bg-cyan-400/20'}`}
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, scale: 0 }}
            animate={{ y: [null, -100, -200], opacity: [0, 1, 0], scale: [0, 2, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* Gradient Orbs - Responsive sizing */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-10 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-[80px] sm:blur-[120px] ${isDark ? 'bg-pink-600/20' : 'bg-pink-300/30'} animate-pulse`} />
        <div className={`absolute bottom-10 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-[80px] sm:blur-[120px] ${isDark ? 'bg-purple-600/20' : 'bg-purple-300/30'} animate-pulse delay-1000`} />
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
        
        {/* LEFT: Project Builder */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Header with Responsive Heading Sizes */}
          <div className="space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-cyan-400">Build Your Dream</span>
            </motion.div>
            
            {/* Responsive Heading: 2xl on mobile, 4xl on medium, 5xl on desktop */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight sm:leading-none">
              Project
              <br />
              <span className={`bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent ${isDark ? 'drop-shadow-lg' : ''}`}>
                Architect
              </span>
            </h1>
            
            <p className={`text-xs sm:text-sm max-w-md font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Configure your next digital masterpiece. Select the engine components and watch your vision come to life.
            </p>
          </div>

          {/* Skill Stats Bar - Responsive */}
          {skillCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-lg'}`}
            >
              <div className="flex -space-x-1 sm:-space-x-2">
                {selectedSkills.slice(0, 3).map((skill, idx) => (
                  <div key={idx} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-xs border-2 border-white dark:border-gray-900">
                    {skillOptions.find(s => s.name === skill)?.icon}
                  </div>
                ))}
                {skillCount > 3 && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-500 flex items-center justify-center text-[10px] sm:text-xs font-bold text-white border-2 border-white dark:border-gray-900">
                    +{skillCount - 3}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">Components Selected</p>
                <p className={`text-lg sm:text-2xl font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{skillCount} / 10</p>
              </div>
            </motion.div>
          )}

          {/* Skill Selector Grid - Responsive 1 or 2 columns */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
            {skillOptions.map((skill, idx) => (
              <motion.button
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => toggleSkill(skill.name)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden
                  ${selectedSkills.includes(skill.name) 
                    ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                    : isDark ? 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10' 
                    : 'border-gray-200 bg-white hover:border-cyan-300 hover:shadow-lg'}`}
              >
                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                <div className="text-left flex-1">
                  <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${selectedSkills.includes(skill.name) ? 'text-cyan-400' : ''}`}>
                    {skill.name}
                  </p>
                  <p className="text-[8px] sm:text-[10px] opacity-60">+${skill.price}</p>
                </div>
                {selectedSkills.includes(skill.name) && (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Description Input - Responsive */}
          <div className="space-y-2 sm:space-y-3">
            <label className={`text-[10px] sm:text-[14px] uppercase tracking-[0.2em] font-black ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Project Vision
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your vision in detail..."
              className={`w-full h-24 sm:h-32 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 outline-none transition-all resize-none text-xs sm:text-sm font-medium
                ${isDark 
                  ? 'bg-white/5 border-white/10 focus:border-cyan-500 text-white placeholder:text-gray-600' 
                  : 'bg-gray-50 border-gray-200 focus:border-cyan-500 text-gray-800 placeholder:text-gray-400'}`}
            />
            <p className={`text-[10px] sm:text-[12px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              💡 Tip: The more details, the better we understand your vision
            </p>
          </div>
        </motion.div>

        {/* RIGHT: Live Summary Dashboard - Responsive */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:pl-6"
        >
          <div className={`sticky top-6 sm:top-10 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 backdrop-blur-xl transition-all duration-500
            ${isDark 
              ? 'bg-white/[0.03] border-white/10 shadow-xl shadow-cyan-500/5' 
              : 'bg-white border-gray-100 shadow-xl'}`}>
            
            {/* Dashboard Header - Responsive */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6 sm:mb-8">
              <div>
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Code className={`w-3 h-3 sm:w-4 sm:h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                  <p className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    Live Estimate
                  </p>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic leading-tight">
                  Project
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Dashboard</span>
                </h3>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="text-[8px] sm:text-[10px] opacity-50 font-bold uppercase tracking-wider">Total Investment</p>
                <motion.div
                  key={price}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono"
                >
                  ${price}
                </motion.div>
                <p className="text-[8px] sm:text-[10px] opacity-50">USD • One-time</p>
              </div>
            </div>

            {/* Selected Components List - Responsive */}
            <div className="space-y-3 sm:space-y-5 min-h-[150px] sm:min-h-[200px]">
              <div className="flex justify-between items-center">
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider opacity-50">Selected Components</p>
                <p className="text-[8px] sm:text-[10px] font-black text-cyan-400">{skillCount}/10 used</p>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 min-h-[70px] sm:min-h-[100px]">
                <AnimatePresence mode="popLayout">
                  {selectedSkills.length > 0 ? (
                    selectedSkills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: idx * 0.03 }}
                        className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 text-[7px] sm:text-[9px] font-black uppercase tracking-tighter border border-cyan-500/30 flex items-center gap-1 sm:gap-2"
                      >
                        <span className="text-xs sm:text-sm">{skillOptions.find(s => s.name === skill)?.icon}</span>
                        <span className="hidden xs:inline">{skill}</span>
                        <span className="inline xs:hidden">{skill.substring(0, 8)}</span>
                        <span className="text-[6px] sm:text-[8px] opacity-50">+${skillOptions.find(s => s.name === skill)?.price}</span>
                      </motion.span>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full text-center py-6 sm:py-8"
                    >
                      <Eye className="w-6 h-6 sm:w-8 sm:h-8 opacity-20 mx-auto mb-2" />
                      <p className="text-[10px] sm:text-xs italic opacity-40">Click components above to build your stack</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Description Preview - Responsive */}
              {description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl text-[10px] sm:text-xs leading-relaxed italic border-l-4 border-l-cyan-500
                    ${isDark ? 'bg-black/30 border-white/5 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                >
                  <p className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider mb-1 sm:mb-2 text-cyan-400">Vision Summary</p>
                  {description.length > 100 ? description.substring(0, 100) + "..." : description}
                </motion.div>
              )}
            </div>

            {/* Price Breakdown - Responsive */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-dashed border-white/10 space-y-2 sm:space-y-3">
              <div className="flex justify-between text-[10px] sm:text-xs">
                <span className="opacity-50 uppercase tracking-wider">Base Package</span>
                <span className="font-mono">$10.00</span>
              </div>
              <div className="flex justify-between text-[10px] sm:text-xs">
                <span className="opacity-50 uppercase tracking-wider">Tech Stack Add-ons</span>
                <span className="font-mono text-cyan-400">+ ${price - 10}.00</span>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-2 sm:my-3" />
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider">Total</span>
                <motion.span
                  key={price}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                >
                  ${price}.00
                </motion.span>
              </div>
              <p className="text-[7px] sm:text-[9px] opacity-40 text-center">* Final price confirmation after consultation</p>

              {/* WhatsApp Button - Responsive */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="group relative w-full mt-3 sm:mt-4 py-3 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-wider text-[10px] sm:text-sm flex items-center justify-center gap-2 sm:gap-3 overflow-hidden"
                disabled={selectedSkills.length === 0 && !description}
              >
                <div className={`absolute inset-0 transition-all duration-300 ${selectedSkills.length === 0 && !description 
                  ? 'bg-gray-500' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 group-hover:scale-105'}`} />
                <span className="relative z-10 flex items-center gap-2 sm:gap-3 text-white">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                  Submit
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xs sm:text-sm"
                  >
                    🚀
                  </motion.span>
                </span>
              </motion.button>
              
              {selectedSkills.length === 0 && !description && (
                <p className="text-[7px] sm:text-[9px] text-center text-red-400/70 mt-2">
                  * Please select at least one component or add description
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-24 mb-10">
  <a
    href="/"
    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 hover:scale-110 hover:-translate-y-1 hover:border-purple-400/40"
  >
    {/* Animated Background */}
    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700"></span>

    {/* Shine Effect */}
    <span className="absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]"></span>

    {/* Pulsing Ring */}
    <span className="absolute inset-0 rounded-full border border-purple-400/20 animate-pulse"></span>

    {/* Icon */}
    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10 group-hover:bg-white/20 transition-all duration-300">
      <span className="text-lg group-hover:-translate-x-1 transition-all duration-300">
        ✦
      </span>
    </div>

    {/* Text */}
    <div className="relative flex flex-col leading-tight">
      <span className="text-[11px] uppercase tracking-[0.3em] text-purple-300">
        Return
      </span>
      <span className="text-sm md:text-base font-bold text-white tracking-wide">
        Back To Home
      </span>
    </div>

    {/* Hover Glow */}
    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_60px_rgba(168,85,247,0.5)]"></div>
  </a>
</div>

          {/* Footer Signature - Responsive */}
          <div className="text-center mt-6 sm:mt-8 space-y-1 sm:space-y-2">
            <div className="flex justify-center gap-1 sm:gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full animate-pulse ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} 
                  style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <p className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-30 font-bold">
              Powered by Creative Engineering
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectHero;