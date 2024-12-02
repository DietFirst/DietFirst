import React, { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext";

const Calories = () => {
  const { userData, setUserData } = useStepperContext();

  const [selectedMeals, setSelectedMeals] = useState({
    Breakfast: userData.selectedMeals?.Breakfast || false,
    Lunch: userData.selectedMeals?.Lunch || false,
    Dinner: userData.selectedMeals?.Dinner || false,
  });


  const [caloriesInput, setCaloriesInput] = useState({
    min: userData.caloriesInTake?.min || 1600,
    max: userData.caloriesInTake?.max || 2000,
  });

  const toggleMeal = (meal) => {
    setSelectedMeals((prevMeals) => ({
      ...prevMeals,
      [meal]: !prevMeals[meal],
    }));
  };

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
      selectedMeals: selectedMeals,
    }));
  }, [selectedMeals, setUserData]);

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

     {/* Meals Selection Section */}
      <div className="mx-2 w-full flex-1 mb-8">
        <label className="mt-3 h-6 text-md font-bold uppercase leading-8 text-black">
          Meals per Day
        </label>
        <div className="rounded-md bg-gray-100 p-4">
          <div className="grid grid-cols-3 gap-4">
            {["Breakfast", "Lunch", "Dinner"].map((meal) => (
              <div
                key={meal}
                className="inline-flex cursor-pointer items-center space-x-2 rounded-full bg-gray-200 px-3 py-2 uppercase"
                onClick={() => toggleMeal(meal)}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    selectedMeals[meal]
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-gray-400 text-gray-400"
                  } transition duration-300`}
                >
                  <span>{selectedMeals[meal] ? "✓" : "+"}</span>
                </div>
                <span className="text-gray-700">{meal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calories Intake Section */}
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
