import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import navImg from "../assets/images/navImgone.jpeg";

const HomeheroOne = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);
  const [lives, setLives] = useState(2);
  const [isLocked, setIsLocked] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isError, setIsError] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [ripple, setRipple] = useState({ show: false, x: 0, y: 0 });
  const canvasRef = useRef(null);


  const allOptions = [
    { text: "The Only Person Who Rules My Heart ❤️", correct: true },
    { text: "Just A Random Notification 💌", correct: false },
    { text: "The Admin with Full Access to My Soul 🔑", correct: false },
    { text: "Just Another Professional Overthinker 🤯", correct: false },
  ];

  const fullText = "AWAIMA PROTOCOL";

  // Canvas Animation for Bouncing Balls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let balls = [];
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBalls();
    };

    // Soft, elegant color palette for balls
    const colors = [
      '#60a5fa', // soft blue
      '#34d399', // soft green  
      '#f472b6', // soft pink
      '#a78bfa', // soft purple
      '#fbbf24', // soft amber
      '#2dd4bf', // soft teal
      '#fb923c', // soft orange
      '#f43f5e', // soft rose
    ];

    class BouncingBall {
      constructor(x, y, radius, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce boundaries
        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.speedX = -this.speedX;
        }
        if (this.x + this.radius > canvas.width) {
          this.x = canvas.width - this.radius;
          this.speedX = -this.speedX;
        }
        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.speedY = -this.speedY;
        }
        if (this.y + this.radius > canvas.height) {
          this.y = canvas.height - this.radius;
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}80`;
        ctx.fill();
        
        // Tiny highlight
        ctx.beginPath();
        ctx.arc(this.x - this.radius * 0.25, this.y - this.radius * 0.25, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}CC`;
        ctx.fill();
      }
    }

    const initBalls = () => {
      balls = [];
      const width = canvas.width;
      const height = canvas.height;
      
      // Number of balls based on screen size (15-25 balls)
      const ballCount = Math.min(Math.floor(width * height / 25000), 25);
      
      for (let i = 0; i < ballCount; i++) {
        // Small radius (5-12px)
        const radius = Math.random() * 7 + 5;
        
        // Very slow speed
        const speedX = (Math.random() - 0.5) * 0.6;
        const speedY = (Math.random() - 0.5) * 0.6;
        
        const x = Math.random() * (width - radius * 2) + radius;
        const y = Math.random() * (height - radius * 2) + radius;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        balls.push(new BouncingBall(x, y, radius, color, speedX, speedY));
      }
    };

    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const shuffled = [...allOptions].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsLocked(true);
    }
  }, [timeLeft, isLocked]);

  const handleChoice = (opt, e) => {
    if (isLocked) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ show: true, x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple({ show: false, x: 0, y: 0 }), 500);
    
    if (opt.correct) {
      navigate('/HeroTwo'); 
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setIsError(true);
      if (newLives <= 0) setIsLocked(true);
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-gradient-to-br from-gray-950 via-black to-gray-950 overflow-hidden relative">
      
      {/* Canvas Background - Simple Colorful Bouncing Balls */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Animated Gradient Border Container */}
      <div className={`relative p-[2px] rounded-[3rem] transition-all duration-700 max-w-xl w-full z-10 ${
        isLocked ? 'bg-gradient-to-r from-red-700 to-red-900' : 
        isError ? 'bg-gradient-to-r from-red-600 to-orange-600' : 
        'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-border-spin'
      }`}>
        
        <div className={`relative p-6 sm:p-10 md:p-12 rounded-[2.8rem] backdrop-blur-3xl transition-all duration-700 text-center overflow-hidden ${
          isLocked ? 'bg-red-950/80' : 
          isError ? 'bg-red-950/60' : 
          'bg-black/70'
        }`}>
          
          {/* Top Progress Bar with Glow */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
            <div 
              className={`h-full transition-all duration-1000 ease-out relative ${
                timeLeft < 7 ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_20px_red]' : 
                'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_0_20px_pink]'
              }`}
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            </div>
          </div>

          {/* Header Area */}
          <div className="flex justify-between items-center mb-6 md:mb-10 pt-24 md:pt-10 relative px-2">
            
            {/* Timer with Glow */}
            <div className="text-left flex-1">
              <p className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-[0.3em] mb-1 font-mono">TIMER</p>
              <div className="relative inline-block">
                <p className={`text-lg md:text-2xl font-black font-mono tracking-wider ${timeLeft < 7 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </p>
                {timeLeft < 7 && (
                  <div className="absolute inset-0 blur-md bg-red-500/30 -z-10"></div>
                )}
              </div>
            </div>

            {/* Center: Animated DP with 3D effect */}
            <div className="relative group flex-shrink-0 mx-4">
              {/* Rotating Gradient Ring */}
              <div className="absolute inset-[-4px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full animate-spin-slow opacity-75 group-hover:opacity-100 transition-all"></div>
              
              {/* 3D Image Container */}
              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-blue-500/30 z-10"></div>
                <img 
  src={navImg} 
  alt="Profile" 
  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
/>
              </div>
              

              {/* Heartbeat Pulse */}
              <div className="absolute inset-0 rounded-full bg-pink-500/40 animate-heartbeat opacity-0 group-hover:opacity-100"></div>
            </div>

            {/* Lives with Heartbeat Animation */}
            <div className="text-right flex-1">
              <p className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-[0.3em] mb-2 font-mono">HEARTS</p>
              <div className="flex gap-1 justify-end">
                {[...Array(2)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`inline-block transition-all duration-500 text-base md:text-xl ${
                      i < lives ? 
                      'animate-heartbeat text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]' : 
                      'opacity-20 grayscale'
                    }`}
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>
          </div>

          {!isLocked ? (
            <div className="animate-fade-in-up px-2">
              {/* Typewriter Heading */}
              <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-300 animate-gradient">
                  {typedText}
                </span>
                <span className="inline-block w-0.5 h-8 md:h-12 bg-pink-500 ml-1 animate-blink"></span>
              </h1>

              <p className="text-slate-400 text-[9px] md:text-[11px] mb-8 uppercase tracking-[0.2em] font-medium leading-relaxed">
                A developer to the world... but who are you to me? <br className="hidden sm:block"/>
                <span className="text-pink-400">Identify yourself to proceed.</span>
              </p>

              {/* Staggered Options */}
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {shuffledOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={(e) => handleChoice(opt, e)}
                    className={`group relative p-4 md:p-5 rounded-2xl border border-white/10 bg-white/5 
                      hover:border-pink-500/70 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] 
                      transition-all duration-300 active:scale-[0.97] text-left overflow-hidden
                      animate-staggered`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Ripple Effect */}
                    {ripple.show && (
                      <span 
                        className="absolute rounded-full bg-pink-500/40 animate-ripple"
                        style={{ left: ripple.x, top: ripple.y }}
                      />
                    )}
                    
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-[10px] font-mono text-white/60 group-hover:text-pink-400 border border-white/10 group-hover:border-pink-500/30 transition-all">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className="text-slate-200 text-xs md:text-sm font-semibold group-hover:text-white transition-colors">
                        {opt.text}
                      </span>
                    </div>
                    
                    {/* Magnetic Effect Line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Failure Screen with Glitch Effect */
            <div className="py-6 md:py-10 animate-scale-up px-4 text-center">
              <div className="relative inline-block mb-6 md:mb-8">
                <div className="text-4xl md:text-6xl animate-bounce-slow relative z-10">
                  💔
                </div>
                {/* Expanding rings */}
                <div className="absolute inset-0 rounded-full animate-ping-slow">
                  <div className="absolute inset-0 rounded-full bg-red-600/30"></div>
                </div>
                <div className="absolute inset-[-10px] rounded-full animate-ping-slower">
                  <div className="absolute inset-0 rounded-full bg-red-600/20"></div>
                </div>
              </div>

              <h2 className="text-2xl md:text-4xl font-black mb-3 tracking-tighter uppercase relative inline-block">
                <span className="text-red-600 relative animate-glitch" data-text="HEART DISCONNECTED">
                  HEART DISCONNECTED
                </span>
              </h2>

              <p className="text-slate-300 mb-6 font-medium leading-relaxed text-xs md:text-base italic max-w-[280px] md:max-w-md mx-auto">
                "That wasn't supposed to be this hard... <br className="hidden sm:block"/>
                Or did you really forget me that quickly? 😉 <br/>
                <span className="text-pink-400">Try again — I'm still waiting.</span>"
              </p>

              <button 
                onClick={() => window.location.reload()}
                className="group relative px-6 md:px-12 py-3 md:py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] active:scale-95"
              >
                <span className="relative z-10 tracking-widest text-[10px] md:text-sm uppercase">
                  ⟳ RECONNECT HEART
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 pb-4 sm:pb-6 border-t border-white/5">
            <p className="text-[7px] font-mono text-white/30 tracking-[0.4em] uppercase animate-pulse italic">
              ⚡ Neural_Link • Secured_Access • Level_01 ⚡
            </p>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes border-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitch {
          0%, 100% { transform: skew(0deg); opacity: 1; }
          95% { transform: skew(2deg); opacity: 0.8; text-shadow: -2px 0 red; }
          96% { transform: skew(-2deg); opacity: 0.9; text-shadow: 2px 0 blue; }
        }
        @keyframes ripple {
          0% { width: 0px; height: 0px; opacity: 0.5; }
          100% { width: 200px; height: 200px; opacity: 0; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-border-spin { background-size: 200% 200%; animation: border-spin 3s ease infinite; }
        .animate-heartbeat { animation: heartbeat 1.2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-glitch { animation: glitch 0.3s ease-in-out 2; }
        .animate-ripple { animation: ripple 0.5s linear forwards; }
        .animate-ping-slow { animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-ping-slower { animation: ping-slower 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-staggered { opacity: 0; animation: fadeInUp 0.5s ease-out forwards; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .bg-300 { background-size: 300% 300%; }
        .animate-gradient { animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
};

export default HomeheroOne;