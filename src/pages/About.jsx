import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";

// Components import
import AboutHero from "../components/AboutHero";
import MyStory from "../components/MyStory";
import SkillsGalaxy from "../components/SkillsGalaxy";
import FinalCTA from "../components/FinalCTA";
import AboutLoader from "../components/AboutLoader";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 5 seconds ka timer set kiya
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Cleanup function taake memory leaks na hon
    return () => clearTimeout(timer);
  }, []);

  // Agar loading true hai to loader dikhao, warna main content
  if (loading) {
    return <AboutLoader />;
  }

  return (
    <ThemeProvider>
      {/* Humne padding hata di hai taake transparent navbar ke peeche background sahi se flow kare */}
      <div className="animate-in fade-in duration-700">
        <AboutHero />
        <MyStory />
        <SkillsGalaxy />
        <FinalCTA />
      </div>
    </ThemeProvider>
  );
};

export default About;