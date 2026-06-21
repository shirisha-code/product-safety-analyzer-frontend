import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IngredientModal from "../components/IngredientModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import jsPDF from "jspdf";

function AnalysisPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedIngredient, setSelectedIngredient] =
    useState(null);

  const [ingredientDetails, setIngredientDetails] =
    useState(null);

  const [question, setQuestion] =
    useState("");

  const [aiAnswer, setAiAnswer] =
    useState("");

  const [chatLoading, setChatLoading] =
    useState(false);
      useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {

    try {

      const response = await api.get(
        `/products/full-analysis/${id}`
      );

      setData(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };
    const fetchIngredientDetails =
    async (ingredientName) => {

      try {

        const response = await api.get(
          `/ingredient-details/${ingredientName}`
        );

        setIngredientDetails(
          response.data
        );

      } catch (error) {

        console.error(error);
      }
  };
    const askAI = async () => {

    if (!question.trim()) return;

    setChatLoading(true);

    try {

      const response =
        await api.post(
          "/chat",
          {
            productName:
              data.productName,

            summary:
              data.analysisSummary,

            question
          }
        );

      setAiAnswer(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setChatLoading(false);
    }
  };
    const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "Product Safety Report",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      `Product: ${data.productName}`,
      20,
      40
    );

    doc.text(
      `Brand: ${data.brand}`,
      20,
      50
    );

    doc.text(
      `Category: ${data.category}`,
      20,
      60
    );

    doc.text(
      `Safety Score: ${data.overallScore}`,
      20,
      70
    );

    doc.save(
      `${data.productName}.pdf`
    );
  };
    const scoreColor =
    data?.overallScore >= 80
      ? "border-green-500"
      : data?.overallScore >= 60
      ? "border-yellow-500"
      : "border-red-500";

  const scoreStatus =
    data?.overallScore >= 80
      ? "SAFE"
      : data?.overallScore >= 60
      ? "CAUTION"
      : "RISK";

  if (loading) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-lg font-semibold">
          Analyzing Product...
        </p>

      </div>

    );
  }
    return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-xl"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">

          <div className="flex flex-col md:flex-row justify-between items-center">

            <div>

              <h1 className="text-5xl font-bold mb-3">
                {data.productName}
              </h1>

              <p className="text-lg text-gray-600">
                Brand: {data.brand}
              </p>

              <p className="text-lg text-gray-600">
                Category: {data.category}
              </p>

            </div>

            <div className="mt-6 md:mt-0 text-center">

              <div
                className={`w-36 h-36 rounded-full border-8 ${scoreColor}
                flex flex-col items-center justify-center`}
              >

                <span className="text-4xl font-bold">
                  {data.overallScore}
                </span>

                <span className="font-bold text-sm">
                  {scoreStatus}
                </span>

                <span className="text-sm text-gray-500">
                  /100
                </span>

              </div>

              <button
                onClick={downloadPDF}
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                Download PDF
              </button>

            </div>

          </div>

        </div>
                <div className="grid md:grid-cols-3 gap-4 mb-6">

          <div className="bg-green-100 rounded-2xl p-6 text-center">

            <h2 className="text-4xl font-bold text-green-700">
              {data.safeIngredients?.length || 0}
            </h2>

            <p>Safe Ingredients</p>

          </div>

          <div className="bg-yellow-100 rounded-2xl p-6 text-center">

            <h2 className="text-4xl font-bold text-yellow-700">
              {data.cautionIngredients?.length || 0}
            </h2>

            <p>Caution Ingredients</p>

          </div>

          <div className="bg-red-100 rounded-2xl p-6 text-center">

            <h2 className="text-4xl font-bold text-red-700">
              {data.highRiskIngredients?.length || 0}
            </h2>

            <p>High Risk Ingredients</p>

          </div>

        </div>
                <div className="bg-white rounded-3xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4 text-green-600">
            🟢 Safe Ingredients
          </h2>

          <div className="flex flex-wrap gap-3">

            {data.safeIngredients?.map((item, index) => (

              <span
                key={index}
                onClick={() => {
                  setSelectedIngredient(item);
                  fetchIngredientDetails(item);
                }}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full cursor-pointer hover:bg-green-200"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4 text-yellow-600">
            🟡 Caution Ingredients
          </h2>

          <div className="flex flex-wrap gap-3">

            {data.cautionIngredients?.map((item, index) => (

              <span
                key={index}
                onClick={() => {
                  setSelectedIngredient(item);
                  fetchIngredientDetails(item);
                }}
                className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full cursor-pointer hover:bg-yellow-200"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4 text-red-600">
            🔴 High Risk Ingredients
          </h2>

          <div className="flex flex-wrap gap-3">

            {data.highRiskIngredients?.map((item, index) => (

              <span
                key={index}
                onClick={() => {
                  setSelectedIngredient(item);
                  fetchIngredientDetails(item);
                }}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-full cursor-pointer hover:bg-red-200"
              >
                {item}
              </span>

            ))}

          </div>

        </div>
                <div className="bg-white rounded-3xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            📋 AI Safety Assessment
          </h2>

          <p className="leading-8 text-gray-700">
            {data.analysisSummary}
          </p>

        </div>
                <div className="bg-white rounded-3xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            🤖 Ask AI About This Product
          </h2>

          <div className="flex gap-3">

            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI();
                }
              }}
              placeholder="Can sensitive skin use this product?"
              className="flex-1 border p-3 rounded-xl"
            />

            <button
              onClick={askAI}
              className="bg-blue-600 text-white px-6 rounded-xl"
            >
              Ask AI
            </button>

          </div>

          {chatLoading && (

            <p className="mt-4 text-blue-600">
              Thinking...
            </p>

          )}

          {aiAnswer && (

            <div className="mt-5 bg-slate-100 p-4 rounded-2xl">

              <h3 className="font-bold mb-2">
                AI Answer
              </h3>

              <p>{aiAnswer}</p>

            </div>

          )}

        </div>
                <div className="bg-white rounded-3xl shadow-md p-6">

          <h2 className="text-3xl font-bold mb-6">
            ⭐ Recommended Products
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.recommendations?.map((item, index) => (

              <div
                key={index}
                className="border rounded-3xl p-6 shadow hover:shadow-xl"
              >

                <h3 className="text-xl font-bold mb-3">
                  {item.productName}
                </h3>

                <div className="mb-4">

                  <span className="bg-green-500 text-white px-4 py-2 rounded-full">
                    Score: {item.score}
                  </span>

                </div>

                <div className="flex flex-col gap-2">

                  {item.amazonLink && (
                    <a
                      href={item.amazonLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-yellow-500 text-white text-center py-2 rounded-xl"
                    >
                      Amazon
                    </a>
                  )}

                  {item.flipkartLink && (
                    <a
                      href={item.flipkartLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-500 text-white text-center py-2 rounded-xl"
                    >
                      Flipkart
                    </a>
                  )}

                  {item.nykaaLink && (
                    <a
                      href={item.nykaaLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-pink-500 text-white text-center py-2 rounded-xl"
                    >
                      Nykaa
                    </a>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>
                <IngredientModal
          ingredient={selectedIngredient}
          details={ingredientDetails}
          onClose={() => {
            setSelectedIngredient(null);
            setIngredientDetails(null);
          }}
        />

      </div>

      <Footer />

    </>
  );
}

export default AnalysisPage;
