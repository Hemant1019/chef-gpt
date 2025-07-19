// server/controllers/recipeController.js
const Recipe = require('../models/Recipe');

exports.generateRecipe = async (req, res) => {
  const { ingredients = '', dietaryRestrictions = '' } = req.body;

  // Split and normalize ingredients
  const ingredientList = ingredients
    .toLowerCase()
    .split(',')
    .map(i => i.trim())
    .filter(Boolean); // Remove empty values

  try {
    // Check if dietaryRestrictions is provided and add it to the query
    const query = {
      NER: { $all: ingredientList }, // Match recipes containing all ingredients
    };

    if (dietaryRestrictions) {
      query.dietaryRestrictions = { $in: [dietaryRestrictions] }; // Match recipes with dietary restrictions if provided
    }

    // Find recipes based on the ingredients and dietary restrictions (if any)
    const matches = await Recipe.find(query).limit(20);

    if (!matches.length) {
      return res.status(404).json({ message: 'No matching recipe found.' });
    }

    // Pick a random recipe from the matches
    const chosen = matches[Math.floor(Math.random() * matches.length)];
    res.json(chosen);
  } catch (err) {
    console.error('generateRecipe error', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
