import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeResult() {
  const location = useLocation();
  const recipe = location.state?.recipe;

  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    alert('✅ Recipe saved successfully!');
  };

  if (!recipe) {
    return <div className="text-center text-red-500 mt-10">No recipe data available</div>;
  }

  const {
    title,
    image,
    usedIngredients = [],
    missedIngredients = [],
    instructions = [],
    nutrition = {},
    readyInMinutes = '30 min',
    calories = '160',
  } = recipe;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-10 space-y-6">
      <h2 className="text-3xl font-bold text-center text-green-700">{title}</h2>
      <img src={image || 'https://media.istockphoto.com/id/1396307254/photo/palak-paneer-and-tandoori-roti.jpg?s=1024x1024&w=is&k=20&c=CkUaahlPOVY0WkkVMfvpdo6LTkpwS4LamSWt8isGCB0='} alt={title} className="w-full h-72 object-cover rounded-xl shadow-md" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Used Ingredients</h3>
          <ul className="list-disc list-inside text-gray-600">
            {usedIngredients.length > 0 ? (
              usedIngredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
            ) : (
              <li className="text-gray-500">No ingredients available.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700">Missed Ingredients</h3>
          <ul className="list-disc list-inside text-gray-600">
            {missedIngredients.length > 0 ? (
              missedIngredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
            ) : (
              <li className="text-gray-500">No missing ingredients.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl">
        <h3 className="text-lg font-bold mb-2">Cooking Details</h3>
        <p><strong>Cooking Time:</strong> {readyInMinutes}</p>
        <p><strong>Calories:</strong> {calories}</p>
        <p><strong>Nutritional Info:</strong> {nutrition.summary || 'N/A'}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Cooking Steps</h3>
        {instructions.length > 0 ? (
          <ol className="list-decimal list-inside space-y-1 text-gray-700">
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500">No cooking instructions available.</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSaveRecipe}
          className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition"
        >
          💾 Save Recipe
        </button>
      </div>
    </div>
  );
} 