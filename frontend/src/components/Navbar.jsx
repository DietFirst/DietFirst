import React from 'react';

const Navbar = () => {
  return (
    <div className='fixed top-3 left-0 right-0 py-4 z-10'>  
      <div className="container mx-auto flex justify-between items-center"> 
        {/* logo section */}
        <div className="flex-none">
          <p className="text-lg font-semibold text-white">
            DIET FIRST
          </p>
        </div>
        {/* menu section */}
        <div>
          <ul className='flex gap-4 text-white'>
            <li className="border-b-2 border-transparent hover:border-b-2 py-1 hover:border-white">
              Home
            </li>
            <li className="border-b-2 border-transparent hover:border-b-2 py-1 hover:border-white">About Us</li>
            <button className="border border-white rounded-full py-1 px-6 hover:text-black hover:bg-white transition duration-300">
            <li className="border-transparent hover:border-white">Sign Up</li>
            </button>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
