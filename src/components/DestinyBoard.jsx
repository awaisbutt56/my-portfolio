import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, Heart, Star, LockKeyhole, Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cards = [
  { 
    id: 1, 
    title: "Heart Starter 💖", 
    price: 50, 
    color: "from-pink-400 to-rose-500", 
    route: "/neon-pulse",
    subtitle: "Starter Card",
    desc: "This is just the beginning… A small piece of my attention is now yours ❤️",
    icon: <Heart size={28} />
  },
  { 
    id: 2, 
    title: "Memory Booster 💫", 
    price: 75, 
    color: "from-purple-500 to-indigo-600", 
    route: "/magma-flow",
    subtitle: "Hidden Spark 💖",
    desc: "You’re getting closer… Now I’m starting to notice your efforts 😍❤️",
    icon: <Star size={28} />
  },
  { 
    id: 3, 
    title: "Emotional Lock 🔐", 
    price: 100, 
    color: "from-blue-600 to-cyan-500", 
    route: "/star-dust",
    subtitle: "Heart Sync 💫",
    desc: "Not everyone reaches here… You’re becoming important in ways you don’t even realize ❤️",
    icon: <LockKeyhole size={28} />
  },
  { 
    id: 4, 
    title: "VIP Heart Access ❤️", 
    price: 120, 
    color: "from-yellow-500 to-orange-600", 
    route: "/zenith-node",
    subtitle: "“Heart of Destiny 💎",
    desc: "You didn’t just unlock a card… You unlocked a special place in my 💖",
    icon: <Crown size={28} />
  },
];

const DestinyBoard = ({ totalScore, setTotalScore }) => {
  const [unlockedCards, setUnlockedCards] = useState(() => {
    const saved = localStorage.getItem('unlockedNodes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('unlockedNodes', JSON.stringify(unlockedCards));
  }, [unlockedCards]);

  const handleUnlock = (card) => {
    if (!unlockedCards.includes(card.id) && totalScore >= card.price) {
      setTotalScore(prev => prev - card.price);
      setUnlockedCards(prev => [...prev, card.id]);
    }
  };

  return (
    <div className="relative p-3 md:p-6 w-full max-w-xl mx-auto bg-black/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-700">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-1">
        <div className="relative">

  {/* small label */}
  <h2 className="text-[9px] sm:text-xs font-semibold 
  bg-gradient-to-r from-rose-400 to-pink-500 
  bg-clip-text text-transparent 
  tracking-[0.25em] uppercase mb-1">
    Emotion Vault
  </h2>

  {/* main title */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black italic 
  bg-gradient-to-r from-white via-gray-200 to-gray-400 
  bg-clip-text text-transparent 
  tracking-tight">
    DESTINY BOARD
  </h1>

  {/* subtle underline */}
  <div className="mt-1 h-[2px] w-14 sm:w-20 bg-gradient-to-r from-rose-500 to-pink-400 rounded-full"></div>

</div>
        <div className="text-right">
          <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Available EP</span>
          <div className="flex items-center justify-end gap-1 md:gap-2">
            <Zap size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" />
            <p className="text-xl md:text-3xl font-black text-white italic leading-none">{totalScore}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {cards.map((card) => {
          const isPurchased = unlockedCards.includes(card.id);
          const canAfford = totalScore >= card.price;

          return (
            <motion.div
              key={card.id}
              layout
              className={`
                relative overflow-hidden rounded-2xl border transition-all duration-500
                ${isPurchased 
                  ? `bg-gradient-to-r ${card.color} border-white/30 p-4 md:p-5 shadow-lg` 
                  : 'bg-white/5 border-white/10 p-3 md:p-4'
                }
                ${!isPurchased && !canAfford && 'opacity-40 grayscale'}
              `}
            >
              <div className="flex justify-between items-center gap-3">
                <div className="z-10 flex-1 min-w-0"> {/* min-w-0 stops text overflow */}
                  <div className="flex items-center gap-2 md:gap-3 mb-1">
                    <div className={`${isPurchased ? "text-white" : "text-gray-600"} flex-shrink-0`}>
                      {isPurchased ? card.icon : <Lock size={18} />}
                    </div>
                    <h3 className={`text-sm md:text-lg font-bold truncate ${isPurchased ? "text-white" : "text-gray-400"}`}>
                      {card.title}
                    </h3>
                  </div>

                  <p className={`text-[9px] md:text-[10px] uppercase font-black tracking-widest mb-1 ${isPurchased ? "text-white/70" : "text-gray-500"}`}>
                    {card.subtitle} — {card.price} EP
                  </p>

                  <AnimatePresence>
                    {isPurchased && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pr-2"
                      >
                        <p className="text-[11px] md:text-sm text-white font-medium italic leading-tight md:leading-relaxed">
                          "{card.desc}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Action Section */}
                <div className="z-20 flex-shrink-0">
                  {!isPurchased ? (
                    <button
                      onClick={() => handleUnlock(card)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-tighter transition-all
                        ${canAfford 
                          ? "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/30" 
                          : "bg-white/5 text-gray-600 border border-white/10"
                        }`}
                    >
                      Unlock
                    </button>
                  ) : (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ x: 5 }}
                      onClick={() => navigate(card.route)}
                      className="p-2 md:p-3 rounded-full bg-white text-black shadow-xl flex items-center justify-center"
                    >
                      <ArrowRight size={18} md:size={24} strokeWidth={3} />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {!isPurchased && (
                <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                  <motion.div 
                    className="h-full bg-rose-500" 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((totalScore / card.price) * 100, 100)}%` }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <p className="text-[8px] md:text-[9px] text-center mt-6 text-gray-600 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
        Synchronization Status: {unlockedCards.length} / {cards.length} Core Memories Found
      </p>
    </div>
  );
};

export default DestinyBoard;