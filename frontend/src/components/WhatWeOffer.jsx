import React from "react";
import progressTrackingImage from "../images/progressTrackingImage.png";
import mealplan from "../images/meal-plan.png"; 
import savedRecipes from "../images/saved-recipes.png"; 


const WhatWeOffer = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-cyan-600 mb-8">
          What does DietFirst offer?
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          At DietFirst, we are dedicated to helping you achieve your health and wellness goals. Here’s what we offer:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Personalized Meal Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src={mealplan}
              alt="Personalized Meal Recommendations"
              className="w-18 h-15 mx-auto mb-4 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Personalized Meal Recommendations</h3>
            <p className="text-gray-700">
              Receive customized meal recommendations based on your dietary preferences, goals, and health conditions.
            </p>
          </div>

          {/* Progress Tracking */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src={progressTrackingImage}
              alt="Progress Tracking"
              className="w-18 h-15 mx-auto mb-4 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Progress Tracking</h3>
            <p className="text-gray-700">
              Track your progress with a detailed page that helps you monitor your diet journey, from meals to health goals.
            </p>
          </div>

          {/* Save Recipes */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src={savedRecipes}
              alt="Save Recipes"
              className="w-18 h-15 mx-auto mb-4 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">Save Recipes</h3>
            <p className="text-gray-700">
              Save and organize the recipes you love, so you can easily access them whenever you need a healthy meal idea.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
