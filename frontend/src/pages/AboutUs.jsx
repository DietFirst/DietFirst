import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa"; // GitHub and LinkedIn icons
import developerImage1 from "../images/avatarimage-removebg-preview.png"; // Example image for Developer 1
import developerImage2 from "../images/img2.jpg"; // Example image for Developer 2
import developerImage3 from "../images/img3.jpg"; // Example image for Developer 3
import whyImage from "../images/healthyimg3.webp"; // Placeholder image for 'Why DietFirst'
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <div>
        <Navbar />
    <section className="bg-gray-50 py-16 mt-20">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-cyan-600 mb-8">About Us</h2>
        <p className="text-xl text-gray-700 mb-8">
          We are a team of passionate developers from CUNY Tech Prep's Web Development Track, dedicated to creating solutions that make a difference.
        </p>

        {/* Why We Created DietFirst */}
        <div className="grid md:grid-cols-2 gap-16 px-8 mb-16">
          <div className="text-left">
            <h3 className="text-3xl font-semibold text-cyan-600 mb-4 text-center">Why We Created DietFirst</h3>
            <p className="text-lg text-gray-700 mb-4">
              As part of CUNY Tech Prep's Web Development Track, we aimed to solve a real-world problem: providing personalized diet recommendations and tracking tools that can help everyone live a healthier life.
            </p>
            <p className="text-lg text-gray-700">
              We wanted to create an app that made healthy eating more accessible and empowered individuals to take control of their diet and health.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={whyImage}
              alt="Why we created DietFirst"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Meet the Team */}
        <div className="grid md:grid-cols-3 gap-16 px-8 mb-16">
          {/* Developer 1 */}
          <div className="text-center">
            <img
              src={developerImage1}
              alt="Developer 1"
              className="w-36 h-36 object-cover rounded-full mx-auto shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mt-4 mb-2">Harmain Munir</h3>
            <p className="text-lg text-gray-700 mb-4">
              I'm passionate about building intuitive and responsive user interfaces. I have experience in React and web design.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/Harmain1233" className="text-gray-700 hover:text-cyan-600">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/harmain-munir-335511243/" className="text-gray-700 hover:text-cyan-600">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>

          {/* Developer 2 */}
          <div className="text-center">
            <img
              src={developerImage2}
              alt="Developer 2"
              className="w-36 h-36 object-cover rounded-full mx-auto shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mt-4 mb-2">Wilson Liu</h3>
            <p className="text-lg text-gray-700 mb-4">
              As a backend developer, I focus on optimizing performance and ensuring the best user experience through scalable server-side technologies.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/wilsonliu2" className="text-gray-700 hover:text-cyan-600">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/wilsonliu1/" className="text-gray-700 hover:text-cyan-600">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>

          {/* Developer 3 */}
          <div className="text-center">
            <img
              src={developerImage3}
              alt="Developer 3"
              className="w-36 h-36 object-cover rounded-full mx-auto shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-2xl font-semibold text-cyan-600 mt-4 mb-2">Samiha Zaman</h3>
            <p className="text-lg text-gray-700 mb-4">
              I specialize in integrating various APIs to enhance app functionality and deliver data-driven solutions to users.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/samihazaman" className="text-gray-700 hover:text-cyan-600">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/samiha-z/" className="text-gray-700 hover:text-cyan-600">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-semibold text-cyan-600 mb-4">Join Us in Our Journey!</h3>
          <p className="text-lg text-gray-700 mb-6">
            We believe in the power of technology to improve lives. Follow our journey and get involved in the conversation.
          </p>
          <a
            href="https://github.com/DietFirst/DietFirst" // Replace with actual GitHub link
            className="text-xl text-cyan-600 hover:text-cyan-800 transition duration-300"
          >
            Check out our GitHub
          </a>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutUs;
