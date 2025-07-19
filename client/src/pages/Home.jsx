import React from 'react';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection />
      {/* Other sections like Recipe Carousel, How It Works */}
    </motion.div>
  );
};

export default Home;
