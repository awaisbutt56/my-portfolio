import React, { useEffect, useRef, useState } from 'react';
// Replace with your own image path
import myImage from "../assets/images/dpfirstcard.jpeg";


const TOTAL_SECONDS = 5;
const MESSAGES = [
  'Initiating starfield...',
  'Calibrating cosmic rings...',
  'Loading image portal...',
  'Spawning orbit icons...',
  'Warp complete. Welcome.',
];

const AboutLoader = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [msg, setMsg] = useState(MESSAGES[0]);

  // --- Canvas Starfield (full screen of moving dots/stars) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];

    const initStars = (width, height) => {
      const count = 300;
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // draw each star
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        
        // subtle twinkle
        star.alpha += 0.003;
        if (star.alpha > 0.8) star.alpha = 0.2;
        
        // move stars slowly
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });
      
      animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // --- Progress simulation (like StarDustLoader) ---
  useEffect(() => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const p = Math.min(1, elapsed / TOTAL_SECONDS);
      setProgress(Math.floor(p * 100));
      setTimeLeft(Math.max(0, TOTAL_SECONDS - Math.floor(elapsed)));
      const msgIndex = Math.min(Math.floor(p * MESSAGES.length), MESSAGES.length - 1);
      setMsg(MESSAGES[msgIndex]);
      if (p >= 1) {
        clearInterval(interval);
        setTimeout(() => onComplete?.(), 600);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="loader-cosmic">
      {/* Canvas starfield background */}
      <canvas ref={canvasRef} className="star-canvas" />

      {/* Nebula overlays (soft coloured clouds) */}
      <div className="nebula n1"></div>
      <div className="nebula n2"></div>
      <div className="nebula n3"></div>

      {/* Rotating accretion rings (like StarDustLoader's disk) */}
      <div className="rings-container">
        <div className="ring r1"></div>
        <div className="ring r2"></div>
        <div className="ring r3"></div>
      </div>

      {/* Central custom image with protective orbits */}
      <div className="image-portal">
        <div className="orbiting-dot dot1"></div>
        <div className="orbiting-dot dot2"></div>
        <div className="orbiting-dot dot3"></div>
        <div className="orbiting-dot dot4"></div>
        <div className="image-wrapper">
          <img src={myImage} alt="User" className="hero-img" />
        </div>
        <div className="glow-ring"></div>
      </div>

      {/* Text & progress panel (bottom) */}
      <div className="info-panel">
        <h2 className="loader-title">ABOUT<span className="accent">_</span>...</h2>
        <div className="status-area">
          <span className="msg">{msg}</span>
          <span className="percentage">{progress}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="timer-area">
          <span>⚡ SYSTEM BOOT</span>
          <span>{`0:${pad(timeLeft)} / 0:${pad(TOTAL_SECONDS)}`}</span>
        </div>
      </div>

      {/* Scanline effect (optional, for style) */}
      <div className="scanline"></div>

      <style jsx>{`
        .loader-cosmic {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at 40% 50%, #0a0a1a 0%, #000000 100%);
          overflow: hidden;
          font-family: 'Orbitron', 'Segoe UI', monospace;
          z-index: 9999;
        }

        /* Canvas stars */
        .star-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 1;
          pointer-events: none;
        }

        /* Nebula clouds */
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: floatNebula 12s infinite alternate;
          z-index: 0;
        }
        .n1 {
          width: 70%;
          height: 70%;
          top: -20%;
          left: -20%;
          background: radial-gradient(circle, rgba(80, 0, 200, 0.4), transparent);
        }
        .n2 {
          width: 60%;
          height: 60%;
          bottom: -15%;
          right: -15%;
          background: radial-gradient(circle, rgba(0, 160, 255, 0.3), transparent);
          animation-duration: 15s;
        }
        .n3 {
          width: 50%;
          height: 50%;
          top: 30%;
          left: 30%;
          background: radial-gradient(circle, rgba(255, 50, 120, 0.2), transparent);
          animation-duration: 18s;
        }
        @keyframes floatNebula {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0.6; }
        }

        /* Rotating rings (accretion disk style) */
        .rings-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 380px;
          height: 380px;
          transform: translate(-50%, -50%);
          z-index: 3;
          pointer-events: none;
        }
        .ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .r1 {
          width: 100%;
          height: 100%;
          border: 2px solid rgba(0, 255, 255, 0.5);
          border-top-color: cyan;
          border-bottom-color: magenta;
          animation: spin 8s linear infinite;
        }
        .r2 {
          width: 76%;
          height: 76%;
          border: 1px dashed rgba(255, 200, 0, 0.6);
          animation: spinReverse 6s linear infinite;
        }
        .r3 {
          width: 52%;
          height: 52%;
          border: 1px solid rgba(255, 100, 255, 0.4);
          border-left: 3px solid magenta;
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spinReverse {
          0% { transform: translate(-50%, -50%) rotate(360deg); }
          100% { transform: translate(-50%, -50%) rotate(0deg); }
        }

        /* Central image portal */
        .image-portal {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          transform: translate(-50%, -50%);
          z-index: 10;
        }
        .image-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
          animation: pulseShadow 2s infinite alternate;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @keyframes pulseShadow {
          0% { box-shadow: 0 0 15px cyan; transform: scale(0.98); }
          100% { box-shadow: 0 0 45px magenta; transform: scale(1.02); }
        }
        .glow-ring {
          position: absolute;
          top: -15px;
          left: -15px;
          right: -15px;
          bottom: -15px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,255,0.2), transparent);
          filter: blur(12px);
          z-index: -1;
        }

        /* Orbiting CSS dots (no emojis) */
        .orbiting-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #0ff;
          border-radius: 50%;
          box-shadow: 0 0 8px cyan;
          animation: orbit 6s linear infinite;
        }
        .dot1 { top: -20px; left: 50%; transform: translateX(-50%); animation-duration: 4s; }
        .dot2 { bottom: -20px; left: 50%; transform: translateX(-50%); animation-duration: 5s; animation-direction: reverse; }
        .dot3 { top: 50%; left: -20px; transform: translateY(-50%); animation-duration: 3.5s; }
        .dot4 { top: 50%; right: -20px; transform: translateY(-50%); animation-duration: 6s; animation-direction: reverse; }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(110px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
        }
        /* Adjust orbit radius for responsiveness */
        @media (min-width: 640px) {
          .orbiting-dot { width: 12px; height: 12px; }
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(140px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
          }
        }

        /* Info panel (bottom) */
        .info-panel {
          position: absolute;
          bottom: 8%;
          left: 0;
          right: 0;
          text-align: center;
          background: rgba(10, 10, 30, 0.7);
          backdrop-filter: blur(12px);
          padding: 1rem 1rem;
          border-top: 1px solid rgba(0, 255, 255, 0.4);
          border-bottom: 1px solid rgba(255, 0, 255, 0.4);
          z-index: 15;
        }
        .loader-title {
          font-size: clamp(1.2rem, 5vw, 2rem);
          font-weight: 700;
          letter-spacing: 4px;
          background: linear-gradient(135deg, #fff, #0ff, #f0f);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 0.5rem;
        }
        .accent { color: #f0f; background: none; }
        .status-area {
          display: flex;
          justify-content: space-between;
          width: 280px;
          max-width: 80%;
          margin: 0 auto 0.5rem;
          font-family: monospace;
          font-size: 0.7rem;
          color: #aaf;
        }
        .percentage {
          font-weight: bold;
          background: linear-gradient(90deg, cyan, magenta);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .progress-track {
          width: 280px;
          max-width: 80%;
          margin: 0 auto;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, cyan, magenta);
          transition: width 0.08s linear;
          box-shadow: 0 0 6px cyan;
        }
        .timer-area {
          display: flex;
          justify-content: space-between;
          width: 280px;
          max-width: 80%;
          margin: 0.5rem auto 0;
          font-size: 0.6rem;
          font-family: monospace;
          color: #88aaff;
        }

        /* Scanline effect */
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px);
          pointer-events: none;
          z-index: 20;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .rings-container { width: 260px; height: 260px; }
          .image-portal { width: 130px; height: 130px; }
          .orbiting-dot { width: 6px; height: 6px; }
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(85px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(85px) rotate(-360deg); }
          }
        }
      `}</style>
    </div>
  );
};

export default AboutLoader;