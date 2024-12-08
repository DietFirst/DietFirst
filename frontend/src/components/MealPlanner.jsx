import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./ui/RecipeCard";

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
  const [loading, setLoading] = useState(false);
  const [organizedPlan, setOrganizedPlan] = useState(null);

  const createMealPlan = async () => {
    try {
      setError("");
      setLoading(true);

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
      console.log("MealPlan response:", response.data);
    } catch (error) {
      setError("Failed to create meal plan.");
      console.error(
        "Error creating meal plan:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // useEffect for preparing preferences based on input fields
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

  // useEffect to organize the meal plan once it is fetched
  useEffect(() => {
    if (mealPlan && mealPlan.selection) {
      const plan = mealPlan.selection.map((dayPlan, index) => {
        const sections = dayPlan.sections;
        const meals = [];

        for (const [mealType, mealData] of Object.entries(sections)) {
          const assignedUri = mealData.assigned;

          meals.push({
            mealType,
            assignedUri,
          });
        }

        return {
          dayIndex: index,
          meals,
        };
      });

      setOrganizedPlan(plan);
    }
  }, [mealPlan]);

  // useEffect for fetching recipe details based on the organized plan
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (organizedPlan) {
        const fetchedRecipes = {};

        const recipeIds = [];
        organizedPlan.forEach((day) => {
          day.meals.forEach((meal) => {
            if (!recipesByUri[meal.assignedUri]) {
              recipeIds.push({
                assignedUri: meal.assignedUri,
              });
            }
          });
        });

        try {
          const token = localStorage.getItem("token");

          if (!token) {
            setError("User not authenticated. Please log in.");
            return;
          }

          const recipePromises = recipeIds.map((item) => {
            const recipeId = item.assignedUri.split("#recipe_")[1];

            return axios
              .get(`http://localhost:3000/api/mealplan/recipe/${recipeId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log(
                  "Fetched recipe for assignedUri:",
                  item.assignedUri,
                  response.data,
                );
                return {
                  assignedUri: item.assignedUri,
                  recipe: response.data,
                };
              });
          });

          const recipesData = await Promise.all(recipePromises);

          recipesData.forEach(({ assignedUri, recipe }) => {
            fetchedRecipes[assignedUri] = recipe;
          });

          setRecipesByUri((prevRecipes) => ({
            ...prevRecipes,
            ...fetchedRecipes,
          }));
        } catch (error) {
          console.error("Error fetching recipe details:", error);
        }
      }
    };

    fetchRecipeDetails();
  }, [organizedPlan]);

  return (
    <div className="mx-auto max-w-8xl p-6 mt-[64px] bg-gray-50 py-28">
      <div className="mx-auto max-w-4xl">
      <h2 className="mb-6 text-3xl uppercasetext-center font-bold text-center text-grey border-b-2 border-black pb-2">
          Generate A Meal Plan
        </h2>
      <form className="mb-6 rounded-lg bg-gray-100 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Calories:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Diet:</label>
            <input
              type="text"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              placeholder="Diet (e.g., balanced, high-protein)"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Health Labels:</label>
            <input
              type="text"
              value={health}
              onChange={(e) => setHealth(e.target.value)}
              placeholder="Health Labels (comma-separated)"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Cuisine Type:</label>
            <input
              type="text"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              placeholder="Cuisine Type (comma-separated)"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block font-medium">Meal Types:</label>
            <input
              type="text"
              value={mealTypes}
              onChange={(e) => setMealTypes(e.target.value)}
              placeholder="Meal Types (e.g., Breakfast, Lunch, Dinner)"
              className="w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={createMealPlan}
          disabled={loading}
          className={`mt-4 rounded-lg px-4 py-2 text-white ${
            loading ? "cursor-not-allowed bg-gray-500" : "bg-cyan-600"
          }`}
        >
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </form>
      </div>

      {error && <p className="mb-4 text-red-500">{error}</p>}
      {organizedPlan && (
  <div className="meal-plan-details max-w-screen-lg mx-auto px-4 py-8">
    <h3 className="mb-6 text-3xl font-bold text-gray-800 text-center">Meal Plan Details:</h3>
    {organizedPlan.map((day, index) => (
      <div key={index} className="mb-12">
        <h4 className="mb-4 text-2xl font-semibold text-gray-700">Day {day.dayIndex + 1}</h4>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-full">
          {day.meals.map((meal, idx) => {
            const recipe = recipesByUri[meal.assignedUri];
            console.log("Rendering recipe:", recipe);
            
            // Check if recipe exists
            if (!recipe) {
              return (
                <div key={idx} className="w-full flex justify-center min-h-48 max-h-screen">
                  <div>Recipe not found for this meal</div>
                </div>
              ); // Render a fallback UI if recipe is not found
            }

            return (
              <div key={idx} className="w-full flex justify-center min-h-48 max-h-screen">
                <div>
                  <RecipeCard
                    key={idx}
                    recipe={recipe}  // Pass the valid recipe
                    mealType={meal.mealType}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
}

export default MealPlanner;
