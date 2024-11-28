import React from 'react';
import checkbox from '../images/checkbox1.png'; 
import image1 from '../images/healthyimg.jpg'; 
import image2 from '../images/healthyimg2.png';
import image3 from '../images/healthyimg3.webp';

const AboutSection = () => {
  return (
    <div>
      <section className='grid grid-cols-2 gap-4 items-center mt-36'>
        {/* Left Side: Text Content */}
        <div className="relative w-full h-full pl-12">
          {/* Background text "DIETFIRST" */}
          <p className="absolute w-full text-gray-400 opacity-10 text-9xl font-bold">
            DIETFIRST
          </p>
          {/* Front text "a healthier, happier you" */}
          <p className="relative text-white italic text-5xl font-semibold mt-9 ml-6">
            a healthier, happier you
          </p>

          {/* Features Section */}
          <ul className="relative mt-20 ml-6 space-y-4 text-lg text-white flex flex-col">
            <li className="flex items-center">
              <img src={checkbox} alt="checkbox" className="h-[20px] mr-2 " />
              Get access to hundreds of personalized meals catered specifically for you
            </li>
            <li className="flex items-center">
              <img src={checkbox} alt="checkbox" className="h-[20px] mr-2" />
              Enjoy meal plans that suit your dietary needs and preferences
            </li>
            <li className="flex items-center">
              <img src={checkbox} alt="checkbox" className="h-[20px] mr-2" />
              Stay on track with professional nutrition advice and tips
            </li>
            <li className="flex items-center">
              <img src={checkbox} alt="checkbox" className="h-[20px] mr-2" />
              Discover new recipes and healthy eating habits
            </li>
            <li className="flex items-center">
              <img src={checkbox} alt="checkbox" className="h-[20px] mr-2" />
              Track your progress and reach your health goals
            </li>
          </ul>
        </div>

        {/* Right Side: Images */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-9">
          <img src={image1} alt="Healthy Image" className="w-full h-[200px] object-cover rounded-lg" />
          <img src={image2} alt="Healthy Image" className="w-full h-[200px] object-cover rounded-lg" />
          <img src={image3} alt="Healthy Image" className="col-span-2 w-full h-[150px] object-cover rounded-lg" />
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
