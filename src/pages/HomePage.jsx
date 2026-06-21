import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

function HomePage() {
  const [productName, setProductName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!productName.trim()) return;

    navigate(`/analysis/${productName}`);
  };
  const fetchSuggestions = async (value) => {

  setProductName(value);

  if (value.length < 2) {
    setSuggestions([]);
    return;
  }

  try {

    const response = await api.get(
      `/products/search/name/${value}`
    );

    setSuggestions(response.data);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-16">

        <div className="bg-blue-500/20 px-4 py-2 rounded-full mb-6 border border-blue-500">
          AI Powered Ingredient Analysis
        </div>

        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl leading-tight">
  Discover What’s Really Inside Your Products
</h1>

        <p className="text-slate-300 text-xl mt-6 max-w-2xl">
          Analyze ingredients, identify risks, and find safer
          alternatives using AI-driven product safety insights.
        </p>

        {/* Search Box */}
        <div className="flex mt-10 w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl">

          <input
            type="text"
            placeholder="Search Dove Soap, Lux, Cetaphil..."
            value={productName}
            onChange={(e) => fetchSuggestions(e.target.value)}
            onKeyDown={(e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
}}
            className="flex-1 px-6 py-4 text-black outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 px-8 flex items-center gap-2"
          >
            <Search size={20} />
            Analyze
          </button>

        </div>
        {
  suggestions.length > 0 && (

    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg mt-2 overflow-hidden">

      {suggestions.map((item, index) => (

  <div
    key={index}
    onClick={() => {
      setProductName(item.name);
      setSuggestions([]);
    }}
    className="px-5 py-3 text-left text-black hover:bg-slate-100 cursor-pointer"
  >
    {item.name}
  </div>

))}

    </div>

  )
}

        

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16">

          <div className="bg-white/10 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-3xl font-bold">100+</h2>
            <p className="text-slate-300">Products</p>
          </div>

          <div className="bg-white/10 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-3xl font-bold">1000+</h2>
            <p className="text-slate-300">Ingredients</p>
          </div>

          <div className="bg-white/10 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-3xl font-bold">AI</h2>
            <p className="text-slate-300">Powered Analysis</p>
          </div>

        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HomePage;