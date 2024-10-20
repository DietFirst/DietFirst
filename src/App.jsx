import React from 'react'
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Home></Home>
      <HeroSection></HeroSection>
    </div>
  )
}

export default App
