import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar' // Navbar import karein
import Home from './pages/Home'
import HeroTwo from './pages/HeroTwo'
import HeroThree from './pages/HeroThree'
import HeroFour from './pages/HeroFour'
import HeroFive from './pages/HeroFive'
import About from './pages/About' 

import NeonPulse from './pages/NeonPulse' 
import MagmaFlow from './pages/MagmaFlow'
import StarDust from './pages/StarDust'
import ZenithNode from './pages/ZenithNode'
import Project from './pages/Project'

// Navbar logic handle karne ke liye alag component
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Logic: Sirf '/' path par Navbar dikhao */}
      {location.pathname === '/' && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/HeroTwo' element={<HeroTwo />} />
        <Route path='/HeroThree' element={<HeroThree />} />
        <Route path='/HeroFour' element={<HeroFour />} />
        <Route path='/HeroFive' element={<HeroFive />} />
        <Route path='/about' element={<About />} />
        <Route path='/project' element={<Project />} />

        {/* Naye 4 Cards ke Routes */}
        <Route path='/neon-pulse' element={<NeonPulse />} />
        <Route path='/magma-flow' element={<MagmaFlow />} />
        <Route path='/star-dust' element={<StarDust />} />
        <Route path='/zenith-node' element={<ZenithNode />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App