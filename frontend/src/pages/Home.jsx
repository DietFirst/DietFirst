import React from 'react'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'
import WhatWeOffer from '../components/WhatWeOffer'


const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <WhatWeOffer></WhatWeOffer>
        <AboutSection></AboutSection>

    </div>
  )
}

export default Home;
