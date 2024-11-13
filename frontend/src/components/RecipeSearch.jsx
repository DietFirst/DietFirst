import React, { useState } from "react";
import axios from "axios";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/recipes", {
        params: { query },
      });
      setRecipes(response.data.hits || response.data.results || []);
    } catch (error) {
      console.error(
        "Error fetching recipes:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes"
      />
      <button onClick={fetchRecipes}>Search</button>
      <ul>
        {recipes.map((recipeData, index) => (
          <li key={index}>
            <h3>{recipeData.recipe.label}</h3>
            <img src={recipeData.recipe.image} alt={recipeData.recipe.label} />
            <p>Source: {recipeData.recipe.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSearch;
