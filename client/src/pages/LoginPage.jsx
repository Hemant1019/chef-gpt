import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Using useNavigate instead of useHistory

  const handleSubmit = () => {
    if (email && password) {
      // After successful login, navigate to the dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          Login
        </button>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <a href="/signup" className="text-sm text-blue-500 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
