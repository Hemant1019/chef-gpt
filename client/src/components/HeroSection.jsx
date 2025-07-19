import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartCooking = () => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
      navigate("/recipe-input");
    } else {
      navigate("/login");
    }
  };

  const backgroundImageUrl = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGZvb2R8ZW58MHx8MHx8fDA%3D ";

  return (
    <div
      className="relative bg-cover bg-center h-[500px] sm:h-[600px] md:h-[700px]"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Unlock Delicious Recipes with AI
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-xl mx-auto">
          Get personalized, health-conscious, and allergy-aware recipes based on the ingredients you have at home.
        </p>
        <button
          onClick={handleStartCooking}
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition-all"
        >
          Start Cooking
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
