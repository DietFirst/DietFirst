import { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import { UseContextProvider, useStepperContext } from "./StepperContext";

import Account from "./steps/Account";
import Details from "./steps/DietRestrictions";
import AllergyRestrictions from "./steps/AllergyRestrictions";
import Calories from "./steps/Calories";
import Final from "./steps/Final";
import Nutrients from "./steps/Nutrients";

function FormContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useStepperContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    "Account Information",
    "Diet Restrictions",
    "Allergy Restrictions",
    "Calories Intake",
    "Nutrients Selection",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <AllergyRestrictions />;
      case 4: 
        return <Calories />;
      case 5:
        return <Nutrients />;
      case 6:
        return <Final />
      default:
        return <Account />;
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;

    if (direction === "next") {
      if (currentStep === 3) {
        // Submit data
        setLoading(true);
        setError("");
        try {
          const API_URL = import.meta.env.VITE_API_URL;
          console.log("SENDING TO BACKEND NOW");
          // Register the user
          const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              username: userData.username,
              email: userData.email,
              password: userData.password,
            }),
          });

          if (!registerResponse.ok) {
            const errorData = await registerResponse.text();
            throw new Error(errorData || "Registration failed");
          }

          const registerData = await registerResponse.json();
          const userId = registerData.userId;

          // Save preferences
          const preferencesResponse = await fetch(`${API_URL}/preferences`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              dietaryRestrictions: userData.dietaryRestrictions,
              healthDiseases: userData.healthDiseases,
              otherDietaryRestriction: userData.otherDietaryRestriction,
              otherHealthProblem: userData.otherHealthProblem,
            }),
          });

          if (!preferencesResponse.ok) {
            const errorData = await preferencesResponse.json();
            throw new Error(errorData.message || "Saving preferences failed");
          }

          newStep++;
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        newStep++;
      }
    } else {
      newStep--;
    }

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <div className="mx-auto rounded-2xl pb-2 bg-white shadow-xl md:w-1/2 mt-32">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">{displayStep(currentStep)}</div>
      </div>

      {/* Display error message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Navigation buttons */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
          loading={loading}
        />
      )}
    </div>
  );
}

export default function Form() {
  return (
    <UseContextProvider>
      <FormContent />
    </UseContextProvider>
  );
}
