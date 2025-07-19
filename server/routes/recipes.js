const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/generate', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ error: 'Ingredients are required' });
  }

  try {
    // First: Find recipes by ingredients
    const findRes = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients,
        number: 1,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    if (!findRes.data.length) {
      return res.status(404).json({ error: 'No recipe found' });
    }

    const recipeSummary = findRes.data[0];

    // Second: Get detailed info including instructions
    const detailRes = await axios.get(`https://api.spoonacular.com/recipes/${recipeSummary.id}/information`, {
      params: {
        includeNutrition: true,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    const recipe = detailRes.data;

    const formattedRecipe = {
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.extendedIngredients.map((i) => i.original),
      instructions: recipe.instructions || 'No instructions available.',
      nutrition: recipe.nutrition?.nutrients?.reduce((acc, nutrient) => {
        acc[nutrient.name] = `${nutrient.amount} ${nutrient.unit}`;
        return acc;
      }, {}),
    };

    res.status(200).json(formattedRecipe);
  } catch (error) {
    console.error('❌ Error fetching recipe:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error generating recipe' });
  }
});

module.exports = router;
