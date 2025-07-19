require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Environment variables
const MONGO_URI = process.env.MONGO_URI;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file');
} else {
  console.log('✅ MONGO_URI loaded');
}

if (!SPOONACULAR_API_KEY) {
  console.error('❌ SPOONACULAR_API_KEY not found in .env file');
} else {
  console.log('✅ SPOONACULAR_API_KEY loaded');
}

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Routes
app.post('/api/auth/signup', async (req, res) => {
  console.log('Signup route hit');
  // Future: add logic here
  res.status(200).json({ message: 'Signup route working (placeholder)' });
});

app.post('/api/auth/login', async (req, res) => {
  console.log('Login route hit');
  // Future: add logic here
  res.status(200).json({ message: 'Login route working (placeholder)' });
});

app.post('/api/recipes/generate', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ error: 'Ingredients are required' });
  }

  console.log('Generate recipe for:', ingredients);

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients,
        number: 5,
        ranking: 1,
        apiKey: SPOONACULAR_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error generating recipe:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
