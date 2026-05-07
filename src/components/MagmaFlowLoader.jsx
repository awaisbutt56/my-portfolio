import React, { useEffect, useRef, useState } from 'react';

// ✅ Duration yahan change karo
const TOTAL_SECONDS = 10;

const MSGS = [
  'Magma Protocol Active...',
  'Superheating Core Chamber...',
  'Plasma Rings Stabilizing...',
  'Eruption Sequence Armed...',
  'Meltdown Complete.',
];

const MagmaFlowLoader = ({ onComplete }) => {
  const particleCanvasRef = useRef(null);
  const dripCanvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [msg, setMsg] = useState(MSGS[0]);

  // ─── PARTICLE CANVAS ───
  useEffect(() => {
    const cv = particleCanvasRef.current;
    const ctx = cv.getContext('2d');
    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 480;
    const COUNT = isMobile ? 80 : 160;

    const particles = Array.from({ length: COUNT }, (_, i) => ({
      corner: i % 4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
      size: 1 + Math.random() * 2.5,
      hue: Math.random() > 0.5 ? [255, 60, 0] : [255, 190, 30],
      offset: Math.random() * 60 - 30,
      t: Math.random() * 5,
    }));

    const cX = (c) => c % 2 === 0 ? -20 : cv.width + 20;
    const cY = (c) => c < 2 ? -20 : cv.height + 20;
    const lerp = (a, b, t) => a + (b - a) * t;

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const cx = cv.width / 2, cy = cv.height / 2;
      for (const p of particles) {
        p.t += 0.012 * p.speed;
        const cycle = (p.t % 5) / 5;
        let x, y, alpha;
        if (cycle < 0.4) {
          const tt = cycle / 0.4, ease = tt * tt * (3 - 2 * tt);
          x = lerp(cX(p.corner), cx + p.offset, ease);
          y = lerp(cY(p.corner), cy + p.offset, ease);
          alpha = ease;
        } else if (cycle < 0.55) {
          const shake = Math.sin(p.t * 80) * 4;
          x = cx + p.offset + shake; y = cy + p.offset + shake; alpha = 1;
        } else {
          const tt = (cycle - 0.55) / 0.45, ease = tt * tt;
          const angle = p.phase + tt * Math.PI * 4;
          x = cx + Math.cos(angle) * ease * cv.width * 0.65;
          y = cy + Math.sin(angle) * ease * cv.width * 0.65;
          alpha = 1 - ease;
        }
        const [r, g, b] = p.hue;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.85})`;
        ctx.shadowBlur = 10; ctx.shadowColor = `rgba(${r},${g},${b},.9)`;
        ctx.fill(); ctx.shadowBlur = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // ─── LAVA DRIP CANVAS ───
  useEffect(() => {
    const lc = dripCanvasRef.current;
    const lctx = lc.getContext('2d');
    lc.width = window.innerWidth; lc.height = window.innerHeight;

    const isMobile = window.innerWidth < 480;
    const drips = Array.from({ length: isMobile ? 12 : 22 }, () => ({
      x: lc.width * 0.3 + Math.random() * lc.width * 0.4,
      y: -Math.random() * 100,
      vy: 0.8 + Math.random() * 2.5,
      r: 2 + Math.random() * 5,
      tail: [],
      hue: Math.random() > 0.5 ? '255,60,0' : '255,150,20',
      blob: false, blobR: 0, blobAlpha: 1,
    }));

    let animId;
    const draw = () => {
      lctx.clearRect(0, 0, lc.width, lc.height);
      for (const d of drips) {
        d.tail.push({ x: d.x, y: d.y });
        if (d.tail.length > 18) d.tail.shift();
        for (let i = 0; i < d.tail.length - 1; i++) {
          const a = (i / d.tail.length) * 0.5;
          lctx.beginPath(); lctx.moveTo(d.tail[i].x, d.tail[i].y);
          lctx.lineTo(d.tail[i + 1].x, d.tail[i + 1].y);
          lctx.strokeStyle = `rgba(${d.hue},${a})`;
          lctx.lineWidth = d.r * (i / d.tail.length);
          lctx.stroke();
        }
        if (!d.blob) {
          d.y += d.vy;
          lctx.beginPath(); lctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          lctx.fillStyle = `rgba(${d.hue},.9)`;
          lctx.shadowBlur = 12; lctx.shadowColor = `rgba(${d.hue},1)`;
          lctx.fill(); lctx.shadowBlur = 0;
          if (d.y > lc.height * 0.85) { d.blob = true; d.blobR = d.r; }
        } else {
          d.blobR += 1.5; d.blobAlpha -= 0.04;
          lctx.beginPath(); lctx.arc(d.x, lc.height * 0.85, d.blobR, 0, Math.PI * 2);
          lctx.fillStyle = `rgba(${d.hue},${d.blobAlpha * 0.3})`; lctx.fill();
          if (d.blobAlpha <= 0) {
            d.x = lc.width * 0.3 + Math.random() * lc.width * 0.4;
            d.y = -Math.random() * 150; d.blob = false; d.blobR = 0; d.blobAlpha = 1; d.tail = [];
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── PROGRESS TIMER ───
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

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 55%,#1a0000 0%,#0a0000 40%,#000 100%)' }}>

      {/* Ground lava glow */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none ground-glow" />

      {/* Heat haze */}
      <div className="absolute inset-0 pointer-events-none heat-haze" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[5]"
        style={{ background: 'radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.7) 100%)' }} />

      {/* Particle canvas */}
      <canvas ref={particleCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Drip canvas */}
      <canvas ref={dripCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[3]" />

      {/* Core scene */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="core-wrap relative flex items-center justify-center"
          style={{ width: 'clamp(160px,30vw,240px)', height: 'clamp(160px,30vw,240px)' }}>

          {/* Shockwaves */}
          <div className="shock absolute rounded-full" />
          <div className="shock absolute rounded-full" style={{ animationDelay: '.65s' }} />
          <div className="shock absolute rounded-full" style={{ animationDelay: '1.3s' }} />

          {/* Plasma rings */}
          <div className="ring r1 absolute rounded-full" style={{ inset: 0 }} />
          <div className="ring r2 absolute rounded-full" style={{ inset: '12px' }} />
          <div className="ring r3 absolute rounded-full" style={{ inset: '24px' }} />
          <div className="ring r4 absolute rounded-full" style={{ inset: '36px' }} />

          {/* Orbit dots */}
          <div className="odot od1 absolute rounded-full" style={{ inset: 0 }} />
          <div className="odot od2 absolute rounded-full" style={{ inset: '12px' }} />
          <div className="odot od3 absolute rounded-full" style={{ inset: '24px' }} />

          {/* Magma core */}
          <div className="core relative z-10 flex items-center justify-center rounded-full"
            style={{ width: 'clamp(80px,16vw,120px)', height: 'clamp(80px,16vw,120px)' }}>
            <svg className="icon" viewBox="0 0 24 24" fill="white"
              style={{ width: 'clamp(28px,5vw,38px)', height: 'clamp(28px,5vw,38px)' }}>
              <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mt-4">
          <div className="magma-title" style={{ fontSize: 'clamp(1.6rem,5.5vw,2.8rem)', letterSpacing: '.4em' }}>
            Magma&nbsp;Flow
          </div>
          <div className="flex items-center gap-3 justify-center mt-2">
            <span className="sline-l h-px" style={{ width: 'clamp(40px,8vw,80px)' }} />
            <span className="sub-text" style={{ fontSize: 'clamp(.5rem,.85vw,.65rem)' }}>{msg}</span>
            <span className="sline-r h-px" style={{ width: 'clamp(40px,8vw,80px)' }} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5" style={{ width: 'clamp(260px,82vw,400px)' }}>
          <div className="flex justify-between mb-2" style={{ fontFamily: "'Courier New',monospace", fontSize: 'clamp(.5rem,.8vw,.62rem)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
            <span style={{ color: 'rgba(255,120,40,.8)' }}>Core Ignition</span>
            <span className="pct-text" style={{ fontSize: 'clamp(.65rem,1.3vw,.85rem)' }}>{progress}%</span>
          </div>
          <div className="track-bar rounded-full relative overflow-visible" style={{ height: '6px', background: 'rgba(255,255,255,.06)' }}>
            <div className="fill-bar rounded-full relative" style={{ height: '100%', width: `${progress}%`, transition: 'width .08s linear' }}>
              <div className="fill-tip absolute rounded-full" style={{ right: '-5px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px' }} />
            </div>
            <div className="lava-shine absolute top-0 rounded-full" style={{ height: '100%', width: '60px' }} />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center gap-1 mt-4" style={{ fontFamily: "'Courier New',monospace" }}>
          <div style={{ fontSize: 'clamp(.46rem,.8vw,.58rem)', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,120,60,.6)' }}>
            Thermal Systems — <span style={{ color: 'rgba(255,200,80,.85)' }}>Critical</span>
          </div>
          <div style={{ fontSize: 'clamp(.46rem,.8vw,.58rem)', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,120,60,.6)' }}>
            Melt Sequence: <span style={{ color: 'rgba(255,120,40,.95)', fontWeight: 'bold' }}>{`0:${pad(timeLeft)} / 0:${pad(TOTAL_SECONDS)}`}</span>
          </div>
          <div className="scan-wrap mt-1" style={{ width: 'clamp(140px,40vw,220px)', height: '1px', background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
            <div className="scan-bar" style={{ height: '100%' }} />
          </div>
        </div>
      </div>

      {/* CRT overlay */}
      <div className="absolute inset-0 pointer-events-none z-[60] crt-overlay" />

      <style jsx>{`
        .ground-glow {
          height: 35%; background: linear-gradient(to top,rgba(255,40,0,.25),rgba(255,80,0,.08),transparent);
          filter: blur(20px); animation: glow 3s ease-in-out infinite alternate;
        }
        @keyframes glow { 0%{opacity:.6} 100%{opacity:1} }

        .heat-haze {
          background: radial-gradient(ellipse at 50% 70%,rgba(255,60,0,.1),transparent 60%);
          animation: haze 4s ease-in-out infinite alternate;
        }
        @keyframes haze { 0%{transform:scaleY(1);opacity:.5} 100%{transform:scaleY(1.08);opacity:1} }

        .shock {
          border: 2px solid rgba(255,60,0,.7);
          animation: shockwave 2s ease-out infinite;
        }
        @keyframes shockwave {
          0%{width:80px;height:80px;opacity:.9;border-color:rgba(255,80,0,.8)}
          100%{width:400px;height:400px;opacity:0;border-color:rgba(255,20,0,0)}
        }

        .ring { border: 1.5px solid transparent; }
        .r1 { border-top-color:#ff2200; border-right-color:rgba(255,80,0,.4); animation:cw 2.5s linear infinite; box-shadow:0 0 20px rgba(255,30,0,.4); }
        .r2 { border-bottom-color:#ff6600; border-left-color:rgba(255,150,0,.5); animation:ccw 3.5s linear infinite; }
        .r3 { border-top-color:rgba(255,180,0,.7); border-right-color:rgba(255,80,0,.3); animation:cw 5s linear infinite; }
        .r4 { border-bottom-color:rgba(255,100,50,.5); animation:ccw 7s linear infinite; }
        @keyframes cw { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes ccw { from{transform:rotate(360deg)} to{transform:rotate(0)} }

        .odot { animation: cw linear infinite; }
        .odot::after { content:''; position:absolute; border-radius:50%; background:currentColor; box-shadow:0 0 8px currentColor,0 0 16px currentColor,0 0 30px currentColor; }
        .od1 { animation-duration:2.5s; } .od1::after { width:10px;height:10px;top:-5px;left:calc(50% - 5px);color:#ff2200; }
        .od2 { animation:ccw 3.5s linear infinite; } .od2::after { width:8px;height:8px;bottom:-4px;left:calc(50% - 4px);color:#ff8800; }
        .od3 { animation-duration:5s; } .od3::after { width:7px;height:7px;top:50%;right:-3.5px;transform:translateY(-50%);color:#ffcc00; }

        .core {
          background: radial-gradient(circle at 35% 32%,#fffbe0 0%,#ffdd00 15%,#ff6600 35%,#dd1100 60%,#6a0000 85%,#1a0000 100%);
          box-shadow: 0 0 0 3px rgba(255,80,0,.9),0 0 30px 10px rgba(255,60,0,.8),0 0 80px 30px rgba(255,30,0,.6),0 0 160px 60px rgba(180,0,0,.4),0 0 300px 100px rgba(100,0,0,.3),inset 0 0 30px rgba(255,200,0,.3);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100%{box-shadow:0 0 0 3px rgba(255,80,0,.9),0 0 30px 10px rgba(255,60,0,.8),0 0 80px 30px rgba(255,30,0,.6),0 0 160px 60px rgba(180,0,0,.4);transform:scale(1)}
          50%{box-shadow:0 0 0 6px rgba(255,150,0,1),0 0 60px 20px rgba(255,100,0,1),0 0 140px 50px rgba(255,50,0,.8),0 0 280px 100px rgba(200,0,0,.6);transform:scale(1.05)}
        }

        .icon { animation: hb 2s ease-in-out infinite; filter: drop-shadow(0 0 12px rgba(255,255,255,.95)); }
        @keyframes hb { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }

        .magma-title {
          font-variant: small-caps; font-family:'Palatino Linotype',Palatino,serif;
          background: linear-gradient(135deg,#fff5e0 0%,#ffdd00 25%,#ff6600 55%,#cc1100 80%,#ff4400 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 30px rgba(255,100,0,.9));
          animation: tfire 3s ease-in-out infinite;
        }
        @keyframes tfire {
          0%,100%{filter:drop-shadow(0 0 15px rgba(255,80,0,.7))}
          50%{filter:drop-shadow(0 0 45px rgba(255,180,0,1))}
        }

        .sline-l { background: linear-gradient(to right,transparent,#ff4400); }
        .sline-r { background: linear-gradient(to left,transparent,#ff4400); }
        .sub-text { letter-spacing:.3em; text-transform:uppercase; color:rgba(255,160,80,.9); font-style:italic; font-family:'Courier New',monospace; }

        .pct-text {
          font-weight: bold;
          background: linear-gradient(90deg,#ffdd00,#ff4400);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .fill-bar {
          background: linear-gradient(90deg,#ffdd00,#ff6600,#ff2200,#cc0000);
          box-shadow: 0 0 15px rgba(255,100,0,1),0 0 35px rgba(255,50,0,.7);
        }
        .fill-tip {
          background: radial-gradient(circle at 35% 35%,#fffbe0,#ff6600);
          box-shadow: 0 0 12px 4px rgba(255,150,0,1),0 0 30px rgba(255,80,0,.8);
        }
        .lava-shine {
          background: linear-gradient(90deg,transparent,rgba(255,200,100,.6),transparent);
          animation: ldrip 2s ease-in-out infinite;
        }
        @keyframes ldrip { 0%{left:-60px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{left:100%;opacity:0} }

        .scan-bar {
          background: linear-gradient(90deg,transparent,#ff6600,#ffdd00,#ff6600,transparent);
          animation: scan 2s linear infinite;
        }
        @keyframes scan { from{transform:translateX(-100%)} to{transform:translateX(200%)} }

        .crt-overlay {
          background: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.05) 3px,rgba(0,0,0,.05) 4px);
        }
      `}</style>
    </div>
  );
};

export default MagmaFlowLoader;