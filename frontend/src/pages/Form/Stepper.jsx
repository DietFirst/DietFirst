import React, { useState, useEffect, useRef } from "react";
import bgImage from "../../images/bgimg2.jpg";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      // Current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }
      // Step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      // Step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className="flex flex-col items-center mb-20" // Use flex-col for vertical stacking
      >
        <div className="flex relative flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-zinc-50 h-12 w-12 flex items-center justify-center ${
              step.selected
                ? "bg-cyan-600 text-white font-bold border border-cyan-600"
                : ""
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-600" : "text-gray-600"
            }`}
          >
            {step.description}
          </div>
        </div>
        {index !== newStep.length - 1 && ( // Avoid adding a line after the last step
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
              step.completed ? "border-cyan-600" : "border-gray-300"
            }`}
          ></div>
        )}
      </div>
    );
  });

  return (
    <div className="relative w-64 mt-10 ml-5 p-4 rounded-md flex flex-col justify-start overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0, // Ensure it's behind the content
          filter: "blur(1px)", // Apply blur effect to the background
          opacity: 0.8,
          backgroundRepeat: "no-repeat",
          backgroundSize: "700%", // Adjust this value to control the zoom level
        }}
      />
      {/* Content on top */}
      <div className="relative z-10">
        {" "}
        {/* Content remains clear */}
        {stepsDisplay}
      </div>
    </div>
  );
};

export default Stepper;
