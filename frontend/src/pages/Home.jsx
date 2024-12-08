import React from 'react'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'
import WhatWeOffer from '../components/WhatWeOffer'
import HowItWorks from '../components/HowItWorks'


const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <WhatWeOffer></WhatWeOffer>
        <AboutSection></AboutSection>
        <HowItWorks></HowItWorks>

    </div>
  )
}

export default Home;
