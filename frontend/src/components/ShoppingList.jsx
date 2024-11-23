import React, { useState } from "react";
import axios from "axios";

function ShoppingList({ meals }) {
  const [shoppingList, setShoppingList] = useState(null);
  const [error, setError] = useState("");

  const generateShoppingList = async () => {
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:3000/api/shoppinglist/generate",
        {
          meals,
        },
      );
      setShoppingList(response.data);
    } catch (error) {
      setError("Failed to generate shopping list.");
      console.error(
        "Error generating shopping list:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div>
      <button onClick={generateShoppingList}>Generate Shopping List</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {shoppingList && <div>{/* items */}</div>}
    </div>
  );
}

export default ShoppingList;
