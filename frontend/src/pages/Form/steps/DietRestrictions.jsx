import { useState } from 'react'; // Ensure you import useState
import { useStepperContext } from "../StepperContext";

export default function DietRestrictions() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [restrictions, setRestrictions] = useState({
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    vegan: false,
    vegetarian: false,
    halal: false,
    kosher: false, 
    paleo: false,
    keto: false,
    fodmap: false,
    rawfood: false,
    lowSodium: false,
    LowCarbohydrate: false,
    SulfiteSensitivity: false,
    CeliacDisease: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setRestrictions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          What are your specific diet restrictions? Check all that apply
        </label>
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Dietary Restrictions</h2>
          <form>
            <div className="flex flex-col uppercase">
              {Object.keys(restrictions).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name={key}
                    checked={restrictions[key]}
                    onChange={handleCheckboxChange}
                  />
                  {key.replace(/([A-Z])/g, ' $1').trim()} {/* Converts camelCase to readable text */}
                </label>
              ))}
            </div>
          </form>
        </div>
      </div>
      <div className="w-full mx-2 flex-1 mt-5">
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Other? Please Enter Below
        </label>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData.city || ""}
            name="restriction"
            placeholder="Enter Your Restriction Here"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
