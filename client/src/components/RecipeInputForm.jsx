import React, { useState } from 'react';
import axios from 'axios';

const RecipeInputForm = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    // Basic validation for empty ingredients input
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }

    // Reset error, recipes, and start loading
    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      // Make API request to the backend
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/recipes/generate`,
        { ingredients }
      );

      // Check if the response contains data and set recipes
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setRecipes(res.data);  // Assuming the response is an array of recipes
      } else {
        setError('No recipes found for the given ingredients.');
      }
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError('Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Generate Recipes</h1>

      {/* Ingredients input field */}
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (e.g., chicken, tomato)"
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      />

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {/* Error message display */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Display recipes if found */}
      {recipes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Recipes Found:</h2>
          <ul className="space-y-4">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="p-4 border rounded-md shadow-sm">
                <h3 className="font-bold text-lg">{recipe.title}</h3>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full max-w-sm mt-2 rounded-md"
                />
                <p className="mt-2">{recipe.summary}</p> {/* Assuming `summary` field exists */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeInputForm;
