import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Sparkles } from 'lucide-react'
import ZenithNodeLoader from '../components/ZenithNodeLoader'
import firstCardImg from '../assets/images/dpfirstcard.jpeg';

// ─── Script Lines ─────────────────────────────────────────────────────────────
const SCRIPT_LINES = [
  { text: 'So…',                                          delay: 0,     size: 'sm',   color: 'muted'  },
  { text: 'you made it.',                                 delay: 1400,  size: 'lg',   color: 'white'  },
  { text: 'All the way to the end.',                      delay: 3200,  size: 'xl',   color: 'white'  },
  { text: 'It wasn\'t easy…',                             delay: 5400,  size: 'md',   color: 'muted'  },
  { text: 'and it wasn\'t supposed to be.',               delay: 7000,  size: 'md',   color: 'muted'  },
  { text: 'You rolled… you lost… you tried again…',       delay: 9000,  size: 'md',   color: 'soft'   },
  { text: 'and still… you stayed.',                       delay: 11200, size: 'lg',   color: 'purple' },
  { text: 'At some point…',                               delay: 13400, size: 'sm',   color: 'muted'  },
  { text: 'this stopped being just a game.',              delay: 14800, size: 'xl',   color: 'white'  },
  { text: 'Because effort like this…',                    delay: 17000, size: 'sm',   color: 'muted'  },
  { text: 'is never just about winning.',                 delay: 18400, size: 'lg',   color: 'purple' },
  { text: 'It\'s about…',                                 delay: 20600, size: 'sm',   color: 'muted'  },
  { text: 'who you choose to stay for.',                  delay: 22000, size: 'xl',   color: 'white'  },
  { text: 'And you stayed…',                              delay: 24400, size: 'md',   color: 'soft'   },
  { text: 'till the end.',                                delay: 26000, size: 'hero', color: 'gold'   },
  { text: 'So here it is…',                               delay: 28800, size: 'sm',   color: 'muted'  },
  { text: 'Out of everything in this world…',             delay: 30400, size: 'md',   color: 'soft'   },
  { text: 'you became my favorite notification ❤️',       delay: 32400, size: 'xl',   color: 'heart'  },
  { text: 'Not because you won…',                         delay: 35000, size: 'sm',   color: 'muted'  },
  { text: 'but because you didn\'t leave.',               delay: 36600, size: 'lg',   color: 'white'  },
  { text: 'And honestly…',                                delay: 38800, size: 'sm',   color: 'muted'  },
  { text: 'that means more than you think.',              delay: 40200, size: 'md',   color: 'soft'   },
  { text: 'So tell me…',                                  delay: 42400, size: 'sm',   color: 'muted'  },
  { text: 'Was it just a game for you…',                  delay: 43800, size: 'lg',   color: 'white'  },
  { text: 'or did it mean something too?',                delay: 45800, size: 'lg',   color: 'purple' },
]

const FLOAT_WORDS = ['try', 'stay', 'again', 'closer', 'effort', 'you', 'hold', 'here', 'still', 'remain']

const SIZE_MAP = {
  sm:   'text-lg md:text-xl',
  md:   'text-2xl md:text-3xl',
  lg:   'text-3xl md:text-4xl',
  xl:   'text-4xl md:text-5xl',
  hero: 'text-5xl md:text-6xl lg:text-7xl',
}

// ─── Beautiful Backgrounds for Dark & Light Mode ─────────────────────────────
const darkBackgrounds = [
  "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013&auto=format",
  "https://images.unsplash.com/photo-1506703719100-f0b3c0c7a1c4?q=80&w=2070&auto=format",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format"
]

const lightBackgrounds = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format",
  "https://images.unsplash.com/photo-1441974231531-c622288db85a?q=80&w=2071&auto=format",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format"
]

