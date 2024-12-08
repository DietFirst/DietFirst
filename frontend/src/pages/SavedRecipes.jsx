import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/ui/RecipeCard";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view saved recipes.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/recipes/saved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSavedRecipes(response.data);
      } catch (err) {
        console.error("Error fetching saved recipes:", err.response?.data || err.message);
        setError("Failed to fetch saved recipes.");
      }
      setIsLoading(false);
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
    <div className="max-w-8xl mx-auto p-6 pt-24 bg-gray-100 py-36">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 mt-20 text-3xl font-bold text-black border-b-2 border-black pb-2">
          Your Saved Recipes
        </h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
      </div>

      {isLoading ? (
        <p>Loading...</p> // Show loading state while fetching data
      ) : savedRecipes.length > 0 ? (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {savedRecipes.map((savedRecipe) => {
            const adaptedRecipe = mapSavedRecipeToRecipeCardFormat(savedRecipe);
            return (
              <RecipeCard
                key={savedRecipe._id}
                recipe={adaptedRecipe}
                mealType={savedRecipe.mealType || "Meal"}
                showSaveButton={false} // Hide the save button for saved recipes
              />
            );
          })}
        </div>
      ) : (
        !error && (
          <p className="mt-6 text-center text-gray-600">
            No saved recipes found.
          </p>
        )
      )}
    </div>
  );
}

export default SavedRecipes;
