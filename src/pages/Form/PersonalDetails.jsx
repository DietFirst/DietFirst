// PersonalDetails.jsx
import React from 'react';

const PersonalDetails = ({ nextStep, handleChange, firstname, lastname, email, phone }) => {
  return (
    <div>
      <h2>Personal Details</h2>
      <input type="text" placeholder="First Name" value={firstname} onChange={handleChange('firstname')}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

       />
      <input type="text" placeholder="Last Name" value={lastname} onChange={handleChange('lastname')} 
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

      
      />
      <input type="email" placeholder="Email" value={email} onChange={handleChange('email')}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

      
      />
      <input type="tel" placeholder="Phone" value={phone} onChange={handleChange('phone')} 
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    
      />
      <button type="button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default PersonalDetails;
