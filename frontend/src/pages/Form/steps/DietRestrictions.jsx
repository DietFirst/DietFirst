import { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext";

export default function DietRestrictions() {
  const [checkedItems, setCheckedItems] = useState({});
  const { setUserData } = useStepperContext();

  const toggleCheckbox = (key) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [key]: !prevCheckedItems[key],
    }));
  };

  useEffect(() => {
    const selectedDiets = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    setUserData((prevData) => ({
      ...prevData,
      dietRestrictions: selectedDiets,
    }));
  }, [checkedItems, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <label className="mt-3 h-6 text-md font-bold uppercase leading-8 text-black">
          What are your specific diet restrictions? Check all that apply
        </label>
        <div className="rounded-md bg-gray-100 h-screen p-4">
          <form>
            <div className="grid grid-cols-3 gap-4 mt-20">
              {[
                "alcohol free",
                "balanced",
                "DASH",
                "High Fiber",
                "High Protein",
                "Keto",
                "Kidney Friendly",
                "Kosher",
                "Low Carb",
                "Low Fat",
                "Low Potassium",
                "Low Sodium",
                "Mediterranean",
                "No Oil Added",
                "No Sugar",
                "Paleo",
                "Pescatarian",
                "Pork Free",
                "Red Meat Free",
                "Sugar Conscious",
                "Vegan",
                "Vegetarian",
                "Mollusk Free",
                "Sulfite Free",
              ].map((key) => (
                <div
                  key={key}
                  className="inline-flex cursor-pointer items-center space-x-2 rounded-full bg-gray-200 px-3 py-2 uppercase"
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
          </form>
        </div>
      </div>
    </div>
  );
}
