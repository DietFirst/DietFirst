import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeCard = ({ recipe, mealType, showSaveButton = true }) => {
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);
  const [showMoreHealthLabels, setShowMoreHealthLabels] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Show only the first 4 ingredients
  const displayedIngredients = showMoreIngredients
    ? recipe.recipe.ingredientLines
    : recipe.recipe.ingredientLines.slice(0, 4);

  // Show only the first 4 health labels
  const displayedHealthLabels = showMoreHealthLabels
    ? recipe.recipe.healthLabels
    : recipe.recipe.healthLabels.slice(0, 4);

  const handleSaveRecipe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSaveMessage("You must be logged in to save recipes.");
        toast.error("You must be logged in to save recipes.");
        return;
      }

      const recipeData = {
        label: recipe.recipe.label,
        image: recipe.recipe.image,
        source: recipe.recipe.source,
        shareAs: recipe.recipe.shareAs,
        ingredients: recipe.recipe.ingredientLines,
        healthLabels: recipe.recipe.healthLabels,
        dietLabels: recipe.recipe.dietLabels,
        mealType: mealType,
        calories: Math.round(recipe.recipe.calories),
        uri: recipe.recipe.uri,
      };

      const response = await axios.post(
        "http://localhost:3000/api/recipes/save",
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSaveMessage("Recipe saved successfully!");
        toast.success("Recipe saved successfully!");
      } else {
        setSaveMessage("Failed to save recipe.");
        toast.error("Failed to save recipe.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error.response?.data || error.message);
      setSaveMessage("Error saving recipe.");
      toast.error("Error saving recipe.");
    }
  };

  return (
    <div className="w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      {recipe ? (
        <>
          <img
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
            className="h-48 w-full object-cover"
          />
          <div className="flex h-full max-h-[500px] flex-col overflow-y-auto p-4">
            {/* Meal Type */}
            <div className="mb-4 rounded-md bg-white px-4 py-2 text-center shadow-md">
              <p className="text-lg font-semibold text-gray-700">{mealType}</p>
            </div>

            {/* Recipe Title */}
            <p className="text-xl font-semibold text-gray-800">
              {recipe.recipe.label}
            </p>

            {/* Nutritional Information */}
            <div className="mt-2">
              <p className="text-sm">
                <strong>Calories:</strong> {Math.round(recipe.recipe.calories)}{" "}
                kcal
              </p>
            </div>

            {/* Health and Diet Labels */}
            <div className="mt-2">
              <p className="mb-1 text-sm font-semibold">
                <strong>Health Labels:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {displayedHealthLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-800 shadow-md"
                  >
                    {label}
                  </span>
                ))}
              </div>
              {recipe.recipe.healthLabels.length > 4 && (
                <button
                  onClick={() => setShowMoreHealthLabels(!showMoreHealthLabels)}
                  className="mt-2 text-sm text-blue-500"
                >
                  {showMoreHealthLabels ? "See Less" : "See More"}
                </button>
              )}
            </div>

            {/* Ingredients */}
            <div className="mt-4">
              <p className="text-sm font-semibold">Ingredients:</p>
              <ul className="list-disc pl-6 text-sm">
                {displayedIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="rounded-md bg-yellow-50 p-2 text-gray-700 shadow-sm"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
              {recipe.recipe.ingredientLines.length > 4 && (
                <button
                  onClick={() => setShowMoreIngredients(!showMoreIngredients)}
                  className="mt-2 text-sm text-blue-500"
                >
                  {showMoreIngredients ? "See Less" : "See More"}
                </button>
              )}
            </div>

            {/* Link to Recipe Source */}
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={recipe.recipe.shareAs}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-center text-sm text-white hover:bg-blue-600"
              >
                View Full Recipe
              </a>

              {/* Save Recipe Button (conditionally rendered) */}
              {showSaveButton && (
                <button
                  onClick={handleSaveRecipe}
                  className="rounded-md bg-green-500 px-4 py-2 text-center text-sm text-white hover:bg-green-600"
                >
                  Save Recipe
                </button>
              )}

              {/* Save Message */}
              {saveMessage && (
                <p className="mt-2 text-center text-sm text-gray-700">
                  {saveMessage}
                </p>
              )}
            </div>
          </div>
          <ToastContainer />
        </>
      ) : (
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-sm">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
