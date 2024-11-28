import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 py-4 bg-transparent z-50'>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-none">
          <p className="text-2xl font-semibold text-white">
            DIET FIRST
          </p>
        </div>

        {/* Menu Section */}
        <div>
          <ul className='flex gap-6 text-white'>
            {/* Menu Items */}
            <li className="relative group">
              <a href="/home" className="text-lg py-1 hover:text-cyan-600 transition duration-300">Home</a>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </li>

            <li className="relative group">
              <a href="/recipes" className="text-lg py-1 hover:text-cyan-600 transition duration-300">Recommended Recipes</a>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </li>

            <li className="relative group">
              <a href="/saved-recipes" className="text-lg py-1 hover:text-cyan-600 transition duration-300">Saved Recipes</a>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </li>

            <li className="relative group">
              <a href="/progress" className="text-lg py-1 hover:text-cyan-600 transition duration-300">Progress Tracking</a>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </li>

            <li className="relative group">
              <a href="/about-us" className="text-lg py-1 hover:text-cyan-600 transition duration-300">About Us</a>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </li>
          </ul>
        </div>

        {/* Sign In and Sign Up Buttons */}
        <div className="flex gap-4">
          <Link to="/login"> {/* Link to the Login page */}
            <button className="px-6 py-2 bg-transparent text-white text-lg rounded-full hover:text-cyan-600 uppercase transition duration-300">
              Sign In
            </button>
          </Link>

          <Link to="/form"> {/* Link to the Sign Up page */}
            <button className="px-6 py-2 bg-transparent border border-white text-white uppercase text-lg rounded-full hover:bg-cyan-600 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
