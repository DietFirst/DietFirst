import React from 'react';
import { useStepperContext } from "../StepperContext";

const Calories = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full mx-2 flex-1">
          <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
            Please input your preferred daily calorie intake.
          </label>
          <div className="p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Allergy Restrictions</h2>
            <h1 className="text-sm">
              Default value is selected based on a 1600-2000 calorie diet. Please enter your preferred min/max values.
            </h1>
            <form>
              <div className="flex flex-row gap-2 mt-5">
                {/* Min calories input */}
                <div className="w-1/2 flex items-center gap-2">
                  <span>min</span>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Max calories input */}
                <div className="w-1/2 flex items-center gap-2">
                  <span>max</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span>kcal</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calories;
