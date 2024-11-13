import React, { useState } from "react";
import axios from "axios";

const NutritionAnalyzer = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [nutritionData, setNutritionData] = useState(null);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const analyzeNutrition = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/analyze", {
        ingredients,
      });
      setNutritionData(response.data);
    } catch (error) {
      console.error(
        "Error analyzing nutrition:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div>
      <h2>Nutrition Analyzer</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            placeholder="Enter ingredient (e.g., '1 cup rice')"
          />
        </div>
      ))}
      <button onClick={addIngredientField}>Add Ingredient</button>
      <button onClick={analyzeNutrition}>Analyze</button>

      {nutritionData && (
        <div>
          <h3>Nutrition Facts</h3>
          <p>Calories: {nutritionData.calories}</p>
        </div>
      )}
    </div>
  );
};

export default NutritionAnalyzer;
