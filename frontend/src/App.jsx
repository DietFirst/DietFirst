import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form/Form";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProgressTracking from "./pages/ProgressTracking";
import RecipeSearch from "./components/RecipeSearch";
import NutritionAnalyzer from "./components/NutritionAnalyzer";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />{" "}
        <Route path="/progress" element={<ProgressTracking />} />
        <Route path="/search" element={<RecipeSearch />} />
        <Route path="/analyze" element={<NutritionAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
