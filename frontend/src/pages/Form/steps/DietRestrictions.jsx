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
      restrictions: restrictions,
    }));
  }, [restrictions, setUserData]);

  return (
    <div className="flex flex-col">
      <div className="mx-2 w-full flex-1">
        <label className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Do you have any specific allergies? Check all that apply
        </label>
        <div className="rounded-md bg-gray-100 p-4">
          <h2 className="mb-2 text-lg font-semibold">Allergy Restrictions</h2>
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
                "immuno supportive",
              ].map((key) => (
                <label key={key} className="mb-2 flex items-center">
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
      <div className="mx-2 mt-5 w-full flex-1"></div>
    </div>
  );
}
