import React, { useEffect, useState } from "react";
import RecipeCard from "/Users/harmainmunir/Desktop/DietFirst/diet-first/frontend/src/components/ui/RecipeCard.jsx";

const Recipes = ({ organizedPlan, recipesByUri }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizedPlan || !recipesByUri) {
      setError("No meal plan or recipes found.");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [organizedPlan, recipesByUri]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipes-page">
      {error && <p className="mb-4 text-red-500">{error}</p>}

      {organizedPlan && (
        <div className="meal-plan-details max-w-screen-lg mx-auto px-4 py-8">
          <h3 className="mb-4 text-2xl font-bold text-gray-800">Meal Plan Details:</h3>
          {organizedPlan.map((day, index) => (
            <div key={day.dayIndex} className="mb-12">
              <h4 className="mb-4 text-xl font-semibold text-gray-700">Day {day.dayIndex + 1}</h4>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
                {day.meals.map((meal, idx) => {
                  const recipe = recipesByUri[meal.assignedUri];
                  if (!recipe) {
                    return <div key={meal.assignedUri}>Recipe not found for {meal.assignedUri}</div>;
                  }

                  return (
                    <RecipeCard
                      key={meal.assignedUri}  
                      recipe={recipe}
                      mealType={meal.mealType}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
