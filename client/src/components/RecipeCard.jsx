import React from "react";

const RecipeCard = ({ title, ingredients, time, image, generateSimilar }) => {
  return (
    <div className="rounded-xl shadow-md p-4 bg-white w-full max-w-xs text-center space-y-2">
      <img
        src={image || "https://media.istockphoto.com/id/1396307254/photo/palak-paneer-and-tandoori-roti.jpg?s=1024x1024&w=is&k=20&c=CkUaahlPOVY0WkkVMfvpdo6LTkpwS4LamSWt8isGCB0="} 
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{ingredients.length} ingredients</p>
      <ul className="text-left list-disc list-inside text-sm text-gray-500">
        {ingredients.slice(0, 4).map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
        {ingredients.length > 4 && <li>+ {ingredients.length - 4} more</li>}
      </ul>
      <p className="text-xs text-gray-400">⏱️ {time} min</p>
      <button
        className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600 transition"
        onClick={generateSimilar}  // Button action
      >
        Generate Similar
      </button>
    </div>
  );
};

export default RecipeCard;
