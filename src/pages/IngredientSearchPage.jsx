import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function IngredientSearchPage() {

  const [ingredientName, setIngredientName] = useState("");
  const [ingredient, setIngredient] = useState(null);

  const searchIngredient = async () => {

    try {

      const response = await api.get(
        `/ingredient-details/${ingredientName}`
      );

      setIngredient(response.data);

    } catch (error) {
      console.error(error);
      alert("Ingredient not found");
    }

  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Ingredient Analyzer
        </h1>

        <div className="flex justify-center gap-4 mb-8">

          <input
            type="text"
            placeholder="Enter Ingredient Name"
            value={ingredientName}
            onChange={(e) =>
              setIngredientName(e.target.value)
            }
            className="border p-3 rounded-xl w-96"
          />

          <button
            onClick={searchIngredient}
            className="bg-blue-600 text-white px-6 rounded-xl"
          >
            Analyze
          </button>

        </div>

        {ingredient && (

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-4xl font-bold mb-6">
              {ingredient.ingredientName}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-green-50 p-5 rounded-2xl">
                <h3 className="font-bold mb-2">
                  Risk Score
                </h3>

                <p className="text-4xl font-bold text-green-600">
                  {ingredient.riskScore}
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl">
                <h3 className="font-bold mb-2">
                  General Safety
                </h3>

                <p>
                  {ingredient.generalSafety}
                </p>
              </div>

            </div>

            <div className="mt-6 bg-yellow-50 p-5 rounded-2xl">

              <h3 className="font-bold mb-2">
                Warning Message
              </h3>

              <p>
                {ingredient.warningMessage}
              </p>

            </div>

            <div className="mt-6 bg-purple-50 p-5 rounded-2xl">

              <h3 className="font-bold mb-2">
                Effect On Body
              </h3>

              <p>
                {ingredient.effectOnBody}
              </p>

            </div>

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default IngredientSearchPage;