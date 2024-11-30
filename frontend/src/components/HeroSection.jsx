import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import bgimage from "../images/bgimg2.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Form");
  };

  return (
    <section className="h-screen flex items-center justify-between px-8">
      {/* Left Side: Image */}
      <div className="flex-1 relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={bgimage}
          alt="Hero Background"
          className="object-cover w-full h-full transform scale-110 hover:scale-100 transition-transform duration-700"
        />
      </div>

      {/* Right Side: Text and Button */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 md:px-16 lg:px-24 text-white">
      <h1 className="mb-4 text-4xl font-extrabold text-shadow-lg sm:text-3xl lg:text-6xl text-center whitespace-nowrap w-full">
  Welcome To Diet First
</h1>


        <p className="mb-4 text-xl sm:text-lg lg:text-2xl text-shadow-md text-center">
          Your Personalized Diet Companion
        </p>
        <p className="mb-6 text-lg sm:text-md lg:text-xl max-w-3xl text-shadow-md text-center">
          Are you ready to take control of your health? At DietFirst, we believe that everyone deserves access to healthy food and personalized nutrition.
        </p>
        <button
          onClick={handleClick}
          className="flex items-center rounded-full bg-white px-8 py-4 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <span className="text-lg text-cyan-600">Try It Today</span>
          <span className="ml-3 rounded-full bg-cyan-600 px-5 py-5">
            <FaArrowRightLong className="text-white" />
          </span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;