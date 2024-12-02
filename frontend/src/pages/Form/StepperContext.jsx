import React, { createContext, useContext, useState } from "react";

const StepperContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    dietaryRestrictions: [],
    allergyRestrictions: [],
    caloriesInTake: null,
    nutrientsSelection: [],
    selectedMeals: {
      Breakfast: false,
      Lunch: false,
      Dinner: false
    },
  });

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
};

export const useStepperContext = () => useContext(StepperContext);
