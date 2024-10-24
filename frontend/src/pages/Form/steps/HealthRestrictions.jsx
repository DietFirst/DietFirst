import { useState, useEffect } from "react";
import { useStepperContext } from "../StepperContext";

export default function HealthRestrictions() {
  const { userData, setUserData } = useStepperContext();

  const [healthRestrictions, setHealthRestrictions] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setHealthRestrictions((prev) => [...prev, name]);
    } else {
      setHealthRestrictions((prev) => prev.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      healthDiseases: healthRestrictions,
    }));
  }, [healthRestrictions, setUserData]);

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
              {[
                "diabetes",
                "hypertension",
                "heartDisease",
                "highCholesterol",
                "obesity",
                "celiacDisease",
                "lactoseIntolerance",
                "glutenSensitivity",
                "kidneyDisease",
                "liverDisease",
                "thyroidDisorder",
                "autoimmuneDisorder",
                "anxiety",
                "depression",
                "asthma",
              ].map((key) => (
                <label key={key} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    name={key}
                    checked={healthRestrictions.includes(key)}
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
        <label className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Other? Please Enter Below
        </label>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={(e) =>
              setUserData({ ...userData, otherHealthProblem: e.target.value })
            }
            value={userData.otherHealthProblem}
            name="otherHealthProblem"
            placeholder="Enter Your Health Problem Here"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
