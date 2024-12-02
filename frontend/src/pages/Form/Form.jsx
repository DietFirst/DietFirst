import { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import { UseContextProvider, useStepperContext } from "./StepperContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Account from "./steps/Account";
import DietRestrictions from "./steps/DietRestrictions";
import MealsCalories from "./steps/MealsCalories";
import Final from "./steps/Final";
import Nutrients from "./steps/Nutrients";
import AllergyRestrictions from "./steps/AllergyRestrictions";


function FormContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useStepperContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = [
    "Account Information",
    "Diet Restrictions",
    "Allergy Restrictions",
    "Nutrients Selection",
    "Meals & Calories Selection",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <DietRestrictions />;
      case 3:
        return <AllergyRestrictions />;
      case 4:
        return <Nutrients />;
      case 5:
        return <MealsCalories />;
      default:
        return <Final />;
    }
  };

  const handleClick = async (direction) => {
    let newStep = currentStep;

    if (direction === "next") {
      if (currentStep === 5) {
        // Adjust to submit data at the last step before completion
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
              allergyRestrictions: userData.allergyRestrictions,
              caloriesInTake: userData.caloriesInTake,
              nutrientsSelection: userData.nutrientsSelection,
              selectedMeals: userData.selectedMeals,
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
    <div>
 <div className="mx-auto rounded-2xl pb-2 bg-white shadow-xl mb-20 md:w-3/4 mt-32">
      <Navbar></Navbar>
      {/* Stepper Container */}
      <div className="flex">
        {/* Stepper */}
        <div className="flex">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="my-10 p-10 flex-grow">{displayStep(currentStep)}</div>
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
   
   <Footer></Footer>

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
