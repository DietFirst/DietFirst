import React from "react";
import step1Image from "../images/healthyimg.jpg"; // Example image
import step2Image from "../images/healthyimg2.png"; // Example image
import step3Image from "../images/healthyimg3.webp"; // Example image

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-600 mb-8">How DietFirst Works</h2>
        <p className="text-xl text-gray-700 mb-8">
          It’s simple to get started with DietFirst! Follow these steps to start your health journey:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src={step1Image}
              alt="Step 1"
              className="w-20 h-20 mx-auto mb-4 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Step 1: Sign Up</h3>
            <p className="text-gray-700">
              Create your account on DietFirst and provide your health goals and dietary preferences.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src={step2Image}
              alt="Step 2"
              className="w-20 h-20 mx-auto mb-4 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Step 2: Get Your Meal Plan</h3>
            <p className="text-gray-700">
              Based on your preferences, we provide a customized meal plan to help you reach your goals.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src={step3Image}
              alt="Step 3"
              className="w-20 h-20 mx-auto mb-4 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Step 3: Track Your Progress</h3>
            <p className="text-gray-700">
              Monitor your progress with our easy-to-use tracking tools and stay motivated on your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
