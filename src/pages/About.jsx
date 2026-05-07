// src/pages/About.js
import React from "react";
import { ThemeProvider } from "../contexts/ThemeContext";

// Components import
import AboutHero from "../components/AboutHero";
import MyStory from "../components/MyStory";
import SkillsGalaxy from "../components/SkillsGalaxy";
import FinalCTA from "../components/FinalCTA";

const About = () => {
  return (
    <ThemeProvider>
      <AboutHero />
      <MyStory />
      <SkillsGalaxy />
      <FinalCTA />
    </ThemeProvider>
  );
};

export default About;