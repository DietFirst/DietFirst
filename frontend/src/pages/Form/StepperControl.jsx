import React from 'react';

export default function StepperControl({ handleClick, currentStep, steps }) {
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      {/* Back button */}
      <button
        onClick={() => handleClick("back")} // Updated to pass "back" argument
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white ${
          currentStep === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={currentStep === 1} // Disable button when on the first step
      >
        Back
      </button>

      {/* Next button */}
      <button
        onClick={() => handleClick("next")} // Existing functionality
        className="cursor-pointer rounded-lg bg-cyan-600 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}

