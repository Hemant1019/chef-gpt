import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeResult = () => {
  const { recipeId } = useParams(); // Get the recipeId from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);  // Start loading
        const response = await axios.get(`/api/recipes/${recipeId}`);  // API request to backend
        if (response.data) {
          setRecipe(response.data);  // Set recipe data on success
        } else {
          setError('Recipe not found');  // Handle case where no recipe data is returned
        }
        setLoading(false);  // Stop loading
      } catch (err) {
        setError('Failed to load recipe');  // Handle errors
        setLoading(false);  // Stop loading
      }
    };

    fetchRecipe();  // Call the fetchRecipe function when the component mounts
  }, [recipeId]);  // Re-run the effect when recipeId changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-md rounded-md mb-4"
      />

      {/* Ingredients Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc pl-5">
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))
          ) : (
            <p>No ingredients found.</p>
          )}
        </ul>
      </div>

      {/* Steps Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Steps</h3>
        <ol className="list-decimal pl-5">
          {recipe.steps && recipe.steps.length > 0 ? (
            recipe.steps.map((step, index) => (
              <li key={index} className="text-gray-700">{step}</li>
            ))
          ) : (
            <p>No steps found.</p>
          )}
        </ol>
      </div>

      {/* Nutrition Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Nutrition</h3>
        <ul className="list-disc pl-5">
          {recipe.nutrition && recipe.nutrition.length > 0 ? (
            recipe.nutrition.map((nutrient, index) => (
              <li key={index} className="text-gray-700">
                {nutrient.name}: {nutrient.amount} {nutrient.unit}
              </li>
            ))
          ) : (
            <p>No nutrition information available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecipeResult;
