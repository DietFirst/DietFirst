import { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext";

export default function DietRestrictions() {
  const { userData, setUserData } = useStepperContext();

  const [restrictions, setRestrictions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setRestrictions((prev) => [...prev, name]);
    } else {
      setRestrictions((prev) => prev.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      dietaryRestrictions: restrictions,
    }));
  }, [restrictions, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Do you have any specific allergies? Check all that apply
        </label>
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Allergy Restrictions</h2>
          <form>
            <div className="flex flex-col uppercase">
              {[
                "celery free",
                "crustacean free",
                "dairy free",
                "egg free",
                "fish free",
                "gluten free",
                "lupine free",
                "mustard free",
                "peanut free",
                "sesame free",
                "shellfish free",
                "soyfree",
                "treenut free",
                "wheat free",
                "FODMAP free",
                "immuno supportive"
              ].map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name={key}
                    checked={restrictions.includes(key)}
                    onChange={handleCheckboxChange}
                  />
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
              ))}
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mx-2 flex-1 mt-5">
      
     
      </div>
    </div>
  );
}
