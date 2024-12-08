import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/ui/RecipeCard";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view saved recipes.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/recipes/saved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setSavedRecipes(response.data);
      } catch (err) {
        console.error(
          "Error fetching saved recipes:",
          err.response?.data || err.message,
        );
        setError("Failed to fetch saved recipes.");
      }
    };

    fetchSavedRecipes();
  }, []);

  // Map each saved recipe from DB into the format expected by RecipeCard
  const mapSavedRecipeToRecipeCardFormat = (savedRecipe) => {
    return {
      recipe: {
        label: savedRecipe.label,
        image: savedRecipe.image,
        ingredientLines: savedRecipe.ingredients || [],
        healthLabels: savedRecipe.healthLabels || [],
        dietLabels: savedRecipe.dietLabels || [],
        shareAs: savedRecipe.shareAs,
        calories: savedRecipe.calories,
      },
    };
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold">Your Saved Recipes</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {savedRecipes.map((savedRecipe, idx) => {
            const adaptedRecipe = mapSavedRecipeToRecipeCardFormat(savedRecipe);
            return (
              <RecipeCard
                key={savedRecipe._id}
                recipe={adaptedRecipe}
                mealType={savedRecipe.mealType || "Meal"}
              />
            );
          })}
        </div>
      ) : (
        !error && <p>No saved recipes found.</p>
      )}
    </div>
  );
}

export default SavedRecipes;
