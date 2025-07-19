import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setRecipes(saved);
  }, []);

  const handleDelete = (title) => {
    const updated = recipes.filter((r) => r.title !== title);
    setRecipes(updated);
    localStorage.setItem('savedRecipes', JSON.stringify(updated));
  };

  if (recipes.length === 0) {
    return <div className="text-center py-20 text-gray-600">No saved recipes found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">📚 My Saved Recipes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-5 border border-gray-200">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-green-700">{recipe.title}</h3>

              <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                {recipe.ingredients.slice(0, 3).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleDelete(recipe.title)}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑 Delete
                </button>
                <Link
                  to="/recipe-result"
                  onClick={() =>
                    localStorage.setItem('generatedRecipe', JSON.stringify(recipe))
                  }
                  className="text-green-600 hover:underline text-sm"
                >
                  🔍 View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRecipes;
