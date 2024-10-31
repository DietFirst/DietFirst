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
      allergyRestrictions: AllergyRestrictions,
    }));
  }, [AllergyRestrictions, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          What are your specific diet restrictions? Check all that apply
        </label>
        <div className="rounded-md bg-gray-100 p-4">
          <h2 className="mb-2 text-lg font-semibold">Diet Restrictions</h2>
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
                <label key={key} className="mb-2 flex items-center">
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
