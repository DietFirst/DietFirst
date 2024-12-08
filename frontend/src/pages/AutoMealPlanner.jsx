import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/ui/RecipeCard";

function AutoMealPlanner() {
  const [preferences, setPreferences] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [organizedPlan, setOrganizedPlan] = useState(null);
  const [recipesByUri, setRecipesByUri] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/preferences/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const userPrefs = response.data;
        const healthLabels = userPrefs.allergyRestrictions.map((h) =>
          h.toUpperCase().replace(/-/g, "_").replace(/\s/g, "_"),
        );

        const dietLabels = userPrefs.dietaryRestrictions.map((d) =>
          d.toUpperCase().replace(/-/g, "_").replace(/\s/g, "_"),
        );

        const mealTypeArray = ["Breakfast", "Lunch", "Dinner"];

        const sections = {};
        mealTypeArray.forEach((mealType) => {
          sections[mealType] = {
            accept: {
              all: [{ dish: [] }, { meal: [mealType.toLowerCase()] }],
            },
            fit: {
              ENERC_KCAL: {
                min: userPrefs.caloriesInTake.min || 200,
                max: userPrefs.caloriesInTake.max || 600,
              },
            },
          };
        });

        const plan = {
          accept: {
            all: [{ health: healthLabels }, { diet: dietLabels }],
          },
          fit: {},
          sections,
        };

        setPreferences(plan);
      } catch (error) {
        setError("Failed to fetch user preferences");
        console.error(
          "Error fetching user preferences:",
          error.response?.data || error.message,
        );
      }
    };

    fetchUserPreferences();
  }, []);

  useEffect(() => {
    const createMealPlan = async () => {
      if (!preferences) return;

      try {
        setError("");
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const startDate = new Date().toISOString().split("T")[0];
        const endDateObj = new Date();
        endDateObj.setDate(endDateObj.getDate() + 6);
        const endDate = endDateObj.toISOString().split("T")[0];

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
      } finally {
        setLoading(false);
      }
    };

    createMealPlan();
  }, [preferences]);

  useEffect(() => {
    if (mealPlan && mealPlan.selection) {
      const plan = mealPlan.selection.map((dayPlan, index) => {
        const sections = dayPlan.sections;
        const meals = [];

        for (const [mealType, mealData] of Object.entries(sections)) {
          const assignedUri = mealData.assigned;
          meals.push({ mealType, assignedUri });
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
      if (!organizedPlan) return;

      const fetchedRecipes = {};
      const recipeIds = [];

      organizedPlan.forEach((day) => {
        day.meals.forEach((meal) => {
          if (!recipesByUri[meal.assignedUri]) {
            recipeIds.push({ assignedUri: meal.assignedUri });
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

        setRecipesByUri((prev) => ({ ...prev, ...fetchedRecipes }));
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [organizedPlan]);

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="mx-auto max-w-4xl">
        {loading && <p>Generating your meal plan...</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
      </div>

      {organizedPlan && (
        <div className="meal-plan-details mx-auto max-w-screen-lg px-4 py-8">
          <h3 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Meal Plan Details:
          </h3>
          {organizedPlan.map((day, index) => (
            <div key={index} className="mb-12">
              <h4 className="mb-4 text-2xl font-semibold text-gray-700">
                Day {day.dayIndex + 1}
              </h4>
              <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {day.meals.map((meal, idx) => {
                  const recipe = recipesByUri[meal.assignedUri];
                  if (!recipe) {
                    return (
                      <div
                        key={idx}
                        className="flex max-h-screen min-h-48 w-full justify-center"
                      >
                        <div>Recipe not found for this meal</div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="flex max-h-screen min-h-48 w-full justify-center"
                    >
                      <RecipeCard
                        key={idx}
                        recipe={recipe}
                        mealType={meal.mealType}
                      />
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

export default AutoMealPlanner;
