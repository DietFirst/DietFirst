import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bgimage from "../images/bgimg2.jpg";

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate("/Form"); // Replace '/form' with the correct path to your form component
  };

  return (
    <section className="h-screen lg:py-16">
      <img
        src={bgimage}
        alt="Hero Background"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          opacity: 0.5,
          height: "80%",
          objectFit: "cover", // Ensures the image covers the entire section
          transform: "translate(-50%, -50%)", // Centers the image
          zIndex: -1, // Sends the image to the back
        }}
      />

      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-extrabold text-white sm:text-xl lg:text-6xl lg:leading-normal">
          Welcome To Diet First
        </h1>
        <p className="mb-4 text-base text-[#f6f6f6] sm:text-lg lg:text-3xl">
          Your Personalized Diet Companion
        </p>
        <p className="mb-6 text-center text-base text-[#f6f6f6] sm:text-lg lg:text-xl">
          Are you ready to take control of your health? At DietFirst, we believe
          that everyone deserves access to healthy food and personalized
          nutrition.
        </p>
        <button onClick={handleClick} className="flex rounded-full bg-white">
          <span className="mt-3 px-5 text-lg text-cyan-600">Try It Today</span>
          <span className="rounded-full bg-cyan-600 px-5 py-5">
            <FaArrowRightLong className="text-white" />
          </span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
