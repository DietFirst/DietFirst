import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form/Form";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProgressTracking from "./pages/ProgressTracking";
import RecipeSearch from "./components/RecipeSearch";
import NutritionAnalyzer from "./components/NutritionAnalyzer";
import MealPlanner from "./components/MealPlanner";
import ShoppingList from "./components/ShoppingList";
import Login from "./components/Login";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import Recipes from "./pages/Recipes";
import AutoMealPlanner from "./pages/AutoMealPlanner";
import SavedRecipes from "./pages/SavedRecipes";

function App() {
  return (
    <Router>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/progress" element={<ProgressTracking />} />
        <Route path="/search" element={<RecipeSearch />} />
        <Route path="/analyze" element={<NutritionAnalyzer />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
