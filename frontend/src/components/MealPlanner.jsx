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
  const [groupedAssignments, setGroupedAssignments] = useState(null);
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
      console.log("MealPlan data:", response.data);
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
    if (mealPlan && mealPlan.selection) {
      const plan = mealPlan.selection.map((dayPlan, index) => {
        const sections = dayPlan.sections;
        const meals = [];

        for (const [mealType, mealData] of Object.entries(sections)) {
          const assignedUri = mealData.assigned;
          const recipeLink = mealData._links?.self?.href;

          meals.push({
            mealType,
            assignedUri,
            recipeLink,
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

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (organizedPlan) {
        const fetchedRecipes = {};

        const recipeLinks = [];
        organizedPlan.forEach((day) => {
          day.meals.forEach((meal) => {
            if (!recipesByUri[meal.assignedUri]) {
              recipeLinks.push({
                assignedUri: meal.assignedUri,
                recipeLink: meal.recipeLink,
              });
            }
          });
        });

        try {
          const recipePromises = recipeLinks.map((item) =>
            axios.get(item.recipeLink).then((response) => ({
              assignedUri: item.assignedUri,
              recipe: response.data,
            })),
          );

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
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Create Meal Plan</h2>
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
            loading ? "cursor-not-allowed bg-gray-500" : "bg-green-500"
          }`}
        >
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </form>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {organizedPlan && (
        <div className="meal-plan-details">
          <h3 className="mb-4 text-xl font-bold">Meal Plan Details:</h3>
          {organizedPlan.map((day, index) => (
            <div key={index} className="mb-8">
              <h4 className="mb-4 text-lg font-semibold">
                Day {day.dayIndex + 1}
              </h4>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {day.meals.map((meal, idx) => {
                  const recipeData = recipesByUri[meal.assignedUri];
                  const recipe = recipeData?.recipe;
                  return (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                    >
                      {recipe ? (
                        <>
                          <img
                            src={recipe.image}
                            alt={recipe.label}
                            className="h-48 w-full object-cover"
                          />
                          <div className="flex h-full flex-col p-4">
                            <p className="mb-2 text-sm capitalize text-gray-500">
                              {meal.mealType}
                            </p>
                            <h5 className="mb-2 flex-grow text-lg font-semibold">
                              {recipe.label}
                            </h5>
                            <p className="mb-4 text-sm text-gray-600">
                              {Math.round(recipe.calories)} kcal
                            </p>
                            <a
                              href={recipe.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-block rounded-lg bg-blue-500 px-4 py-2 text-center text-white transition-colors duration-300 hover:bg-blue-600"
                            >
                              View Full Recipe
                            </a>
                          </div>
                        </>
                      ) : (
                        <p className="p-4">Loading recipe details...</p>
                      )}
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
