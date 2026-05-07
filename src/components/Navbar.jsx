import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full px-4 md:px-12 py-4 md:py-6 bg-transparent">
      
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* ========== DESKTOP MENU (md and above) ========== */}
        <div className="hidden md:flex items-center justify-between w-full">
          
          {/* LEFT: AWAIMA for Desktop */}
          <Link to="/" className="relative group">
            <motion.h1 
              className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-rose-400 to-purple-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AWAIMA
            </motion.h1>
            {/* Desktop Dots from Logo */}
            {Array.from({ length: 15 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-rose-400 to-purple-400"
                style={{
                  width: 1 + Math.random() * 2,
                  height: 1 + Math.random() * 2,
                  left: 0,
                  top: '50%',
                  marginTop: -8 + Math.random() * 16,
                }}
                initial={{ x: -30, opacity: 0 }}
                animate={{ 
                  x: [0, 100, 180],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 2,
                  delay: i * 0.12,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </Link>

          {/* RIGHT: Email + About + Heart */}
          <div className="flex items-center gap-6">
            {/* EMAIL - Pure Text with Dots */}
            <motion.a
              href="mailto:devbyawais@gmail.com"
              className="relative group overflow-visible"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs font-mono text-white/60 group-hover:text-rose-400 transition-colors duration-300 tracking-wider">
                devbyawais@gmail.com
              </span>
              {/* Dots from Email */}
              {Array.from({ length: 15 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-rose-400 to-purple-400"
                  style={{
                    width: 1 + Math.random() * 2,
                    height: 1 + Math.random() * 2,
                    left: 0,
                    top: '50%',
                    marginTop: -8 + Math.random() * 16,
                  }}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ 
                    x: [0, 80, 160],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    delay: i * 0.12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.a>

            {/* ABOUT + HEART Together */}
            <Link to="/about">
              <motion.div 
                className="relative flex items-center gap-1 overflow-visible cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="text-xs font-black uppercase tracking-[0.2em] text-white/70"
                  animate={{
                    color: ['#ffffff70', '#f472b6', '#a855f7', '#ffffff70']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ABOUT
                </motion.span>
                
                <motion.div 
                  className="relative"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-base relative z-10">❤️</span>
                  {/* Dots from Heart */}
                  {Array.from({ length: 12 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-rose-400"
                      style={{
                        width: 1 + Math.random() * 2,
                        height: 1 + Math.random() * 2,
                        left: 0,
                        top: '50%',
                        marginTop: -5 + Math.random() * 10,
                      }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ 
                        x: [0, 50, 100],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 2,
                        delay: i * 0.08,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Dots from About */}
                {Array.from({ length: 15 }, (_, i) => (
                  <motion.div
                    key={`about-dot-${i}`}
                    className="absolute rounded-full bg-gradient-to-r from-rose-400 to-purple-400"
                    style={{
                      width: 1 + Math.random() * 2,
                      height: 1 + Math.random() * 2,
                      left: 0,
                      top: '50%',
                      marginTop: -8 + Math.random() * 16,
                    }}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ 
                      x: [0, 80, 160],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 2,
                      delay: i * 0.12,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </motion.div>
            </Link>
          </div>
        </div>

        {/* ========== MOBILE: SIRF 3 LINES BUTTON (NO AWAIMA) ========== */}
        <div className="md:hidden flex items-center justify-end w-full">
          {/* Mobile: Sirf 3 Lines Button - No AWAIMA */}
          <button 
            onClick={toggleMenu}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
          >
            <motion.div 
              className="w-6 h-0.5 bg-white rounded-full"
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-6 h-0.5 bg-white rounded-full"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="w-6 h-0.5 bg-white rounded-full"
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        {/* ========== MOBILE MENU OVERLAY - FIXED VERSION ========== */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-gradient-to-br from-rose-900/98 via-pink-900/98 to-purple-900/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center shadow-2xl pointer-events-auto"
            >
              {/* Background floating dots */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/15 pointer-events-none"
                  style={{
                    width: 1 + Math.random() * 4,
                    height: 1 + Math.random() * 4,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, (Math.random() - 0.5) * 60, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    delay: Math.random() * 3,
                    repeat: Infinity,
                  }}
                />
              ))}

              {/* Close Button */}
              <button 
                onClick={toggleMenu}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-xl hover:bg-white/20 transition-all duration-300"
              >
                ✕
              </button>

              {/* ===== 3 CHEEZEIN INSIDE MENU ===== */}
              <div className="flex flex-col items-center gap-8 w-full px-6">
                
                {/* 1. AWAIMA Logo - Animated */}
                <Link to="/" onClick={closeMenu} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: -40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="text-center cursor-pointer"
                  >
                    <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                      AWAIMA
                    </h2>
                    {/* Animated dots under logo */}
                    <div className="flex justify-center gap-1.5 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-rose-400"
                          animate={{ 
                            scale: [1, 1.8, 1], 
                            opacity: [0.4, 1, 0.4],
                            y: [0, -3, 0]
                          }}
                          transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </Link>

                {/* Divider Line with Dots */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '60%', opacity: 0.5 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                />

                {/* 2. Email - Animated */}
                <motion.a
                  href="mailto:devbyawais@gmail.com"
                  className="group relative w-full text-center py-4 cursor-pointer"
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-mono text-white/70 group-hover:text-rose-300 transition-all duration-300 tracking-wider">
                    devbyawais@gmail.com
                  </span>
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-rose-400 to-purple-400 group-hover:w-3/4 transition-all duration-300"
                  />
                  {/* Floating dots around email */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-rose-400 pointer-events-none"
                      animate={{
                        y: [0, -15 + Math.random() * 10],
                        x: [0, (Math.random() - 0.5) * 40],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                      style={{ left: '50%', bottom: -5 }}
                    />
                  ))}
                </motion.a>

                {/* Divider Line with Dots */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '60%', opacity: 0.5 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                />

                {/* 3. About + Heart - FIXED - Now clickable on mobile */}
                <Link 
                  to="/about" 
                  onClick={closeMenu}
                  className="block"
                >
                  <motion.div 
                    className="group flex items-center gap-3 text-center py-4 px-6 cursor-pointer"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm font-black uppercase tracking-[0.3em] text-white/70 group-hover:text-rose-300 transition-all duration-300">
                      ABOUT
                    </span>
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-xl"
                    >
                      ❤️
                    </motion.span>
                  </motion.div>
                </Link>
              </div>

              {/* Bottom Glow */}
              <motion.div
                className="absolute bottom-10 w-32 h-32 rounded-full bg-rose-500/20 blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Rising particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`rise-${i}`}
                  className="absolute w-0.5 h-0.5 rounded-full bg-rose-300 pointer-events-none"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    bottom: 0,
                  }}
                  animate={{
                    y: [0, -200],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom subtle line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </nav>
  );
};

export default Navbar;