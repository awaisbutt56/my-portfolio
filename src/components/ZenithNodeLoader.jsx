import React, { useEffect, useRef, useState } from 'react';

const DimensionalRiftLoader = ({ onFinished }) => {
  const canvasRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [displayText, setDisplayText] = useState({ heading: "", sub: "" });

  // Progress tracking ref for canvas logic
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let time = 0;

    let mouse = { x: -1000, y: -1000, radius: 250 };
    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 20 + 5;
        this.vx = Math.cos(this.angle) * this.velocity;
        this.vy = Math.sin(this.angle) * this.velocity;
        this.size = Math.random() * 3 + 1;
        this.colors = ['#00ffff', '#ff00ff', '#ffffff', '#4d4dff'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.friction = 0.96;
        this.alpha = 1;
        this.spin = Math.random() * 0.2 - 0.1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(time * this.spin);
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }

      update(currentProg) {
        if (currentProg < 30) {
          let dx = (canvas.width / 2) - this.x;
          let dy = (canvas.height / 2) - this.y;
          this.x += dx * 0.1 + Math.cos(time) * 5;
          this.y += dy * 0.1 + Math.sin(time) * 5;
          this.alpha = currentProg / 30;
        } else {
          this.x += this.vx;
          this.y += this.vy;
          this.vx *= this.friction;
          this.vy *= this.friction;

          let mDx = mouse.x - this.x;
          let mDy = mouse.y - this.y;
          let distance = Math.sqrt(mDx * mDx + mDy * mDy);
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.vx -= (mDy / distance) * force * 5;
            this.vy += (mDx / distance) * force * 5;
          }
        }

        if (currentProg > 95) {
          this.alpha *= 0.8;
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const count = 600;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 2, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.1;
      particles.forEach(p => {
        p.update(progressRef.current);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const interval = setInterval(() => {
      progressRef.current += 0.6;
      const current = progressRef.current;
      
      if (current >= 100) {
        setPercent(100);
        clearInterval(interval);
        setTimeout(() => onFinished?.(), 2000);
      } else {
        setPercent(current);
      }

      // Script Flow Logic
      if (current < 25) {
        setDisplayText({ heading: "You made it...", sub: "Not by luck... but by staying." });
      } else if (current < 50) {
        setDisplayText({ heading: "Every step...", sub: "Every try brought you here." });
      } else if (current < 75) {
        setDisplayText({ heading: "This isn't just a level.", sub: "It's something more." });
      } else {
        setDisplayText({ heading: "Everything changes now.", sub: "Ready? ❤️" });
      }
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [onFinished]);

  // Helper for rendering liquid indicators
  const LiquidIndicator = ({ currentPercent, threshold, activeColor }) => {
    const isActive = currentPercent > threshold;
    const baseColor = isActive ? activeColor : "#1e293b"; // Active color vs dark base
    const liquidColor = isActive ? activeColor : "rgba(255,255,255,0.1)"; // Liquid color

    return (
      <div className={`relative h-6 w-6 rounded-full overflow-hidden border-2 transition-all duration-300 ${isActive ? '' : 'border-white/10'}`}
        style={{
          borderColor: baseColor,
          boxShadow: isActive ? `0 0 15px ${activeColor}` : 'none'
        }}>
        {/* Container for the liquid effect */}
        <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0.4 }}>
          {/* Wave 1 */}
          <div className="absolute -inset-x-1/2 bottom-0 h-[140%] w-[200%] animate-wave-fast"
            style={{
              background: `linear-gradient(0deg, ${liquidColor} 0%, transparent 80%)`,
              borderRadius: '38%',
              transformOrigin: 'center bottom',
              animationDelay: '0s'
            }}/>
          {/* Wave 2 */}
          <div className="absolute -inset-x-1/2 bottom-0 h-[130%] w-[200%] animate-wave-slow"
            style={{
              background: `linear-gradient(0deg, ${liquidColor} 0%, transparent 90%)`,
              borderRadius: '42%',
              transformOrigin: 'center bottom',
              animationDelay: '-2s',
              opacity: 0.6
            }}/>
        </div>
        
        {/* Shine highlight */}
        <div className="absolute top-1 left-1 h-2 w-2 bg-white/40 rounded-full blur-[1px]"></div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#00020a] overflow-hidden flex items-center justify-center font-mono">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Script Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pointer-events-none">
        <div className="mb-12 transition-all duration-700 transform">
          <h2 key={displayText.heading} 
    className="text-3xl md:text-5xl font-bold mb-4 animate-in fade-in zoom-in duration-500 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
    {displayText.heading}
</h2>
          <p key={displayText.sub} className="text-cyan-400 text-sm md:text-lg tracking-[0.2em] uppercase opacity-80 animate-pulse">
            {displayText.sub}
          </p>
        </div>

        <div className="w-64 md:w-96 space-y-4">
          {/* Main Title Glitch */}
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-blue-500 tracking-tighter italic uppercase drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            AWAIMA
          </h1>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-cyan-400 tracking-[0.3em] uppercase opacity-70">
              <span>System_Sync: {percent < 80 ? "Active" : "Overload"}</span>
              <span>{Math.floor(percent)}%</span>
            </div>

            {/* Precision Loader Bar */}
            <div className="h-[3px] w-full bg-white/5 relative overflow-hidden border border-white/10 rounded-full">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-white shadow-[0_0_20px_#00ffff] transition-all duration-150"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Interaction Indicators - UPGRADED TO LIQUID EFFECT */}
          <div className="flex justify-center gap-8 pt-4">
            <LiquidIndicator currentPercent={percent} threshold={25} activeColor="#00ffff" /> {/* Cyan */}
            <LiquidIndicator currentPercent={percent} threshold={50} activeColor="#ff00ff" /> {/* Magenta */}
            <LiquidIndicator currentPercent={percent} threshold={75} activeColor="#ffffff" /> {/* White */}
          </div>
        </div>
      </div>

      {/* Grid Distortion */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-20 w-full animate-scanline"></div>

      {/* Noise Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://res.cloudinary.com/dyd911kmh/image/upload/v1640050215/grain_u8706t.png')]"></div>

      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes wave-fast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wave-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-wave-fast {
          animation: wave-fast 3s linear infinite;
        }
        .animate-wave-slow {
          animation: wave-slow 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DimensionalRiftLoader;