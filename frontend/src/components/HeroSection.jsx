import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const HeroSection = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleClick = () => {
        navigate('/Form'); // Replace '/form' with the correct path to your form component
    };




  return (
    <section className="lg:py-16 h-screen">
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-white mb-4 text-5xl sm:text-xl lg:text-6xl lg:leading-normal font-extrabold">
        Welcome To Diet First
      </h1>
      <p className="text-[#f6f6f6] text-base sm:text-lg mb-4 lg:text-3xl"> 
        Your Personalized Diet Companion
      </p>
      <p className="text-[#f6f6f6] text-base sm:text-lg mb-6 lg:text-xl text-center"> 
        Are you ready to take control of your health? At DietFirst, we believe that everyone deserves access to healthy food and personalized nutrition.
      </p>
      <button onClick={handleClick} className="rounded-full flex bg-white">
  <span className='mt-3 text-lg text-cyan-600 px-5'>Try It Today</span> 
  <span className=" rounded-full px-5 py-5 bg-cyan-600"> 
    <FaArrowRightLong className="text-white" />
  </span>
</button>
      


    </div>
  </section>
  
  
  )
}

export default HeroSection
