import React, { useState, useEffect, useRef } from 'react';

const HomeTwoLoader = () => {
  const [status, setStatus] = useState("LEVEL_1_CLEARED");
  const [floatingElements, setFloatingElements] = useState([]);
  const canvasRef = useRef(null);
  
  const statusSteps = [
    "✨ INITIALIZING 2.0...",
    "⚡ UPGRADING VIBE CHIP...",
    "💖 LOADING PREMIUM MEMORIES...",
    "🌟 STABILIZING EMOTIONAL CORE...",
    "🚀 READY FOR THE NEXT CHAPTER"
  ];

  // Floating elements effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (floatingElements.length < 15) {
        setFloatingElements(prev => [...prev, {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          type: ['💖', '✨', '⭐', '💫', '🌟', '💕'][Math.floor(Math.random() * 6)],
          size: Math.random() * 15 + 10,
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 2
        }]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [floatingElements.length]);

  // Clean up floating elements
  useEffect(() => {
    const cleanup = setInterval(() => {
      setFloatingElements(prev => prev.filter(el => {
        const age = Date.now() - el.id;
        return age < 5000;
      }));
    }, 2000);
    return () => clearInterval(cleanup);
  }, []);

  // Simple particle system - REDUCED COUNT
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = `hsl(${Math.random() * 60 + 280}, 75%, 60%)`;
        this.alpha = Math.random() * 0.5 + 0.3;
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
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      // REDUCED PARTICLE COUNT
      const particleCount = window.innerWidth < 768 ? 40 : 60;
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const drawSoftConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = window.innerWidth < 768 ? 100 : 130;
          
          if (distance < maxDist) {
            const opacity = (1 - distance / maxDist) * 0.2;
            ctx.strokeStyle = `rgba(236, 72, 153, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Simple gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a1a');
      gradient.addColorStop(1, '#1a0a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawSoftConnections();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      setStatus(statusSteps[step % statusSteps.length]);
      step++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e] overflow-hidden font-mono text-white p-4">
      
      {/* Floating Emojis */}
      {floatingElements.map(element => (
        <div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            left: `${element.x}%`,
            top: '100%',
            animation: `floatUp ${element.duration}s ease-out ${element.delay}s forwards`,
            fontSize: `${element.size}px`,
            zIndex: 20,
            filter: 'drop-shadow(0 0 5px rgba(236,72,153,0.5))'
          }}
        >
          {element.type}
        </div>
      ))}

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        
        {/* Loader Container */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
          
          {/* Outer Rings */}
          <div className="absolute inset-0 border-2 border-dashed border-pink-500/30 rounded-full animate-[spin_15s_linear_infinite]" />
          <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
          
          {/* Pulse Rings */}
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60">
            <div className="absolute inset-0 border-3 border-t-pink-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin-fast" />
            <div className="absolute inset-2 border-2 border-l-purple-500 border-t-transparent border-b-transparent border-r-pink-500 rounded-full animate-spin-reverse-fast opacity-60" />
            <div className="absolute inset-4 border border-pink-500/40 rounded-full animate-pulse-ring" />
          </div>
          
          {/* Orbiting Orbs */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-orbit"
              style={{ 
                transform: `rotate(${i * 60}deg) translateY(${window.innerWidth < 640 ? '-90px' : '-110px'})`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 8px rgba(236,72,153,0.6)'
              }} 
            />
          ))}
          
          {/* Center Core */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl rounded-full border border-white/20 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.2)] animate-pulse-glow">
             <div className="relative">
               <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-shine">
                 L2
               </span>
               <div className="absolute -top-2 -right-2 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
             </div>
             <div className="w-10 sm:w-12 h-0.5 bg-pink-500/30 mt-2 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 animate-loading-bar" />
             </div>
             <div className="text-[8px] sm:text-[9px] mt-2 text-white/50 tracking-wider">CORE</div>
          </div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-pink-400 rounded-full animate-float-particle"
              style={{ 
                transform: `rotate(${i * 60}deg) translateY(${window.innerWidth < 640 ? '-75px' : '-90px'})`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.5
              }} 
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center w-full">
          <div className="relative inline-block mb-4 px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl" />
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase animate-glitch break-words relative">
              LEVEL_1_
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                CONQUERED
              </span>
            </h2>
          </div>

          <div className="max-w-[90%] sm:max-w-lg md:max-w-xl mx-auto">
            <p className="text-sm sm:text-lg md:text-xl font-bold text-white/90 leading-relaxed mb-6">
              "You're doing amazing! Level 2 is where the 
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-black"> real magic</span> begins."
            </p>
            
            {/* Progress Section */}
            <div className="flex flex-col items-center gap-4">
               {/* Progress Bars */}
               <div className="flex gap-2 sm:gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-6 sm:w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 animate-progress-slide" 
                        style={{ animationDelay: `${i * 0.15}s` }} 
                      />
                    </div>
                  ))}
               </div>
               
               {/* Status */}
               <div className="relative">
                 <div className="absolute inset-0 bg-pink-500/20 blur-lg animate-pulse" />
                 <p className="relative text-pink-400 text-[10px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.4em] font-bold uppercase animate-text-pulse">
                   {status}
                 </p>
               </div>

               {/* Percentage */}
               <div className="flex items-center gap-3 text-[10px] sm:text-xs">
                 <span className="text-pink-400">⬤</span>
                 <span className="text-white/60">LOADING PROGRESS</span>
                 <span className="text-purple-400 animate-pulse">82%</span>
                 <span className="text-pink-400">⬤</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-xl sm:text-2xl animate-bounce-slow opacity-30">✨</div>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xl sm:text-2xl animate-bounce-slow delay-100 opacity-30">💫</div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-xl sm:text-2xl animate-bounce-slow delay-200 opacity-30">⭐</div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-xl sm:text-2xl animate-bounce-slow delay-300 opacity-30">💖</div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-fast { animation: spin 1.5s linear infinite; }
        .animate-spin-reverse-fast { animation: spin 1.2s linear infinite reverse; }
        
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }
        .animate-pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateY(-90px) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(-90px) rotate(-360deg); }
        }
        
        @media (min-width: 640px) {
          @keyframes orbit {
            0% { transform: rotate(0deg) translateY(-110px) rotate(0deg); }
            100% { transform: rotate(360deg) translateY(-110px) rotate(-360deg); }
          }
        }
        
        .animate-orbit { animation: orbit 4s linear infinite; }
        
        @keyframes float-particle {
          0%, 100% { transform: rotate(0deg) translateY(-75px) scale(1); opacity: 0.3; }
          50% { transform: rotate(180deg) translateY(-75px) scale(1.3); opacity: 0.8; }
        }
        
        @media (min-width: 640px) {
          @keyframes float-particle {
            0%, 100% { transform: rotate(0deg) translateY(-90px) scale(1); opacity: 0.3; }
            50% { transform: rotate(180deg) translateY(-90px) scale(1.3); opacity: 0.8; }
          }
        }
        
        .animate-float-particle { animation: float-particle 3s ease-in-out infinite; }
        
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar { animation: loading-bar 1.5s ease-in-out infinite; }
        
        @keyframes progress-slide {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        .animate-progress-slide { animation: progress-slide 2s ease-in-out infinite; transform-origin: left; }
        
        @keyframes glitch {
          0%, 100% { text-shadow: 2px 0 #ec4899, -2px 0 #a855f7; transform: skew(0deg); }
          25% { text-shadow: -2px 0 #ec4899, 2px 0 #a855f7; transform: skew(1deg); }
          50% { text-shadow: 1px 0 #ec4899, -1px 0 #a855f7; transform: skew(-1deg); }
          75% { text-shadow: -1px 0 #ec4899, 1px 0 #a855f7; transform: skew(0.5deg); }
        }
        .animate-glitch { animation: glitch 2s infinite; }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { 
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes text-shine {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(236,72,153,0.3)); }
          50% { filter: drop-shadow(0 0 15px rgba(168,85,247,0.6)); }
        }
        .animate-text-shine { animation: text-shine 2s ease-in-out infinite; }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(236,72,153,0.15); }
          50% { box-shadow: 0 0 50px rgba(168,85,247,0.25); }
        }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        
        @keyframes text-pulse {
          0%, 100% { opacity: 0.7; text-shadow: 0 0 5px currentColor; }
          50% { opacity: 1; text-shadow: 0 0 10px currentColor; }
        }
        .animate-text-pulse { animation: text-pulse 1.5s ease-in-out infinite; }
        
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.5s; }
        .delay-200 { animation-delay: 1s; }
        .delay-300 { animation-delay: 1.5s; }
      `}</style>
    </div>
  );
};

export default HomeTwoLoader;