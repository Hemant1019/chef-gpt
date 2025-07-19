import React, { useState, useEffect } from 'react';

export default function MyRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    setSavedRecipes(recipes);
  }, []);

  return (
    <div>
      <h2>My Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No recipes saved yet!</p>
      ) : (
        <ul>
          {savedRecipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} className="w-32 h-32 object-cover" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
