import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // New state for loading

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);  // Start loading

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/signup`,  // Fallback URL
        form
      );
      localStorage.setItem('token', data.token);
      navigate('/recipe-input');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);  // Stop loading after request
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-green-200 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          🧑‍🍳 Join ChefGPT
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 border rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
            disabled={loading}  // Disable button during loading
          >
            {loading ? 'Signing Up...' : 'Sign Up'}  {/* Button text change */}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Log In
          </span>
        </p>
      </div>
    </motion.div>
  );
}
