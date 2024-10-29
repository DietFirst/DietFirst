import { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext";

export default function AllergyRestrictions() {
  const { userData, setUserData } = useStepperContext();

  const [AllergyRestrictions, setAllergyRestrictions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setAllergyRestrictions((prev) => [...prev, name]);
    } else {
      setAllergyRestrictions((prev) => prev.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      healthDiseases: AllergyRestrictions,
    }));
  }, [AllergyRestrictions, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          What are your specific diet restrictions? Check all that apply
        </label>
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Diet Restrictions</h2>
          <form>
            <div className="flex flex-col uppercase">
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
                "Sugar Concious",
                "Vegan",
                "Vegetarian",
                "Mollusk Free",
                "Sulfite Free",
              ].map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name={key}
                    checked={AllergyRestrictions.includes(key)}
                    onChange={handleCheckboxChange}
                  />
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
              ))}
            </div>
          </form>
        </div>
      </div>
     
    </div>
  );
}
