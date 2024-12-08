import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 py-4" style={{ backgroundColor: '#164e63' }}>

      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-none">
          <p className="text-2xl font-semibold text-white">DIET FIRST</p>
        </div>

        {/* Menu Section */}
        <div>
          <ul className="flex gap-6 text-white">
            {/* Menu Items */}
            <li className="group relative">
              <a
                href="/home"
                className="py-1 text-lg transition duration-300 hover:text-cyan-600"
              >
                Home
              </a>
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
            </li>

            <li className="group relative">
              <a
                href="/recipes"
                className="py-1 text-lg transition duration-300 hover:text-cyan-600"
              >
                Recommended Recipes
              </a>
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
            </li>

            <li className="group relative">
              <a
                href="/savedRecipes"
                className="py-1 text-lg transition duration-300 hover:text-cyan-600"
              >
                Saved Recipes
              </a>
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform group-hover:scale-x-100"></span>
            </li>

            <li className="group relative">
              <a
                href="/progress"
                className="py-1 text-lg transition duration-300 hover:text-cyan-600"
              >
                Progress Tracking
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
        </div>

        {/* Sign In and Sign Up Buttons */}
        <div className="flex gap-4">
          <Link to="/login">
            {" "}
            {/* Link to the Login page */}
            <button className="rounded-full bg-transparent px-6 py-2 text-lg uppercase text-white transition duration-300 hover:text-cyan-600">
              Sign In
            </button>
          </Link>

          <Link to="/form">
            {" "}
            {/* Link to the Sign Up page */}
            <button className="rounded-full border border-white bg-transparent px-6 py-2 text-lg uppercase text-white transition duration-300 hover:bg-cyan-600">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
