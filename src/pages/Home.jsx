import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext'; // 👈 ThemeProvider import karo
import HomeLoader from '../components/HomeLoader';
import HomeheroOne from '../components/HomeheroOne';
import AnimationOne from '../components/AnimationOne';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);
    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <HomeLoader />;
  }

  return (
    // 👇 Poori Home page ko ThemeProvider se wrap kar diya
    <ThemeProvider>
      <main className="min-h-screen bg-[#050505] relative overflow-hidden w-full">
        
        {/* Layer 1: Background Animation (Sab se peeche) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimationOne />
        </div>

        {/* Layer 2: Main Content (Upar) */}
        <div className="relative z-10 w-full h-screen flex items-center justify-center">
          {/* Step logic: Jab click karein gi to agla page show hoga */}
          {currentStep === 1 && (
            <div className="animate-in fade-in zoom-in duration-1000 w-full">
              <HomeheroOne onNext={() => setCurrentStep(2)} />
            </div>
          )}

          {/* Agle pages ke liye jagah */}
          {currentStep === 2 && (
            <div className="text-white">Page 2 Content Ayega Yahan...</div>
          )}
        </div>

      </main>
    </ThemeProvider>
  );
};

export default Home;