import React, { useEffect, useRef, useState } from 'react';

const TOTAL_SECONDS = 5; 

const MSGS = [
  'Transmitting Cosmic Data...',
  'Calibrating Quantum Field...',
  'Synchronizing Star Maps...',
  'Engaging Warp Protocols...',
  'Jump Complete. Welcome.',
];

const StarDustLoader = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [msg, setMsg] = useState(MSGS[0]);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    
    const handleResize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const W = cv.width, H = cv.height, cx = W / 2, cy = H / 2;
    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      z: Math.random() * W, pz: 0,
    }));
    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const W = cv.width, H = cv.height, cx = W / 2, cy = H / 2;
      stars.forEach(s => {
        s.pz = s.z; s.z -= 5;
        if (s.z <= 0) { s.x = Math.random() * W; s.y = Math.random() * H; s.z = W; s.pz = W; }
        const sx = (s.x - cx) / s.z * W + cx, sy = (s.y - cy) / s.z * H + cy;
        const px = (s.x - cx) / s.pz * W + cx, py = (s.y - cy) / s.pz * H + cy;
        const size = Math.max(0.3, (1 - s.z / W) * 3.5);
        const hue = [200, 260, 300, 180][Math.floor(s.x / W * 4)];
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy);
        ctx.strokeStyle = `hsla(${hue},90%,80%,${1 - s.z / W})`;
        ctx.lineWidth = size; ctx.stroke();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let elapsed = 0;
    const tick = setInterval(() => {
      elapsed += 50;
      const p = Math.min(elapsed / (TOTAL_SECONDS * 1000), 1);
      setProgress(Math.round(p * 100));
      setTimeLeft(Math.max(0, TOTAL_SECONDS - Math.floor(elapsed / 1000)));
      setMsg(MSGS[Math.min(Math.floor(p * MSGS.length), MSGS.length - 1)]);
      if (p >= 1) { clearInterval(tick); setTimeout(() => onComplete?.(), 800); }
    }, 50);
    return () => clearInterval(tick);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at 50% 40%,#0d0025 0%,#000510 45%,#000 100%)' }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="nebula n1 absolute rounded-full" />
        <div className="nebula n2 absolute rounded-full" />
        <div className="nebula n3 absolute rounded-full" />
        <div className="nebula n4 absolute rounded-full" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="disk-wrap absolute">
        <div className="disk-ring dr1 absolute rounded-full" />
        <div className="disk-ring dr2 absolute rounded-full" />
        <div className="disk-ring dr3 absolute rounded-full" />
      </div>

      <div className="relative z-20 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] flex items-center justify-center">
        <div className="orb o1 absolute rounded-full" />
        <div className="orb o2 absolute rounded-full" />
        <div className="orb o3 absolute rounded-full" />
        <div className="dot d1 absolute rounded-full" />
        <div className="dot d2 absolute rounded-full" />
        <div className="dot d3 absolute rounded-full" />

        <div className="logo-pieces absolute w-[90px] h-[90px] sm:w-[110px] sm:h-[110px]">
          <div className="lp lp-tl absolute w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
            <svg viewBox="0 0 50 50"><polygon points="2,48 25,2 48,48" fill="none" stroke="#00dcff" strokeWidth="3" strokeLinejoin="round"/><line x1="2" y1="48" x2="25" y2="30" stroke="#00dcff" strokeWidth="2"/></svg>
          </div>
          <div className="lp lp-tr absolute w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
            <svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22" fill="none" stroke="#ff64ff" strokeWidth="3" strokeDasharray="35 35"/><circle cx="25" cy="25" r="10" fill="none" stroke="#ff64ff" strokeWidth="2"/></svg>
          </div>
          <div className="lp lp-bl absolute w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
            <svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" rx="6" fill="none" stroke="#ffcc00" strokeWidth="3"/><rect x="15" y="15" width="20" height="20" rx="3" fill="none" stroke="#ffcc00" strokeWidth="2"/></svg>
          </div>
          <div className="lp lp-br absolute w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
            <svg viewBox="0 0 50 50"><polygon points="25,3 47,47 3,47" fill="none" stroke="#9b59ff" strokeWidth="3" strokeLinejoin="round"/><circle cx="25" cy="34" r="6" fill="none" stroke="#9b59ff" strokeWidth="2"/></svg>
          </div>
        </div>

        <div className="logo-merged absolute w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] z-30">
          <svg viewBox="0 0 80 80">
            <defs><radialGradient id="sg" cx="40%" cy="35%"><stop offset="0%" stopColor="#ffffff"/><stop offset="40%" stopColor="#80e0ff"/><stop offset="100%" stopColor="#9b59ff"/></radialGradient></defs>
            <polygon points="40,5 46,30 70,20 52,40 70,60 46,50 40,75 34,50 10,60 28,40 10,20 34,30" fill="url(#sg)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="10" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
            <circle cx="40" cy="40" r="4" fill="white"/>
          </svg>
        </div>

        <div className="bh absolute rounded-full" />
      </div>

      <div className="relative z-20 text-center mt-6 sm:mt-10">
        <div className="title text-2xl sm:text-4xl tracking-[.3em] sm:tracking-[.55em]">Star&nbsp;Dust</div>
        <div className="flex items-center gap-2 sm:gap-3 justify-center mt-2">
          <span className="tline-l h-px w-8 sm:w-16" />
          <span className="text-[.5rem] sm:text-[.6rem] tracking-[.2em] sm:tracking-[.35em] uppercase italic text-purple-300 font-mono">{msg}</span>
          <span className="tline-r h-px w-8 sm:w-16" />
        </div>
      </div>

      <div className="relative z-20 mt-7 w-full max-w-[300px] sm:max-w-[360px]">
        <div className="flex justify-between mb-2 text-[.55rem] sm:text-[.6rem] tracking-widest uppercase font-mono">
          <span className="text-cyan-400/80">Quantum Jump</span>
          <span className="prog-pct text-[.7rem] sm:text-[.8rem] font-bold">{progress}%</span>
        </div>
        <div className="h-[4px] sm:h-[5px] rounded-full relative overflow-visible" style={{ background: 'rgba(255,255,255,.08)' }}>
          <div className="prog-fill h-full rounded-full relative transition-all duration-75" style={{ width: `${progress}%` }}>
            <div className="prog-dot absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white" />
          </div>
          <div className="shine absolute top-0 h-full w-[40px] sm:w-[50px] rounded-full" />
        </div>
      </div>

      <div className="relative z-20 mt-4 flex flex-col items-center gap-1 font-mono text-[.5rem] sm:text-[.58rem] tracking-[.15em] sm:tracking-[.18em] uppercase text-blue-200/60 text-center">
        <div>Initializing Systems — <span className="text-green-300/85">Online</span></div>
        <div>Awaiting Synchronization: <span className="text-cyan-300 font-bold">{`0:${pad(timeLeft)} / 0:${pad(TOTAL_SECONDS)}`}</span></div>
      </div>

      <div className="absolute inset-0 z-50 pointer-events-none crt" />

      <style jsx>{`
        .n1{width:60%;height:60%;top:-20%;left:-15%;background:radial-gradient(ellipse,rgba(80,0,200,.3),transparent 70%);filter:blur(90px);animation:np 7s ease-in-out infinite}
        .n2{width:55%;height:55%;bottom:-20%;right:-15%;background:radial-gradient(ellipse,rgba(0,160,255,.25),transparent 70%);filter:blur(80px);animation:np 9s ease-in-out infinite 3s}
        .n3{width:45%;height:45%;top:20%;left:25%;background:radial-gradient(ellipse,rgba(255,50,120,.15),transparent 70%);filter:blur(70px);animation:np 5s ease-in-out infinite 1.5s}
        .n4{width:30%;height:30%;top:10%;right:10%;background:radial-gradient(ellipse,rgba(0,220,180,.12),transparent 70%);filter:blur(50px);animation:np 6s ease-in-out infinite 2s}
        @keyframes np{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}

        .disk-wrap{width:300px;height:300px;top:50%;left:50%;transform:translate(-50%,-50%) rotateX(70deg);pointer-events:none}
        @media (min-width: 640px) { .disk-wrap { width: 500px; height: 500px; } }
        
        .disk-ring{top:50%;left:50%;transform:translate(-50%,-50%)}
        .dr1{width:85%;height:85%;background:conic-gradient(from 0deg,rgba(255,180,0,.9),rgba(255,100,0,.7),rgba(255,0,100,.5),rgba(180,0,255,.4),rgba(0,100,255,.3),rgba(0,220,255,.5),rgba(0,255,180,.4),rgba(255,220,0,.8),rgba(255,180,0,.9));animation:ds 3s linear infinite;filter:blur(8px)}
        .dr2{width:70%;height:70%;background:conic-gradient(from 180deg,rgba(255,255,255,.6),rgba(255,200,50,.9),rgba(255,80,0,.7),rgba(200,0,255,.5),rgba(0,150,255,.6),rgba(255,255,255,.6));animation:ds 2s linear infinite reverse;filter:blur(4px)}
        .dr3{width:55%;height:55%;background:#000}
        @keyframes ds{from{transform:translate(-50%,-50%) rotate(0)}to{transform:translate(-50%,-50%) rotate(360deg)}}

        .orb{border:1px solid transparent}
        .o1{width:100%;height:100%;border-color:rgba(0,220,255,.5) rgba(0,220,255,.05) rgba(0,220,255,.5) rgba(0,220,255,.05);animation:cw 5s linear infinite;box-shadow:0 0 20px rgba(0,220,255,.2)}
        .o2{width:80%;height:80%;border-color:rgba(255,100,255,.5) rgba(255,100,255,.05) rgba(255,100,255,.5) rgba(255,100,255,.05);animation:ccw 3s linear infinite}
        .o3{width:65%;height:65%;border-color:rgba(255,200,0,.4) transparent rgba(255,200,0,.4) transparent;animation:cw 2s linear infinite}
        @keyframes cw{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes ccw{from{transform:rotate(360deg)}to{transform:rotate(0)}}

        .dot::after{content:'';position:absolute;border-radius:50%;background:currentColor;box-shadow:0 0 6px currentColor,0 0 12px currentColor}
        .d1{width:100%;height:100%;animation:cw 5s linear infinite}.d1::after{width:8px;height:8px;top:-4px;left:50%;transform:translateX(-50%);color:#00dcff}
        .d2{width:80%;height:80%;animation:ccw 3s linear infinite}.d2::after{width:6px;height:6px;bottom:-3px;left:50%;transform:translateX(-50%);color:#ff64ff}
        .d3{width:65%;height:65%;animation:cw 2s linear infinite}.d3::after{width:5px;height:5px;top:50%;right:-2.5px;transform:translateY(-50%);color:#ffc800}

        .lp{opacity:0}.lp-tl{top:0;left:0;animation:ftl 1.5s cubic-bezier(.4,0,.2,1) forwards}.lp-tr{top:0;right:0;animation:ftr 1.5s cubic-bezier(.4,0,.2,1) .15s forwards}.lp-bl{bottom:0;left:0;animation:fbl 1.5s cubic-bezier(.4,0,.2,1) .3s forwards}.lp-br{bottom:0;right:0;animation:fbr 1.5s cubic-bezier(.4,0,.2,1) .45s forwards}
        @keyframes ftl{0%{transform:translate(-80px,-80px) scale(1.5) rotate(-45deg);opacity:0}40%{opacity:1}80%{transform:translate(0,0) scale(1) rotate(0);opacity:1}100%{transform:translate(0,0) scale(1) rotate(0);opacity:0}}
        @keyframes ftr{0%{transform:translate(80px,-80px) scale(1.5) rotate(45deg);opacity:0}40%{opacity:1}80%{transform:translate(0,0) scale(1) rotate(0);opacity:1}100%{transform:translate(0,0) scale(1) rotate(0);opacity:0}}
        @keyframes fbl{0%{transform:translate(-80px,80px) scale(1.5) rotate(45deg);opacity:0}40%{opacity:1}80%{transform:translate(0,0) scale(1) rotate(0);opacity:1}100%{transform:translate(0,0) scale(1) rotate(0);opacity:0}}
        @keyframes fbr{0%{transform:translate(80px,80px) scale(1.5) rotate(-45deg);opacity:0}40%{opacity:1}80%{transform:translate(0,0) scale(1) rotate(0);opacity:1}100%{transform:translate(0,0) scale(1) rotate(0);opacity:0}}

        .logo-merged{opacity:0;animation:lm .8s ease-out 1.8s forwards}
        @keyframes lm{0%{opacity:0;transform:scale(2);filter:brightness(5) blur(10px)}40%{opacity:1;filter:brightness(3) blur(2px)}100%{opacity:1;transform:scale(1);filter:brightness(1) blur(0)}}

        .bh{width:50%;height:50%;background:radial-gradient(circle at 35% 35%,#0a0015,#000 60%);box-shadow:0 0 0 3px rgba(255,180,50,.8),0 0 30px 10px rgba(255,120,0,.6),0 0 80px 30px rgba(180,50,255,.5),0 0 160px 60px rgba(0,100,255,.3);animation:bh 2.5s ease-in-out infinite}
        @keyframes bh{0%,100%{box-shadow:0 0 0 3px rgba(255,180,50,.8),0 0 30px 10px rgba(255,120,0,.6),0 0 80px 30px rgba(180,50,255,.5)}50%{box-shadow:0 0 0 5px rgba(255,220,100,1),0 0 50px 20px rgba(255,150,0,.9),0 0 120px 50px rgba(220,80,255,.7),0 0 220px 80px rgba(0,150,255,.5)}}

        .title{font-variant:small-caps;font-family:'Palatino Linotype',Palatino,serif;background:linear-gradient(135deg,#40e0ff 0%,#ffffff 35%,#ff80ff 65%,#ffcc00 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 25px rgba(80,200,255,.9));animation:tg 3s ease-in-out infinite}
        @keyframes tg{0%,100%{filter:drop-shadow(0 0 15px rgba(80,200,255,.6))}50%{filter:drop-shadow(0 0 40px rgba(180,100,255,1))}}
        .tline-l{background:linear-gradient(to right,transparent,#00dcff)}
        .tline-r{background:linear-gradient(to left,transparent,#00dcff)}

        .prog-pct{background:linear-gradient(90deg,#00dcff,#ff64ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .prog-fill{background:linear-gradient(90deg,#00dcff,#9b59ff,#ff64ff,#ffcc00);box-shadow:0 0 15px rgba(0,220,255,.9),0 0 30px rgba(155,89,255,.6)}
        .prog-dot{box-shadow:0 0 10px 3px rgba(0,220,255,1),0 0 25px rgba(255,255,255,.8)}
        .shine{background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);animation:sh 1.8s ease-in-out infinite}
        @keyframes sh{0%{left:-50px;opacity:0}15%{opacity:1}85%{opacity:1}100%{left:100%;opacity:0}}

        .crt{background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.04) 3px,rgba(0,0,0,.04) 4px)}
      `}</style>
    </div>
  );
};

export default StarDustLoader;