import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecipeResult from './pages/RecipeResult';
import MyRecipes from './pages/MyRecipes';
import MyRecipesPage from './pages/MyRecipesPage'; // Assuming this is different from MyRecipes?

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Animating route transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/recipe-input"
          element={
            <ProtectedRoute>
              <RecipePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe-result"
          element={
            <ProtectedRoute>
              <RecipeResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-recipes"
          element={
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          }
        />
        {/* If MyRecipesPage is different, rename one for clarity. */}
        {/* <Route
          path="/my-recipes-alt"
          element={
            <ProtectedRoute>
              <MyRecipesPage />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white min-h-screen transition-colors duration-300">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
