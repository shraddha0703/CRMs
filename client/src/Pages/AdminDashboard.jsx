import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
function Admindashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <motion.div
        className="bg-green-500 w-32 h-32"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen bg-white-400"
      >
        <div className="bg-green-800 text-white p-8 rounded-lg">
          <div>
            <h2>Welcome to AdminDashboard...</h2>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Admindashboard;
