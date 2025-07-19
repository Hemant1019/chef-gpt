const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  NER: { type: [String], required: true },
  instructions: { type: String },  // Optional, if your dataset has this
  dietaryRestrictions: { type: String },  // Optional, if your dataset has this
  nutrition: {  // New field for nutritional info
    calories: { type: Number },
    protein: { type: Number },
    fat: { type: Number },
    carbs: { type: Number },
  },
  image: { type: String },  // New field for image URL
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
