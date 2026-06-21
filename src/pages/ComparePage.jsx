import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search } from "lucide-react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ComparePage() {
  const [product1, setProduct1] = useState("");
  const [product2, setProduct2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const compareProducts = async () => {

  try {

    setLoading(true);
    setError("");

    const response1 = await api.get(
      `/products/full-analysis/${product1}`
    );

    const response2 = await api.get(
      `/products/full-analysis/${product2}`
    );

    setData1(response1.data);
    setData2(response2.data);

  } catch (error) {

  console.error(error);

  setError(
    "Unable to analyze product. Please check product name and try again."
  );

} finally {

    setLoading(false);

  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Compare Products
        </h1>

        <div className="flex gap-4 justify-center mb-8">

          <input
            type="text"
            placeholder="Product 1"
            value={product1}
            onChange={(e) => setProduct1(e.target.value)}
            onKeyDown={(e) => {
  if (e.key === "Enter") {
    compareProducts();
  }
}}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Product 2"
            value={product2}
            onChange={(e) => setProduct2(e.target.value)}
            onKeyDown={(e) => {
  if (e.key === "Enter") {
    compareProducts();
  }
}}
            className="border p-3 rounded-xl"
          />

          
            <button
  onClick={compareProducts}
  disabled={loading}
  className={`px-6 rounded-xl text-white ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {loading ? "Analyzing..." : "Compare"}
</button>
{error && (

  <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-6 text-center">

    {error}

  </div>

)}

        </div>
        {loading && (

  <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

    <h2 className="text-2xl font-bold mt-6">
      Analyzing Products...
    </h2>

    <p className="text-gray-600 mt-3">
      Please wait while AI discovers ingredients,
      generates safety data and compares products.
    </p>

  </div>

)}

        {data1 && data2 && (

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="mb-8 text-center">

              <div className="bg-green-100 border border-green-300 rounded-3xl p-6">

                <h2 className="text-3xl font-bold text-green-700 mb-2">
                  🏆 Recommended Product
                </h2>

                <p className="text-2xl font-semibold">
                  {data1.overallScore > data2.overallScore
                    ? data1.productName
                    : data2.productName}
                </p>

                <p className="mt-3 text-gray-700">
                  Higher safety score and better ingredient profile.
                </p>

              </div>

            </div>

            <h2 className="text-3xl font-bold text-center mb-8">
              {data1.productName} VS {data2.productName}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">

              <div className="bg-blue-50 rounded-3xl p-6 text-center">

                <h3 className="text-2xl font-bold mb-3">
                  {data1.productName}
                </h3>

                <div className="text-5xl font-bold text-blue-600">
                  {data1.overallScore}
                </div>

                <p className="text-gray-600 mt-2">
                  Safety Score
                </p>

              </div>

              <div className="bg-green-50 rounded-3xl p-6 text-center">

                <h3 className="text-2xl font-bold mb-3">
                  {data2.productName}
                </h3>

                <div className="text-5xl font-bold text-green-600">
                  {data2.overallScore}
                </div>

                <p className="text-gray-600 mt-2">
                  Safety Score
                </p>

              </div>

            </div>

            <table className="w-full text-center">

              <thead>
                <tr className="border-b">
                  <th className="p-4">Feature</th>
                  <th>{data1.productName}</th>
                  <th>{data2.productName}</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="p-4 font-bold">
                    Safety Score
                  </td>
                  <td>{data1.overallScore}</td>
                  <td>{data2.overallScore}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-bold">
                    Safe Ingredients
                  </td>
                  <td>{data1.safeIngredients.length}</td>
                  <td>{data2.safeIngredients.length}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-4 font-bold">
                    Caution Ingredients
                  </td>
                  <td>{data1.cautionIngredients.length}</td>
                  <td>{data2.cautionIngredients.length}</td>
                </tr>

                <tr>
                  <td className="p-4 font-bold">
                    High Risk Ingredients
                  </td>
                  <td>{data1.highRiskIngredients.length}</td>
                  <td>{data2.highRiskIngredients.length}</td>
                </tr>

              </tbody>

            </table>

          </div>

        )}

      </div>

      <Footer />
    </>
  );
}

export default ComparePage;