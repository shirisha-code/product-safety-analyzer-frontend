import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AnalysisPage from "./pages/AnalysisPage";
import ComparePage from "./pages/ComparePage";
import IngredientSearchPage from "./pages/IngredientSearchPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/analysis/:id" element={<AnalysisPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/ingredient-search" element={<IngredientSearchPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;