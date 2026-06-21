function IngredientModal({
  ingredient,
  details,
  onClose
}) {
  if (!ingredient) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-3xl p-8 w-[650px] max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            {ingredient}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl"
          >
            ✖
          </button>

        </div>

        {!details ? (

          <p>Loading...</p>

        ) : (

          <div className="space-y-5">

            <div>
              <h3 className="font-bold text-lg">
                Risk Score
              </h3>

              <p>{details.riskScore}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">
                General Safety
              </h3>

              <p>{details.generalSafety}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Warning Message
              </h3>

              <p>{details.warningMessage}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Effect On Body
              </h3>

              <p>{details.effectOnBody}</p>
            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default IngredientModal;