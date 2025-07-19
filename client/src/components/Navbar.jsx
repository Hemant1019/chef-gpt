import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-500 via-green-600 to-green-700 dark:from-green-900 dark:to-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight hover:scale-105 transition"
        >
          🍳 ChefGPT
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-[17px] font-medium">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/recipe-input" label="Start Cooking" currentPath={location.pathname} />
          <NavLink to="/signup" label="Sign Up" currentPath={location.pathname} />
          <NavLink to="/login" label="Login" currentPath={location.pathname} />
          <button
            onClick={handleLogout}
            className="text-red-200 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl ml-4 hover:scale-110 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};
<Link to="/my-recipes" className="text-white hover:underline">My Recipes</Link>

const NavLink = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`${
        isActive ? 'underline font-semibold' : ''
      } hover:underline transition`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
