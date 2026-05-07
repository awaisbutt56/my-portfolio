import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [particles, setParticles] = useState([]);

  const loadingTexts = [
    "Initializing Universe...",
    "Warping Through Space...",
    "Loading Quantum Codes...",
    "Synthesizing Reality...",
    "Almost There...",
    "Welcome to the Future!"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Change loading text based on progress
  useEffect(() => {
    if (progress < 20) setCurrentTextIndex(0);
    else if (progress < 40) setCurrentTextIndex(1);
    else if (progress < 60) setCurrentTextIndex(2);
    else if (progress < 80) setCurrentTextIndex(3);
    else if (progress < 99) setCurrentTextIndex(4);
    else setCurrentTextIndex(5);
  }, [progress]);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(loadingTexts[currentTextIndex].split('').map(char => 
        Math.random() > 0.9 ? String.fromCharCode(65 + Math.random() * 26) : char
      ).join(''));
      setTimeout(() => setGlitchText(''), 100);
    }, 300);
    return () => clearInterval(glitchInterval);
  }, [currentTextIndex]);

  // Generate particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
        angle: Math.random() * 360,
      });
    }
    setParticles(newParticles);
  }, []);

  // Stars background
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 200; i++) {
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

  if (loadingComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-[#030308] via-[#0a0a1a] to-[#030308] flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              textShadow: [
                "0 0 20px rgba(34,211,238,0.5)",
                "0 0 40px rgba(34,211,238,0.8)",
                "0 0 20px rgba(34,211,238,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl md:text-9xl mb-6"
          >
            🚀
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Ready for Takeoff!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm mt-4"
          >
            Loading complete. Entering the universe...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#030308] via-[#0a0a1a] to-[#030308] overflow-hidden z-50">
      
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
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

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              x: [0, Math.sin(particle.angle) * 100, 0],
              y: [0, Math.cos(particle.angle) * 100, 0],
              opacity: [0, 0.5, 0],
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

      {/* Cinematic Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"
        />
      </div>

      {/* Main Loader Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        
        {/* 3D Rotating Cube Loader */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-12">
          {/* Cube Faces */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-2xl backdrop-blur-sm flex items-center justify-center"
              style={{ transform: "translateZ(60px)" }}>
              <span className="text-3xl md:text-4xl">⚛️</span>
            </div>
            {/* Back */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 rounded-2xl backdrop-blur-sm flex items-center justify-center"
              style={{ transform: "rotateY(180deg) translateZ(60px)" }}>
              <span className="text-3xl md:text-4xl">🚀</span>
            </div>
            {/* Right */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/50 rounded-2xl backdrop-blur-sm flex items-center justify-center"
              style={{ transform: "rotateY(90deg) translateZ(60px)" }}>
              <span className="text-3xl md:text-4xl">💻</span>
            </div>
            {/* Left */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/50 rounded-2xl backdrop-blur-sm flex items-center justify-center"
              style={{ transform: "rotateY(-90deg) translateZ(60px)" }}>
              <span className="text-3xl md:text-4xl">🎨</span>
            </div>
            {/* Top */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-400/50 rounded-2xl backdrop-blur-sm flex items-center justify-center"
              style={{ transform: "rotateX(90deg) translateZ(60px)" }}>
              <span className="text-3xl md:text-4xl">✨</span>
            </div>
            {/* Bottom */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-rose-500/20 to-orange-500/20 border-2 border-rose-400/50 rounded-2xl backdrop-blur-sm flex items-center justify-center"
              style={{ transform: "rotateX(-90deg) translateZ(60px)" }}>
              <span className="text-3xl md:text-4xl">⚡</span>
            </div>
          </motion.div>

          {/* Orbiting rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
        </div>

        {/* Glitch Text Effect */}
        <div className="relative mb-8">
          <motion.h1
            className="text-2xl md:text-4xl font-black text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            animate={{ 
              scale: [1, 1.02, 1],
              opacity: [1, 0.95, 1]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {glitchText || loadingTexts[currentTextIndex]}
          </motion.h1>
          {glitchText && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 0.3, x: 5 }}
              className="absolute top-0 left-0 text-2xl md:text-4xl font-black text-cyan-400 blur-sm"
            >
              {glitchText}
            </motion.div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Initializing</span>
            <span className="font-mono">{Math.floor(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full relative"
              style={{ width: `${progress}%` }}
              animate={{ 
                boxShadow: [
                  "0 0 5px rgba(34,211,238,0.5)",
                  "0 0 15px rgba(34,211,238,0.8)",
                  "0 0 5px rgba(34,211,238,0.5)"
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Progress Percentage Circle */}
        <div className="mt-6 relative">
          <svg className="w-20 h-20 md:w-24 md:h-24">
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 35}
              strokeDashoffset={2 * Math.PI * 35 * (1 - progress / 100)}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              key={Math.floor(progress)}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-lg md:text-xl font-black text-cyan-400 font-mono"
            >
              {Math.floor(progress)}
            </motion.span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Tech Stack Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 flex-wrap px-4"
        >
          {["React", "Tailwind", "Framer", "Node", "Mongo"].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[10px] text-gray-400"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Particles that follow mouse (optional) */}
        <motion.div
          className="fixed w-32 h-32 rounded-full bg-cyan-500/5 blur-xl pointer-events-none"
          animate={{
            x: mouseX - 64,
            y: mouseY - 64,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
      </div>
    </div>
  );
};

// Mouse position tracking
let mouseX = 0;
let mouseY = 0;

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

export default ProjectLoader;