import React, { useState } from 'react';

const Nutrients = () => {
  // State to track which items are selected
  const [checkedItems, setCheckedItems] = useState({});

  // Toggle function to handle clicks
  const toggleCheckbox = (key) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [key]: !prevCheckedItems[key],
    }));
  };

  return (
    <div className="flex flex-col">
    <div className="w-full mx-2 flex-1">
      <label className="font-bold mt-3 text-gray-500 text-md leading-8 uppercase">
        Select the macronutrients and micronutrients to include in your meal planning.
      </label>
  
      <div className="font-bold h-4 mt-2 text-gray-500 text-xs leading-8 uppercase text-center">
        MACRONUTRIENTS
      </div>
  
      {/* Flex container for two columns of macronutrients */}
      <div className="flex space-x-8 mt-2">
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
              className="flex items-center space-x-2  p-2 rounded-full uppercase cursor-pointer bg-gray-100"
              onClick={() => toggleCheckbox(key)}
            >
              {/* Custom checkbox circle */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2  ${
                  checkedItems[key] ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-gray-400 text-gray-400'
                } transition duration-300`}
              >
                <span>{checkedItems[key] ? '✓' : '+'}</span>
              </div>
  
              {/* Nutrient label */}
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
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
            "Water"
          ].map((key) => (
            <div
              key={key}
              className="flex items-center space-x-2 w-52 p-2 rounded-full uppercase cursor-pointer bg-gray-100"
              onClick={() => toggleCheckbox(key)}
            >
              {/* Custom checkbox circle */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  checkedItems[key] ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-gray-400 text-gray-400'
                } transition duration-300`}
              >
                <span>{checkedItems[key] ? '✓' : '+'}</span>
              </div>
  
              {/* Nutrient label */}
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="font-bold h-4 mt-2 text-gray-500 text-xs leading-8 uppercase text-center">
        MICRONUTRIENTS
      </div>

      <div className="flex space-x-8 mt-2">
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
            "Zinc, Zn"
            
          ].map((key) => (
            <div
              key={key}
              className="flex items-center space-x-2  p-2 rounded-full uppercase cursor-pointer bg-gray-100"
              onClick={() => toggleCheckbox(key)}
            >
              {/* Custom checkbox circle */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2  ${
                  checkedItems[key] ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-gray-400 text-gray-400'
                } transition duration-300`}
              >
                <span>{checkedItems[key] ? '✓' : '+'}</span>
              </div>
  
              {/* Nutrient label */}
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
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
            "Water"
          ].map((key) => (
            <div
              key={key}
              className="flex items-center space-x-2 w-52 p-2 rounded-full uppercase cursor-pointer bg-gray-100"
              onClick={() => toggleCheckbox(key)}
            >
              {/* Custom checkbox circle */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  checkedItems[key] ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-gray-400 text-gray-400'
                } transition duration-300`}
              >
                <span>{checkedItems[key] ? '✓' : '+'}</span>
              </div>
  
              {/* Nutrient label */}
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </div>
          ))}
        </div>
      </div>



    </div>
  </div>
  
  );
};

export default Nutrients;
