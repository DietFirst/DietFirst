// Summary.jsx
import React from 'react';

const Summary = ({ firstname, lastname, email, phone, courses, prevStep }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>First Name: {firstname}</p>
      <p>Last Name: {lastname}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <button type="button" onClick={prevStep}>Back</button>
      <button type="submit">Submit</button>
    </div>
  );
};

export default Summary;
