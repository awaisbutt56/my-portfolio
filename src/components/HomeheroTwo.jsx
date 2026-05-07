import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Zap, Heart, Trophy, Skull, Sparkles } from 'lucide-react';

const DiceFace = ({ value }) => {
  const dots = {
    1: [<circle key="1" cx="50" cy="50" r="10" fill="currentColor" />],
    2: [<circle key="1" cx="25" cy="25" r="10" fill="currentColor" />, <circle key="2" cx="75" cy="75" r="10" fill="currentColor" />],
    3: [<circle key="1" cx="25" cy="25" r="10" fill="currentColor" />, <circle key="2" cx="50" cy="50" r="10" fill="currentColor" />, <circle key="3" cx="75" cy="75" r="10" fill="currentColor" />],
    4: [<circle key="1" cx="25" cy="25" r="10" fill="currentColor" />, <circle key="2" cx="75" cy="25" r="10" fill="currentColor" />, <circle key="3" cx="25" cy="75" r="10" fill="currentColor" />, <circle key="4" cx="75" cy="75" r="10" fill="currentColor" />],
    5: [<circle key="1" cx="25" cy="25" r="10" fill="currentColor" />, <circle key="2" cx="75" cy="25" r="10" fill="currentColor" />, <circle key="3" cx="50" cy="50" r="10" fill="currentColor" />, <circle key="4" cx="25" cy="75" r="10" fill="currentColor" />, <circle key="5" cx="75" cy="75" r="10" fill="currentColor" />],
    6: [<circle key="1" cx="25" cy="25" r="10" fill="currentColor" />, <circle key="2" cx="75" cy="25" r="10" fill="currentColor" />, <circle key="3" cx="25" cy="50" r="10" fill="currentColor" />, <circle key="4" cx="75" cy="50" r="10" fill="currentColor" />, <circle key="5" cx="25" cy="75" r="10" fill="currentColor" />, <circle key="6" cx="75" cy="75" r="10" fill="currentColor" />],
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-4 text-white">
      <rect width="100" height="100" rx="20" fill="none" />
      {dots[value]}
    </svg>
  );
};

const HomeheroTwo = ({ totalScore, setTotalScore }) => {
  const [lives, setLives] = useState(3);
  const [rollHistory, setRollHistory] = useState([]);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [msg, setMsg] = useState("🎲 Roll to begin your destiny");
  const [stage, setStage] = useState('play');
  const [bgIndex, setBgIndex] = useState(0);

  // Premium stunning backgrounds
  const premiumBg = [
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format",
    "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=2069&auto=format",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % premiumBg.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleFullRestart = () => {
    setLives(3);
    setTotalScore(0);
    setRollHistory([]);
    setDiceValue(1);
    setMsg("✨ System Rebooted ✨");
    setStage('play');
  };

  const rollDice = () => {
    if (isRolling || lives <= 0) return;
    setIsRolling(true);
    setMsg("🌀 Destiny is deciding...");

    setTimeout(() => {
      const res = Math.floor(Math.random() * 6) + 1;
      setDiceValue(res);
      setTotalScore(prev => prev + res);
      setRollHistory(prev => [...prev, res]);

      if (res === 1) {
        setLives(prev => prev - 1);
        setMsg("💔 Critical Hit! Life -1");
      } 
      else if (res === 6) {
        const lastRoll = rollHistory[rollHistory.length - 1];
        if (lastRoll === 6) {
          setLives(prev => prev + 1);
          setMsg("👑 Legendary! Life +1");
        } else {
          setMsg("⚡ One more 6 for a miracle!");
        }
      } 
      else {
        const epicMessages = [
          `🎲 ${res}! Destiny smiles upon you`,
          `✨ ${res}! The journey continues`,
          `💫 ${res} points earned!`,
          `🔥 ${res}! Keep going strong`
        ];
        setMsg(epicMessages[Math.floor(Math.random() * epicMessages.length)]);
      }
      setIsRolling(false);
    }, 600);
  };

  useEffect(() => {
    if (lives <= 0) setStage('lose');
  }, [lives]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* Premium Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${premiumBg[bgIndex]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-4 py-6 min-h-screen flex flex-col">
        
        {/* Premium Glass Card HUD */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 mb-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-[9px] text-rose-400 font-black tracking-wider flex items-center gap-1">
                <Heart size={12} className="text-rose-400" /> HEARTS
              </p>
              <div className="flex gap-2">
                {[...Array(Math.max(lives, 0))].map((_, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }} 
                    className="text-2xl"
                  >❤️</motion.span>
                ))}
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[9px] text-yellow-400 font-black tracking-wider flex items-center justify-end gap-1">
                <Zap size={12} className="text-yellow-400" /> ENERGY
              </p>
              <motion.p 
                key={totalScore}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-yellow-400"
              >
                {totalScore}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <AnimatePresence mode="wait">
          {stage === 'play' && (
            <motion.div 
              key="play" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col justify-center"
            >
              {/* Dice - Clean & Simple */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-rose-600 to-rose-900 rounded-2xl shadow-2xl border border-white/20">
                    <DiceFace value={diceValue} />
                  </div>
                </div>
              </div>

              {/* Message Badge */}
              <div className="min-h-[70px] mb-6 text-center">
                <div className={`inline-block px-6 py-2 rounded-full backdrop-blur-sm text-sm md:text-base font-medium
                  ${msg.includes('Life -1') ? 'bg-red-500/20 text-red-400' : 
                    msg.includes('Life +1') ? 'bg-green-500/20 text-green-400' : 
                    'bg-white/10 text-white'}`}>
                  {msg}
                </div>
              </div>

              {/* Premium Roll Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={rollDice}
                  disabled={isRolling}
                  className={`
                    relative px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all
                    overflow-hidden
                    ${isRolling 
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-rose-500 to-rose-700 text-white hover:shadow-2xl hover:shadow-rose-500/50 active:scale-95"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {isRolling ? (
                      <>
                        <Sparkles size={16} className="animate-spin" />
                        Rolling...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Roll Dice
                        <Sparkles size={16} />
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* History Section */}
              {rollHistory.length > 0 && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-[8px] uppercase text-center text-gray-400 tracking-wider mb-3">
                    🔮 RECENT DESTINY ROLLS 🔮
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {rollHistory.slice(-10).map((num, i) => (
                      <motion.span 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className={`
                          w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-md
                          ${num === 1 ? 'bg-red-500/30 text-red-400 border border-red-500/30' : 
                            num === 6 ? 'bg-yellow-500/30 text-yellow-400 border border-yellow-500/30' : 
                            'bg-white/10 text-white border border-white/10'}
                        `}
                      >
                        {num}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Restart Button */}
              {rollHistory.length > 0 && (
                <div className="flex justify-center mt-5">
                  <button 
                    onClick={handleFullRestart}
                    className="text-[8px] text-gray-500 hover:text-rose-400 uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw size={10} /> RESTART JOURNEY
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Lose State - Premium */}
          {stage === 'lose' && (
            <motion.div 
              key="lose"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center"
            >
              <Trophy size={50} className="text-gray-500 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-black text-gray-500 mb-2">Journey Complete</h1>
              <p className="text-2xl font-bold text-rose-400 mb-6">Score: {totalScore}</p>
              <button
                onClick={handleFullRestart}
                className="px-6 py-3 text-xs font-bold uppercase rounded-full bg-gradient-to-r from-rose-500 to-rose-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Begin New Journey
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[6px] tracking-[0.3em] font-mono text-gray-600">
            ✨ DESTINY WEAVER • FATE SEALER • ETERNAL JOURNEY ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeheroTwo;