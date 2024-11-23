import React, { useState, useEffect } from "react";
import axios from "axios";

function MealPlanner() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [calories, setCalories] = useState("");
  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState([]);
  const [cuisineType, setCuisineType] = useState([]);
  const [mealType, setMealType] = useState([]);

  const [preferences, setPreferences] = useState({});
  const [mealPlan, setMealPlan] = useState(null);
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
    setPreferences({
      calories: calories ? parseInt(calories) : undefined,
      diet,
      health,
      cuisineType,
      mealType,
    });
  }, [calories, diet, health, cuisineType, mealType]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (mealPlan) {
        try {
          const uris = mealPlan.items.map((item) => item.recipe.uri);
          const response = await axios.post(
            "http://localhost:3000/api/recipes/details",
            {
              uris,
            },
          );
          // Handle the response as needed
        } catch (error) {
          console.error(
            "Error fetching recipe details:",
            error.response?.data || error.message,
          );
        }
      }
    };

    fetchRecipeDetails();
  }, [mealPlan]);

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
        value={health.join(",")}
        onChange={(e) => setHealth(e.target.value.split(","))}
        placeholder="Health Labels (comma-separated)"
      />
      <input
        type="text"
        value={cuisineType.join(",")}
        onChange={(e) => setCuisineType(e.target.value.split(","))}
        placeholder="Cuisine Type (comma-separated)"
      />
      <input
        type="text"
        value={mealType.join(",")}
        onChange={(e) => setMealType(e.target.value.split(","))}
        placeholder="Meal Type (comma-separated)"
      />
      <button onClick={createMealPlan}>Generate Meal Plan</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {mealPlan && (
        <div>
          <h3>Meal Plan Details:</h3>
          {mealPlan.items.map((item, index) => (
            <div key={index}>
              <p>
                <strong>Date:</strong> {item.date}
              </p>
              <p>
                <strong>Meal Type:</strong> {item.mealType}
              </p>
              <p>
                <strong>Recipe:</strong> {item.recipe.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
