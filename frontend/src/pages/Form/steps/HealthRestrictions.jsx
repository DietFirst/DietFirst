import { useState } from 'react'; // Ensure you import useState
import { useStepperContext } from "../StepperContext";

export default function HealthRestrictions() {
  const { userData, setUserData } = useStepperContext();

  const [healthRestrictions, setHealthRestrictions] = useState({
    diabetes: false,
    hypertension: false,
    heartDisease: false,
    highCholesterol: false,
    obesity: false,
    celiacDisease: false,
    lactoseIntolerance: false,
    glutenSensitivity: false,
    kidneyDisease: false,
    liverDisease: false,
    thyroidDisorder: false,
    autoimmuneDisorder: false,
    anxiety: false,
    depression: false,
    asthma: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setHealthRestrictions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          What are your specific health problems? Check all that apply
        </label>
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Health Diseases</h2>
          <form>
            <div className="flex flex-col uppercase">
              {Object.keys(healthRestrictions).map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name={key}
                    checked={healthRestrictions[key]} // Updated from `restrictions[key]`
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
            value={userData.healthRestrictions || ""} // Updated from `userData.city`
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
