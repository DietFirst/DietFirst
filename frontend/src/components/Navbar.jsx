import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a user is logged in by the presence of a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []); // This effect runs only once when the component mounts

  return (
    <div className="fixed left-0 right-0 top-0 z-50 py-4" style={{ backgroundColor: '#164e63' }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-none">
          <p className="text-2xl font-semibold text-white">DIET FIRST</p>
        </div>

        {/* Menu Section with links and Sign In/Sign Up Buttons */}
        <div className="flex items-center gap-6 uppercase">
          {/* Menu Links (Home, About Us) */}
          <ul className="flex gap-6 text-white">
            {/* Always show Home link */}
            <li className="group relative">
              <a
                href="/home"
                className="py-1 text-lg transition duration-300 uppercase hover:text-cyan-600"
              >
                Home
              </a>
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
            </li>

            {/* Always show About Us link */}
            <li className="group relative">
              <a
                href="/mealplanner"
                className="py-1 text-lg transition duration-300 hover:text-cyan-600"
              >
                Generate Meal Plan
              </a>
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
            </li>

            <li className="group relative">
              <a
                href="/about-us"
                className="py-1 text-lg transition duration-300 hover:text-cyan-600"
              >
                About Us
              </a>
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
            </li>
          </ul>

          {/* Sign In and Sign Up Buttons (Only show if not logged in) */}
          {!isLoggedIn && (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="rounded-full bg-transparent px-6 py-2 text-lg uppercase text-white transition duration-300 hover:text-cyan-600">
                  Sign In
                </button>
              </Link>

              <Link to="/form">
                <button className="rounded-full border border-white bg-transparent px-6 py-2 text-lg uppercase text-white transition duration-300 hover:bg-cyan-600">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Links for Logged-in Users */}
        {isLoggedIn && (
          <div className="flex gap-6 text-white">
            <ul className="flex gap-6">
              <li className="group relative">
                <a
                  href="/recipes"
                  className="py-1 text-lg transition duration-300 uppercase hover:text-cyan-600"
                >
                  Recommended Recipes
                </a>
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
              </li>

              <li className="group relative">
                <a
                  href="/savedRecipes"
                  className="py-1 text-lg transition duration-300 uppercase hover:text-cyan-600"
                >
                  Saved Recipes
                </a>
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
              </li>

              <li className="group relative">
                <a
                  href="/progress"
                  className="py-1 text-lg transition duration-300 uppercase hover:text-cyan-600"
                >
                  Progress Tracking
                </a>
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
