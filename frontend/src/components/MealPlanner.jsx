import React, { useState, useEffect } from "react";
import axios from "axios";

function MealPlanner() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [calories, setCalories] = useState("");
  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [mealTypes, setMealTypes] = useState("");

  const [preferences, setPreferences] = useState({});
  const [mealPlan, setMealPlan] = useState(null);
  const [recipesByUri, setRecipesByUri] = useState({});
  const [error, setError] = useState("");

  const createMealPlan = async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/mealplan/create",
        {
          startDate,
          endDate,
          preferences,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMealPlan(response.data);
    } catch (error) {
      setError("Failed to create meal plan.");
      console.error(
        "Error creating meal plan:",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    const slots = mealTypes
      .split(",")
      .map((type) => type.trim())
      .filter((type) => type !== "")
      .map((type) => ({
        name: type,
        dishTypes: [],
        criteria: {
          calories: {
            min: calories ? parseInt(calories) - 100 : 200,
            max: calories ? parseInt(calories) + 100 : 600,
          },
          diet: diet ? [diet] : [],
          health: health
            .split(",")
            .map((h) => h.trim())
            .filter((h) => h !== ""),
          cuisineType: cuisineType
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c !== ""),
        },
      }));

    setPreferences({
      name: "My Meal Plan",
      slots,
    });
  }, [calories, diet, health, cuisineType, mealTypes]);

  useEffect(() => {
    const meals = mealTypes
      .split(",")
      .map((type) => type.trim())
      .filter((type) => type !== "")
      .map((type) => ({
        slot: type,
        dishTypes: [],
        criteria: {
          calories: {
            min: calories ? parseInt(calories) - 100 : 200,
            max: calories ? parseInt(calories) + 100 : 600,
          },
          diet: diet ? [diet] : [],
          health: health
            .split(",")
            .map((h) => h.trim())
            .filter((h) => h !== ""),
          cuisineType: cuisineType
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c !== ""),
        },
      }));

    setPreferences({
      meals,
    });
  }, [calories, diet, health, cuisineType, mealTypes]);

  return (
    <div>
      <h2>Create Meal Plan</h2>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
      />
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        placeholder="Calories"
      />
      <input
        type="text"
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        placeholder="Diet (e.g., balanced, high-protein)"
      />
      <input
        type="text"
        value={health}
        onChange={(e) => setHealth(e.target.value)}
        placeholder="Health Labels (comma-separated)"
      />
      <input
        type="text"
        value={cuisineType}
        onChange={(e) => setCuisineType(e.target.value)}
        placeholder="Cuisine Type (comma-separated)"
      />
      <input
        type="text"
        value={mealTypes}
        onChange={(e) => setMealTypes(e.target.value)}
        placeholder="Meal Types (e.g., Breakfast, Lunch)"
      />
      <button onClick={createMealPlan}>Generate Meal Plan</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {mealPlan && (
        <div>
          <h3>Meal Plan Details:</h3>
          {mealPlan.days.map((day, dayIndex) => (
            <div key={dayIndex}>
              <h4>Date: {day.date}</h4>
              {day.meals.map((meal, mealIndex) => (
                <div key={mealIndex}>
                  <p>
                    <strong>Meal Slot:</strong> {meal.slot}
                  </p>
                  <p>
                    <strong>Recipe URI:</strong> {meal.recipe}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
