import React, { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext"; // Import the context

const Nutrients = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const { setUserData } = useStepperContext();

  const toggleCheckbox = (key) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [key]: !prevCheckedItems[key],
    }));
  };

  useEffect(() => {
    const selectedNutrients = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    setUserData((prevData) => ({
      ...prevData,
      nutrientsSelection: selectedNutrients,
    }));
  }, [checkedItems, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <label className="text-sm mt-3 font-bold uppercase mb-2 leading-8 text-black">
          Select the macronutrients and micronutrients to include in your meal
          planning.
        </label>

        <div className="h-4 p-5 mt-5 text-md font-bold uppercase text-center text-black">
          MACRONUTRIENTS
        </div>

        <div className="mt-2 flex space-x-8">
          {/* Column 1 */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            {["Fat", "Saturated", "Trans", "Monounsaturated", "Polyunsaturated", "Carbs",
              "Fiber", "Sugars", "Protein", "Added Sugar", "Carbohydrate", "Water"
            ].map((key) => (
              <div
                key={key}
                className="flex cursor-pointer items-center space-x-2 rounded-full bg-gray-100 p-2 uppercase"
                onClick={() => toggleCheckbox(key)}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    checkedItems[key]
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-gray-400 text-gray-400"
                  } transition duration-300`}
                >
                  <span>{checkedItems[key] ? "✓" : "+"}</span>
                </div>
                <span className="text-gray-700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            ))}
          </div>

       
        </div>

        <div className=" h-4 p-5 mt-5 text-md font-bold uppercase text-center text-black">
          MICRONUTRIENTS
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          {[
            "Cholestoral", "Sodium", "Calcium", "Magnesium", "Potassium", "Iron", 
            "Phosphorus", "Vitamin A", "Vitamin C", "Thiamin (B1)", "Riboflavin (B2)",
            "Niacin (B3)", "Vitamin B6", "Folate (Equivalent)", "Vitamin B12", 
            "Vitamin D", "Vitamin E", "Vitamin K", "Folate, food", "Folic Acid",
            "Sugar Alcohols", "Zinc, Zn"
          ].map((key) => (
            <div
              key={key}
              className="flex cursor-pointer items-center space-x-2 rounded-full bg-gray-100 p-2 uppercase"
              onClick={() => toggleCheckbox(key)}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  checkedItems[key]
                    ? "border-cyan-600 bg-cyan-600 text-white"
                    : "border-gray-400 text-gray-400"
                } transition duration-300`}
              >
                <span>{checkedItems[key] ? "✓" : "+"}</span>
              </div>
              <span className="text-gray-700">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nutrients;

