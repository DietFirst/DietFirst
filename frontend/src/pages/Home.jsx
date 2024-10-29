import React from 'react'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
        <HeroSection></HeroSection>
        <Navbar></Navbar>
        <AboutSection></AboutSection>
        <Footer></Footer>

    </div>
  )
}

export default Home;
