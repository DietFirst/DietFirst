import React, { useState } from "react";

const RecipeCard = ({ recipe, mealType }) => {
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);
  const [showMoreHealthLabels, setShowMoreHealthLabels] = useState(false);

  // Show only the first 4 ingredients
  const displayedIngredients = showMoreIngredients
    ? recipe.recipe.ingredientLines
    : recipe.recipe.ingredientLines.slice(0, 4);

  // Show only the first 4 health labels
  const displayedHealthLabels = showMoreHealthLabels
    ? recipe.recipe.healthLabels
    : recipe.recipe.healthLabels.slice(0, 4);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      {recipe ? (
        <>
          <img
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
            className="h-48 w-full object-cover"
          />
          <div className="flex h-full flex-col p-4">
            {/* Meal Type */}
            <div className="bg-white px-4 py-2 rounded-md shadow-md text-center mb-4">
              <p className="text-lg font-semibold text-gray-700">{mealType}</p>
            </div>

            {/* Recipe Title */}
            <p className="text-xl font-semibold text-gray-800">{recipe.recipe.label}</p>

            {/* Nutritional Information */}
            <div className="mt-2">
              <p className="text-sm">
                <strong>Calories:</strong> {Math.round(recipe.recipe.calories)} kcal
              </p>
            </div>

            {/* Health and Diet Labels */}
            <div className="mt-2">
              <p className="text-sm font-semibold mb-1">
                <strong>Health Labels:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {displayedHealthLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md shadow-md"
                  >
                    {label}
                  </span>
                ))}
              </div>
              {recipe.recipe.healthLabels.length > 4 && (
                <button
                  onClick={() => setShowMoreHealthLabels(!showMoreHealthLabels)}
                  className="mt-2 text-blue-500 text-sm"
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
                    className="bg-yellow-50 p-2 rounded-md shadow-sm text-gray-700"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
              {recipe.recipe.ingredientLines.length > 4 && (
                <button
                  onClick={() => setShowMoreIngredients(!showMoreIngredients)}
                  className="mt-2 text-blue-500 text-sm"
                >
                  {showMoreIngredients ? "See Less" : "See More"}
                </button>
              )}
            </div>

            {/* Link to Recipe Source */}
            <div className="mt-4">
              <a
                href={recipe.recipe.shareAs}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-blue-500 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-600"
              >
                View Full Recipe
              </a>
            </div>
          </div>
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
