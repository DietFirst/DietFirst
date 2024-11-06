import { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext";

export default function AllergyRestrictions() {
  const { setUserData } = useStepperContext();
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (key) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [key]: !prevCheckedItems[key],
    }));
  };

  useEffect(() => {
    const selectedAllergies = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    setUserData((prevData) => ({
      ...prevData,
      allergyRestrictions: selectedAllergies,
    }));
  }, [checkedItems, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <label className="text-sm mt-3 font-bold uppercase mb-2 leading-8 text-black">
          What are your specific allergy restrictions? Check all that apply.
        </label>

        <div className="rounded-md bg-gray-100 p-4">
          <h2 className="mb-2 text-lg font-semibold text-center text-gray-500">
            Allergy Restrictions
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            {[
              "Celery-free",
              "Crustacean-free",
              "Dairy-free",
              "Egg-free",
              "Fish-free",
              "Gluten-free",
              "Lupine-free",
              "Mustard-free",
              "Peanut-free",
              "Sesame-free",
              "Shellfish-free",
              "Soy-free",
              "Tree-Nut-free",
              "Wheat-free",
              "FODMAP-free",
              "Immuno-Supportive",
            ].map((key) => (
              <div
                key={key}
                className="flex cursor-pointer items-center space-x-2 rounded-full bg-gray-200 p-2 uppercase"
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
    </div>
  );
}
