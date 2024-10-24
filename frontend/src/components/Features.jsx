import React from 'react';
import image1 from '../images/healthyimg.jpg';

const Features = () => {
  return (
    <div className='h-full'>
      <h1 className='text-white text-3xl font-semibold uppercase text-center'>
        Put Your Diet First For
      </h1>
      <div className='grid grid-cols-3 gap-3 p-4'>
        <div className='border border-white rounded-md h-[60px] flex items-center justify-center'>
          <img 
            src={image1} 
            alt="Healthy Diet" // Always include alt text for accessibility
            className='h-full w-auto' // Ensure the image scales properly
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
