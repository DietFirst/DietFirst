import React, { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext";

const Calories = () => {
  const { userData, setUserData } = useStepperContext();

  const [caloriesInput, setCaloriesInput] = useState({
    min: userData.caloriesInTake?.min || 1600,
    max: userData.caloriesInTake?.max || 2000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaloriesInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      caloriesInTake: {
        min: Number(caloriesInput.min),
        max: Number(caloriesInput.max),
      },
    }));
  }, [caloriesInput, setUserData]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="mx-2 w-full flex-1">
          <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Please input your preferred daily calorie intake.
          </label>
          <div className="rounded-md bg-gray-100 p-4">
            <h2 className="mb-2 text-lg font-semibold">Calories Intake</h2>
            <h1 className="text-sm">
              Default value is selected based on a 1600-2000 calorie diet.
              Please enter your preferred min/max values.
            </h1>
            <form>
              <div className="mt-5 flex flex-row gap-2">
                {/* Min calories input */}
                <div className="flex w-1/2 items-center gap-2">
                  <span>min</span>
                  <input
                    type="number"
                    name="min"
                    value={caloriesInput.min}
                    onChange={handleChange}
                    placeholder="Min"
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Max calories input */}
                <div className="flex w-1/2 items-center gap-2">
                  <span>max</span>
                  <input
                    type="number"
                    name="max"
                    value={caloriesInput.max}
                    onChange={handleChange}
                    placeholder="Max"
                    className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
};

export default Calories;
