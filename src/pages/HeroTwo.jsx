import React, { useState, useEffect } from 'react';
import HomeTwoLoader from '../components/HomeTwoLoader';
import HomeheroTwo from '../components/HomeheroTwo';
import DestinyBoard from '../components/DestinyBoard';

const HeroTwo = () => {
  const [loading, setLoading] = useState(true);
  
  // 1. Shared State: Ye score dono components mein use hoga
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <HomeTwoLoader />
      ) : (
        /* 
           Responsive Container:
           - Mobile par vertical (col), Laptop par horizontal (row)
           - min-h-screen taake content pura cover kare
           - py-10 mobile par upar neechay space dega taake components chipkay nahi
        */
        <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row items-center justify-center px-4 py-10 lg:p-8 gap-8 lg:gap-12 overflow-x-hidden">
          
          {/* Left Side: HomeheroTwo */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
             <HomeheroTwo totalScore={totalScore} setTotalScore={setTotalScore} />
          </div>

          {/* Right Side: DestinyBoard */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
             <DestinyBoard totalScore={totalScore} setTotalScore={setTotalScore} />
          </div>

        </div>
      )}
    </>
  );
};

export default HeroTwo;