// CourseDetails.jsx
import React from 'react';

const CourseDetails = ({ nextStep, prevStep, coursesData, handleChange }) => {
  return (
    <div>
      <h2>Select Courses</h2>
      {coursesData.map(course => (
        <div key={course.id}>
          <input 
            type="checkbox" 
            value={course.courseName} 
            onChange={handleChange('courses')} 
          />
          {course.courseName}
        </div>
      ))}
      <button type="button" onClick={prevStep}>Back</button>
      <button type="button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default CourseDetails;
