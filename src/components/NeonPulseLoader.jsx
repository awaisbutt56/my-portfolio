import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NeonPulseLoader = () => {
  const canvasRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sequences = [
    { t: "> INITIALIZING SOUL-SYNC...", c: "#00ff41" }, // Hacker Green
    { t: "> DECRYPTING ETERNAL BOND...", c: "#00f3ff" }, // Cyber Blue
    { t: "> CALIBRATING HEART FREQUENCY...", c: "#ff0055" }, // Neon Pink
    { t: "> ACCESS GRANTED: MY ❤️", c: "#A8E6CF" } // Soft Mint
];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768); // Check if mobile
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Mobile par stars thore kam aur chotay
        this.size = Math.random() * (window.innerWidth < 768 ? 2 : 3) + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Mobile par particles ki tadad kam kar di taakay performance behtar rahay
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        for (let j = index; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          // Connecting distance mobile par thori kam
          const maxDist = window.innerWidth < 768 ? 80 : 120;
          if (distance < maxDist) {
            ctx.strokeStyle = `rgba(255, 45, 117, ${1 - distance / maxDist})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev < sequences.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={viewportStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />

      <div style={centerContainer}>
        <div style={{...heartGlow, width: isMobile ? '200px' : '300px', height: isMobile ? '200px' : '300px'}} />
        
        {/* Dynamic SVG size for Mobile */}
        <svg width={isMobile ? "160" : "240"} height={isMobile ? "160" : "240"} viewBox="0 0 100 100">
          <motion.path
            d="M50 85 C-10 45 15 5 50 35 C85 5 110 45 50 85"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              pathLength: { duration: 2.5, ease: "easeInOut" },
              scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0055" />
              <stop offset="100%" stopColor="#00f3ff" />
            </linearGradient>
          </defs>
        </svg>

        <div style={textWrapper}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={stage}
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              style={{ 
                color: sequences[stage].c, 
                ...statusTextStyle,
                fontSize: isMobile ? '0.9rem' : '1.4rem',
                letterSpacing: isMobile ? '1.5px' : '3px'
              }}
            >
              {sequences[stage].t}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      <div style={vignette} />
    </div>
  );
};

// --- STYLES (Adjusted for better Mobile experience) ---

const viewportStyle = {
  height: '100vh', width: '100vw',
  backgroundColor: '#020202', overflow: 'hidden',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  position: 'relative',
  touchAction: 'none' // Mobile scroll prevention
};

const canvasStyle = {
  position: 'absolute', top: 0, left: 0,
  zIndex: 1, pointerEvents: 'none'
};

const centerContainer = {
  position: 'relative', zIndex: 10,
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  width: '100%', padding: '0 20px'
};

const heartGlow = {
  position: 'absolute',
  background: 'radial-gradient(circle, rgba(255, 45, 117, 0.2) 0%, transparent 70%)',
  top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  zIndex: -1
};

const textWrapper = {
  marginTop: '20px', 
  height: '50px',
  display: 'flex', 
  alignItems: 'center',
  textAlign: 'center'
};

const statusTextStyle = {
  fontFamily: "'Courier New', Courier, monospace",
  fontWeight: 'bold',
  textShadow: '0 0 10px currentColor',
  margin: 0
};

const vignette = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
  background: 'radial-gradient(circle, transparent 20%, black 150%)',
  zIndex: 5, pointerEvents: 'none'
};

export default NeonPulseLoader;