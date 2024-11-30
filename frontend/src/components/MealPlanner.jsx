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

      console.log("Preferences being sent:", preferences);

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
    const mealTypeArray = mealTypes
      .split(",")
      .map((type) => type.trim())
      .filter((type) => type !== "");

    const healthLabels = health
      ? health
          .split(",")
          .map((h) =>
            h.trim().toUpperCase().replace(/-/g, "_").replace(/\s/g, "_"),
          )
          .filter((h) => h !== "")
      : [];

    const dietLabels = diet
      ? diet
          .split(",")
          .map((d) =>
            d.trim().toUpperCase().replace(/-/g, "_").replace(/\s/g, "_"),
          )
          .filter((d) => d !== "")
      : [];

    const cuisineTypes = cuisineType
      ? cuisineType
          .split(",")
          .map((c) => c.trim().toLowerCase())
          .filter((c) => c !== "")
      : [];

    const sections = {};
    mealTypeArray.forEach((mealType) => {
      sections[mealType] = {
        accept: {
          all: [
            {
              dish: [],
            },
            {
              meal: [mealType.toLowerCase()],
            },
          ],
        },
        fit: {
          ENERC_KCAL: {
            min: calories ? parseInt(calories) - 100 : 200,
            max: calories ? parseInt(calories) + 100 : 600,
          },
        },
      };
    });

    const plan = {
      accept: {
        all: [
          {
            health: healthLabels,
          },
          {
            diet: dietLabels,
          },
        ],
      },
      fit: {},
      sections,
    };

    setPreferences(plan);
  }, [calories, diet, health, cuisineType, mealTypes]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (mealPlan) {
        try {
          const token = localStorage.getItem("token");
          const uris = [];
          mealPlan.days.forEach((day) => {
            day.meals.forEach((meal) => {
              uris.push(meal.recipe);
            });
          });

          const response = await axios.post(
            "http://localhost:3000/api/recipes/details",
            { uris },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const recipesMap = {};
          response.data.forEach((recipe) => {
            recipesMap[recipe.uri] = recipe;
          });

          setRecipesByUri(recipesMap);
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
                  {recipesByUri[meal.recipe] ? (
                    <>
                      <p>
                        <strong>Recipe:</strong>{" "}
                        {recipesByUri[meal.recipe].label}
                      </p>
                      <img
                        src={recipesByUri[meal.recipe].image}
                        alt={recipesByUri[meal.recipe].label}
                        width="200"
                      />
                      <p>
                        <strong>Calories:</strong>{" "}
                        {Math.round(recipesByUri[meal.recipe].calories)} kcal
                      </p>
                      <a
                        href={recipesByUri[meal.recipe].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Full Recipe
                      </a>
                    </>
                  ) : (
                    <p>Loading recipe details...</p>
                  )}
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
