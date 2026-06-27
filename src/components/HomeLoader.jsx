import React, { useState, useEffect, useMemo } from 'react';

const HomeLoader = () => {
  const [status, setStatus] = useState("Initializing...");
  
  const statusSteps = [
    "UNFOLDING_DIGITAL_FLOWERS🌷...",
    "SYNCING_HEART_BEATS_100%🤞",
    "OPTIMIZING_ENGINE",
    "BYPASSING_LOGIC_FOR_🌸❤️",
    "AWAIMA_VIBES_DETECTED😍",
    "WELCOME_TO_OUR_🌸❤️"
  ];

  const floatingElements = ["❤️", "🌸", "💖", "✨", "🌷", "🥀","🎀"];

  // --- CONTENT FIXED: Emojis jump nahi karenge re-render pe ---
  const staticEmojis = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      emoji: floatingElements[i % floatingElements.length],
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * -20,
    }));
  }, []);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      setStatus(statusSteps[step % statusSteps.length]);
      step++;
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#08020d] overflow-hidden">
      
      {/* --- 1. RICH FLOATING ELEMENTS (Smoothed Orbit Logic) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {staticEmojis.map((item) => (
          <div
            key={item.id}
            className="absolute animate-float-continuous opacity-40 select-none"
            style={{
              fontSize: `${item.size}px`,
              top: `${item.top}%`,
              left: `${item.left}%`,
              animationDuration: `${item.duration}s`, 
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* --- 2. GLOWING AURORAS (Smooth Pulsing) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[120px] rounded-full animate-aurora-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full animate-aurora-pulse-delayed"></div>

      {/* --- 3. CENTRAL CORE (Original Structure) --- */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Massive Energy Ripples */}
        <div className="absolute">
          <div className="w-56 h-56 border-2 border-pink-500/10 rounded-full animate-ping-slow"></div>
          <div className="absolute inset-0 w-56 h-56 border-2 border-emerald-500/5 rounded-full animate-ping-slower"></div>
        </div>

        <div className="relative w-52 h-52 flex items-center justify-center">
          {/* Animated Tech Rings */}
          <div className="absolute w-full h-full border-4 border-t-pink-500 border-b-emerald-500 border-l-transparent border-r-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute w-[80%] h-[80%] border-4 border-l-violet-500 border-r-pink-400 border-t-transparent border-b-transparent rounded-full animate-spin-reverse opacity-50"></div>
          
          {/* THE HEART - Solid, Straight & Glowing */}
          <div className="relative w-28 h-28 bg-white/5 backdrop-blur-3xl rounded-[5.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(236,72,153,0.4)] z-20 border border-white/20 animate-core-pulse">
             <div className="text-5xl drop-shadow-[0_0_20px_#ec4899]">❤️</div>
          </div>
        </div>

        {/* --- 4. TEXT & THICK DOTS (Original Content/Size Preserved) --- */}
        <div className="text-center mt-14 relative">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-widest mb-6 uppercase">
            AWAIMA<span className="text-pink-500 text-glow">.</span>EXE
          </h2>
        
          <div className="flex flex-col items-center gap-5">
            {/* THICKER BOUNCING DOTS */}
            <div className="flex gap-3 mb-2">
                <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399] animate-bounce"></div>
                <div className="w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_15px_#ec4899] animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 bg-violet-600 rounded-full shadow-[0_0_15px_#7c3aed] animate-bounce [animation-delay:-0.3s]"></div>
            </div>

            <div className="w-full max-w-[90vw] h-auto min-h-[40px] flex items-center justify-center px-4">
              <span className="bg-gradient-to-r from-emerald-400 via-white to-pink-500 bg-clip-text text-transparent font-mono 
                text-xs sm:text-sm md:text-lg 
                font-black 
                tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] 
                uppercase animate-text-shimmer text-center leading-tight">
                {status}
              </span>
            </div>
            
            <div className="mt-4 py-1 px-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                <p className="text-white/60 font-mono text-[10px] uppercase tracking-[0.5em]">
                    Neural Bond Initialized
                </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Continuous Orbit Animation - No Jumping */
        @keyframes float-continuous {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -50px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        .animate-float-continuous { animation: float-continuous linear infinite; }
        
        .text-glow { filter: drop-shadow(0 0 10px #ec4899); }
        
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        .animate-ping-slow { animation: ping-slow 3s ease-out infinite; }
        
        @keyframes ping-slower {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(5); opacity: 0; }
        }
        .animate-ping-slower { animation: ping-slower 5s ease-out infinite; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 4s linear infinite; }

        @keyframes core-pulse {
          0%, 100% { transform: scale(1); filter: contrast(1); }
          50% { transform: scale(1.15); filter: contrast(1.1); }
        }
        .animate-core-pulse { animation: core-pulse 2s ease-in-out infinite; }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: text-shimmer 3s linear infinite;
        }

        @keyframes aurora-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-aurora-pulse { animation: aurora-pulse 10s ease-in-out infinite; }
        .animate-aurora-pulse-delayed { animation: aurora-pulse 10s ease-in-out infinite -5s; }
      `}</style>
    </div>
  );
};

export default HomeLoader;