// ─── Particle Field ───────────────────────────────────────────────────────────
const ParticleField = ({ count = 40, theme = 'dark' }) => {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      dur: 4 + Math.random() * 8,
      delay: Math.random() * 6,
    }))
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map(p => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-purple-400/20' : 'bg-pink-300/30'}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -30, -60] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Cinematic Script Phase ───────────────────────────────────────────────────
const CinematicScript = ({ onComplete, theme, toggleTheme }) => {
  const [visibleLines, setVisibleLines] = useState([])
  const [showChoices, setShowChoices]   = useState(false)
  const [bgIndex, setBgIndex] = useState(0)

  const backgrounds = theme === 'dark' ? darkBackgrounds : lightBackgrounds

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgrounds.length)
    }, 6000)
    return () => clearInterval(bgInterval)
  }, [theme])

  useEffect(() => {
    const timers = SCRIPT_LINES.map(line =>
      setTimeout(() => setVisibleLines(prev => [...prev, line]), line.delay)
    )
    const choiceTimer = setTimeout(() => setShowChoices(true), 48000)
    return () => { timers.forEach(clearTimeout); clearTimeout(choiceTimer) }
  }, [])

  const getColorClass = (color) => {
    const colors = {
      muted: theme === 'dark' ? 'text-gray-500' : 'text-gray-500',
      white: theme === 'dark' ? 'text-white' : 'text-gray-800',
      soft: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      purple: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      gold: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
      heart: theme === 'dark' ? 'text-pink-400' : 'text-pink-600',
    }
    return colors[color] || colors.muted
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      
      {/* Premium Background with auto-change */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: theme === 'dark' ? 0.7 : 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
          />
        </AnimatePresence>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-black/90 via-black/70 to-black/90' : 'from-white/80 via-white/50 to-white/80'}`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-purple-900/30 via-transparent to-transparent' : 'from-pink-200/30 via-transparent to-transparent'}`} />
      </div>

      <ParticleField theme={theme} />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 4px)' }}
      />

      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-5 right-5 z-50 rounded-full p-2.5 backdrop-blur-xl border shadow-2xl
          ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'}`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-700" />}
      </motion.button>

      {/* Script Content */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col gap-5 text-center">
        <AnimatePresence>
          {visibleLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`font-light leading-snug tracking-wide ${SIZE_MAP[line.size]} ${getColorClass(line.color)} ${line.size === 'hero' ? 'font-black italic' : ''}`}
            >
              {line.text}
            </motion.p>
          ))}
        </AnimatePresence>

        {/* Choice Buttons */}
        <AnimatePresence>
          {showChoices && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236,72,153,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold transition-all
                  ${theme === 'dark' 
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40 text-pink-400'
                    : 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 text-pink-600'}`}
              >
                Answer Me 💖
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all
                  ${theme === 'dark' 
                    ? 'text-gray-500 border border-white/10 bg-white/5 hover:border-purple-500/30 hover:text-purple-400'
                    : 'text-gray-600 border border-black/10 bg-black/5 hover:border-purple-500/50 hover:text-purple-600'}`}
              >
                Stay or Leave
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── The Game ─────────────────────────────────────────────────────────────────
const TheGame = ({ theme, toggleTheme }) => {
  const [phase, setPhase]               = useState(1)
  const [cursorHidden, setCursorHidden] = useState(false)
  const [blur, setBlur]                 = useState(false)
  const [btnMsg, setBtnMsg]             = useState('')
  const [holdProgress, setHoldProgress] = useState(0)
  const [holding, setHolding]           = useState(false)
  const [holdDone, setHoldDone]         = useState(false)
  const [finalChoice, setFinalChoice]   = useState(null)
  const [bgIndex, setBgIndex] = useState(0)
  const [words, setWords]               = useState(() =>
    FLOAT_WORDS.map((text, id) => ({
      id, text,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      hovered: false,
    }))
  )
  const holdRef  = useRef(null)
  const progRef  = useRef(0)

  const backgrounds = theme === 'dark' ? darkBackgrounds : lightBackgrounds

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgrounds.length)
    }, 6000)
    return () => clearInterval(bgInterval)
  }, [theme])

  // Phase 1 — control break
  useEffect(() => {
    if (phase !== 1) return
    const t1 = setTimeout(() => { setCursorHidden(true); setBlur(true) }, 2200)
    const t2 = setTimeout(() => { setCursorHidden(false); setBlur(false); setPhase(2) }, 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase])

  // Phase 3 → 4 auto
  useEffect(() => {
    if (phase !== 3) return
    const t = setTimeout(() => setPhase(4), 4200)
    return () => clearTimeout(t)
  }, [phase])

  // Phase 4 → 5 auto
  useEffect(() => {
    if (phase !== 4) return
    const t = setTimeout(() => setPhase(5), 6000)
    return () => clearTimeout(t)
  }, [phase])

  const handleFakeBtn = () => {
    setBtnMsg('Strange… none of them let you go.')
    setTimeout(() => { setBtnMsg(''); setPhase(3) }, 2000)
  }

  const startHold = () => {
    if (holdDone) return
    setHolding(true)
    progRef.current = 0
    holdRef.current = setInterval(() => {
      progRef.current += 2
      setHoldProgress(progRef.current)
      if (progRef.current >= 100) {
        clearInterval(holdRef.current)
        setHolding(false)
        setHoldDone(true)
        setPhase(6)
      }
    }, 60)
  }

  const stopHold = () => {
    if (holdDone) return
    clearInterval(holdRef.current)
    setHolding(false)
    progRef.current = 0
    setHoldProgress(0)
  }

  const hoverWord = (id, on) =>
    setWords(prev => prev.map(w => w.id === id ? { ...w, hovered: on } : w))

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ cursor: cursorHidden ? 'none' : 'default' }}
    >
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: theme === 'dark' ? 0.7 : 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
          />
        </AnimatePresence>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-black/95 via-black/80 to-black/95' : 'from-white/90 via-white/60 to-white/90'}`} />
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 4px)' }}
      />

      <ParticleField count={25} theme={theme} />

      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-5 right-5 z-50 rounded-full p-2.5 backdrop-blur-xl border shadow-2xl
          ${theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'}`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-purple-700" />}
      </motion.button>

      {/* Shimmer top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence mode="wait">

        {/* ── Phase 1 ── */}
        {phase === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0 }}
            animate={{ opacity: blur ? 0.25 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-8 text-center px-8"
          >
            <p className={`text-2xl md:text-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-light`}>You've come far…</p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`text-3xl md:text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-light`}
            >
              but the final step was never about the game.
            </motion.p>
          </motion.div>
        )}

        {/* ── Phase 2 ── */}
        {phase === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-8 md:gap-12 text-center px-4 sm:px-6 md:px-8"
          >
            <div className="space-y-3 md:space-y-4 max-w-xl">
              <p className={`text-lg sm:text-2xl md:text-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-light`}>What if…</p>
              <p className={`text-xl sm:text-3xl md:text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-light leading-snug break-words`}>
                you were never really in control?
              </p>
            </div>

            {!btnMsg ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 sm:gap-4"
              >
                {['Leave', 'Restart', 'Stay'].map(label => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleFakeBtn}
                    className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-mono tracking-[0.15em] uppercase transition-all
                      ${theme === 'dark' 
                        ? 'text-gray-300 border border-white/10 bg-white/5 hover:border-purple-500/30 hover:text-purple-400'
                        : 'text-gray-600 border border-black/10 bg-black/5 hover:border-purple-500/50 hover:text-purple-600'}`}
                  >
                    {label}
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} font-mono text-xs sm:text-sm tracking-widest italic px-2`}
              >
                {btnMsg}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ── Phase 3 ── */}
        {phase === 3 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-8 text-center px-8"
          >
            <p className={`text-2xl ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} font-light`}>Because the truth is…</p>
            <motion.p
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className={`text-5xl md:text-6xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-800'} italic`}
            >
              …you already made your choice.
            </motion.p>
          </motion.div>
        )}

        {/* ── Phase 4 ── */}
        {phase === 4 && (
          <motion.div
            key="p4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full h-screen"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} font-light mb-3`}>Every move you made…</p>
              <p className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-700'} font-light`}>was leading you here.</p>
            </div>

            {words.map(w => (
              <motion.span
                key={w.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: w.hovered ? 1 : 0.22,
                  scale: w.hovered ? 1.35 : 1,
                  color: w.hovered ? '#c084fc' : (theme === 'dark' ? '#4b5563' : '#9ca3af'),
                }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => hoverWord(w.id, true)}
                onMouseLeave={() => hoverWord(w.id, false)}
                className="absolute font-mono text-sm tracking-[0.3em] uppercase cursor-default"
                style={{ left: `${w.x}%`, top: `${w.y}%` }}
              >
                {w.text}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* ── Phase 5 ── */}
        {phase === 5 && !holdDone && (
          <motion.div
            key="p5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center gap-12 text-center px-8"
          >
            <p className={`text-2xl md:text-3xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-light`}>
              There's only one thing left to do.
            </p>

            <div className="flex flex-col items-center gap-6">
              <motion.div
                onMouseDown={startHold}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={startHold}
                onTouchEnd={stopHold}
                className="relative w-32 h-32 flex items-center justify-center cursor-pointer"
                animate={{ scale: holding ? [1, 1.07, 1] : 1 }}
                transition={{ duration: 0.6, repeat: holding ? Infinity : 0 }}
              >
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle
                    cx="64" cy="64" r="58"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 58}`}
                    strokeDashoffset={`${2 * Math.PI * 58 * (1 - holdProgress / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.06s linear' }}
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-5xl z-10" style={{ filter: holding ? 'drop-shadow(0 0 24px rgba(236,72,153,0.85))' : 'none' }}>❤️</span>
              </motion.div>

              <p className={`text-sm font-mono tracking-[0.25em] ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} uppercase`}>
                {holding ? 'Don\'t let go…' : 'Hold it… and don\'t let go.'}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Phase 6 ── */}
        {phase === 6 && (
          <motion.div
            key="p6"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-10 text-center px-8 max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.4, 0], scale: [0, 3, 5] }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="absolute w-64 h-64 rounded-full bg-pink-500/20 blur-[70px] pointer-events-none"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-4xl md:text-5xl font-light ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
            >
              See…
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className={`text-5xl md:text-6xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-800'} italic`}
            >
              you didn't give up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              className="space-y-3"
            >
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-light`}>Not when it was hard…</p>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-light`}>not when it felt like nothing was happening…</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 5.5, duration: 1.2 }}
              className={`text-3xl md:text-4xl font-light ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}
            >
              You stayed…
              <br />
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>and that's all that ever mattered ❤️</span>
            </motion.p>

            {/* Final choice - Navigate to home page */}
            <AnimatePresence>
              {!finalChoice && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 7.5 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 mt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236,72,153,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setFinalChoice('stay');
                      setTimeout(() => { window.location.href = '/'; }, 4000);
                    }}
                    className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold transition-all
                      ${theme === 'dark' 
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40 text-pink-400'
                        : 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 text-pink-600'}`}
                  >
                    Stay 💖
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setFinalChoice('leave');
                      setTimeout(() => { window.location.href = '/'; }, 4000);
                    }}
                    className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-mono tracking-[0.2em] uppercase transition-all
                      ${theme === 'dark' 
                        ? 'text-gray-500 border border-white/10 bg-white/5 hover:border-gray-500/30'
                        : 'text-gray-600 border border-black/10 bg-black/5 hover:border-gray-500/50'}`}
                  >
                    Leave 💔
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final answer */}
            <AnimatePresence>
              {finalChoice && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="flex flex-col items-center gap-6 mt-4"
                >
                  <p className={`text-2xl md:text-3xl font-light ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    {finalChoice === 'stay' ? 'I was hoping you would. 🌙' : 'You still made it this far… 💫'}
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    style={{ background: theme === 'dark' ? 'rgba(2,2,4,0.94)' : 'rgba(255,255,255,0.94)' }}
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ delay: 2.5, duration: 6, times: [0, 0.2, 0.8, 1] }}
                      className={`text-xl md:text-2xl font-light tracking-widest text-center px-8 leading-loose ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      You could've stopped anytime…
                      <br />
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.5 }}
                        className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                      >
                        but you didn't.
                      </motion.span>
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </motion.div>
        )}

      </AnimatePresence>

      {/* Phase indicator */}
      {phase <= 5 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {[1, 2, 3, 4, 5].map(p => (
            <div
              key={p}
              className={`rounded-full transition-all duration-500 ${phase === p ? 'w-5 h-1.5 bg-purple-400' : 'w-1.5 h-1.5 bg-gray-700'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Logo Component ───────────────────────────────────────────────────────────
const Logo = ({ theme }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="fixed top-6 left-6 md:top-10 md:left-12 z-[100] flex items-center gap-3 pointer-events-auto cursor-pointer group"
  >
    {/* Main Container - Size increased */}
    <div className="relative group h-14 w-14 md:h-20 md:w-20 flex items-center justify-center overflow-hidden rounded-full p-[2px]">
      
      {/* Animated Rotating Border (The Magic Part) */}
      <div className={`absolute inset-0 rounded-full animate-spin-slow bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100`} />
      
      {/* Background Blur / Glow */}
      <div className={`absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 ${theme === 'dark' ? 'bg-cyan-500/40' : 'bg-pink-400/40'}`} />

      {/* Image Container */}
      <div className="relative z-10 w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
        <img 
          src={firstCardImg}
          alt="Zenith Logo"
          // object-cover aur w-full h-full se image perfectly fit ho jaye gi
          className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-125 filter group-hover:brightness-110"
        />
      </div>
    </div>
</motion.div>
)

// ─── Root Component ───────────────────────────────────────────────────────────
const ZenithNode = () => {
  const [loading, setLoading] = useState(true)
  const [stage, setStage]     = useState('script')
  const [theme, setTheme]     = useState('dark')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  if (loading) return <ZenithNodeLoader />

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-700 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      
      <Logo theme={theme} />

      <AnimatePresence mode="wait">
        {stage === 'script' && (
          <motion.div
            key="script"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1 }}
          >
            <CinematicScript onComplete={() => setStage('game')} theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        )}

        {stage === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <TheGame theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ZenithNode