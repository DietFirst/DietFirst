import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/healthy-bowl-dietfirst-logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Add Google Fonts Poppins
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Check if a user is logged in by the presence of a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Add scroll event listener to change navbar background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(link);
    };
  }, []); 

  const NavLink = ({ href, children }) => (
    <li className="group relative">
      <a
        href={href}
        className="relative py-2 text-lg transition duration-300 text-white hover:text-cyan-300 
        before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 
        before:bg-white before:scale-x-0 before:transition-transform 
        before:origin-left group-hover:before:scale-x-100
        font-poppins font-medium"
      >
        {children}
      </a>
    </li>
  );

  return (
    <nav 
      className={`fixed left-0 right-0 top-0 z-50 py-4 transition-all duration-300 font-poppins`}
      style={{ 
        backgroundColor: '#164e63', 
        boxShadow: isScrolled ? '0 4px 6px rgba(0,0,0,0.1)' : 'none' 
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/home">
            <img 
              src={Logo} 
              alt="Diet First Logo" 
              className="max-h-[50px] w-auto transition-transform hover:scale-105" 
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {/* Common Links */}
          <ul className="flex space-x-6">
            <NavLink href="/home">Home</NavLink>
            <NavLink href="/about-us">About Us</NavLink>

          </ul>

          {/* Authentication Buttons */}
          {!isLoggedIn && (
            <div className="flex space-x-4">
              <Link to="/login">
                <button className="px-6 py-2 text-white border border-transparent 
                  rounded-full hover:bg-white/10 transition duration-300
                  font-poppins font-medium">
                  sign in
                </button>
              </Link>

              <Link to="/form">
                <button className="px-6 py-2 text-white border border-white 
                  rounded-full hover:bg-white/20 transition duration-300
                  font-poppins font-medium">
                  sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;