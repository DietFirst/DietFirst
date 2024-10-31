import React, { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext"; // Import the context

const Nutrients = () => {
  // State to track which items are selected
  const [checkedItems, setCheckedItems] = useState({});

  const { setUserData } = useStepperContext();

  // Toggle function to handle clicks
  const toggleCheckbox = (key) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [key]: !prevCheckedItems[key],
    }));
  };

  useEffect(() => {
    const selectedNutrients = Object.keys(checkedItems).filter(
      (key) => checkedItems[key],
    );
    setUserData((prevData) => ({
      ...prevData,
      nutrientsSelection: selectedNutrients,
    }));
  }, [checkedItems, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <label className="text-md mt-3 font-bold uppercase leading-8 text-gray-500">
          Select the macronutrients and micronutrients to include in your meal
          planning.
        </label>

        <div className="mt-2 h-4 text-center text-xs font-bold uppercase leading-8 text-gray-500">
          MACRONUTRIENTS
        </div>

        {/* Flex container for two columns of macronutrients */}
        <div className="mt-2 flex space-x-8">
          {/* Column 1 */}
          <div className="flex flex-col space-y-2">
            {[
              "Fat",
              "Saturated",
              "Trans",
              "Monounsaturated",
              "Polyunsaturated",
              "Carbs",
            ].map((key) => (
              <div
                key={key}
                className="flex cursor-pointer items-center space-x-2 rounded-full bg-gray-100 p-2 uppercase"
                onClick={() => toggleCheckbox(key)}
              >
                {/* Custom checkbox circle */}
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    checkedItems[key]
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-gray-400 text-gray-400"
                  } transition duration-300`}
                >
                  <span>{checkedItems[key] ? "✓" : "+"}</span>
                </div>

                {/* Nutrient label */}
                <span className="text-gray-700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-2">
            {[
              "Fiber",
              "Sugars",
              "Protein",
              "Added Sugar",
              "Carbohydrate",
              "Water",
            ].map((key) => (
              <div
                key={key}
                className="flex w-52 cursor-pointer items-center space-x-2 rounded-full bg-gray-100 p-2 uppercase"
                onClick={() => toggleCheckbox(key)}
              >
                {/* Custom checkbox circle */}
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    checkedItems[key]
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-gray-400 text-gray-400"
                  } transition duration-300`}
                >
                  <span>{checkedItems[key] ? "✓" : "+"}</span>
                </div>

                {/* Nutrient label */}
                <span className="text-gray-700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 h-4 text-center text-xs font-bold uppercase leading-8 text-gray-500">
          MICRONUTRIENTS
        </div>

        <div className="mt-2 flex space-x-8">
          {/* Column 1 */}
          <div className="flex flex-col space-y-2">
            {[
              "Cholestoral",
              "Sodium",
              "Calcium",
              "Magensium",
              "Potassium",
              "Iron",
              "Phosphorus",
              "Vitamin A",
              "Vitamin C",
              "Thiamin (B1)",
              "Riboflavin(B2)",
              "Niacin (B3) ",
              "Vitamin B6",
              "Folate (Equivalent)",
              "Vitamin B12",
              "Vitamin D",
              "Vitamin E",
              "Vitamin K",
              "Folate, food",
              "Folic Acid",
              "Sugar Alcohols",
              "Zinc, Zn",
            ].map((key) => (
              <div
                key={key}
                className="flex cursor-pointer items-center space-x-2 rounded-full bg-gray-100 p-2 uppercase"
                onClick={() => toggleCheckbox(key)}
              >
                {/* Custom checkbox circle */}
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    checkedItems[key]
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-gray-400 text-gray-400"
                  } transition duration-300`}
                >
                  <span>{checkedItems[key] ? "✓" : "+"}</span>
                </div>

                {/* Nutrient label */}
                <span className="text-gray-700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-2">
            {[
              "Fiber",
              "Sugars",
              "Protein",
              "Added Sugar",
              "Carbohydrate",
              "Water",
            ].map((key) => (
              <div
                key={key}
                className="flex w-52 cursor-pointer items-center space-x-2 rounded-full bg-gray-100 p-2 uppercase"
                onClick={() => toggleCheckbox(key)}
              >
                {/* Custom checkbox circle */}
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    checkedItems[key]
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-gray-400 text-gray-400"
                  } transition duration-300`}
                >
                  <span>{checkedItems[key] ? "✓" : "+"}</span>
                </div>

                {/* Nutrient label */}
                <span className="text-gray-700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrients;
