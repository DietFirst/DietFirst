import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-6 border border-b-2">
      <div className="container mx-auto px-4">
        <p className="text-center mb-4">© 2024 DietFirst. All Rights Reserved.</p>
        <div className="text-center mb-4">
          <a href="/privacy" className="text-gray-400 hover:text-white mx-3">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-3">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-3">Contact Us</a>
        </div>
        <div className="text-center">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white mx-3">Facebook</a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white mx-3">Twitter</a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-white mx-3">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
