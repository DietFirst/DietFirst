import React from "react";

export default function StepperControl({
  handleClick,
  currentStep,
  steps,
  loading,
}) {
  return (
    <div className="flex justify-between mt-5">
      <button
        onClick={() => handleClick("back")}
        className={`px-4 py-2 rounded-md ${
          currentStep === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        disabled={currentStep === 1 || loading}
      >
        Back
      </button>
      <button
        onClick={() => handleClick("next")}
        className={`px-4 py-2 rounded-md ${
          loading ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white"
        }`}
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : currentStep === steps.length - 1
          ? "Submit"
          : "Next"}
      </button>
    </div>
  );
}
