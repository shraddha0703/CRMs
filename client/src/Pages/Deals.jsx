

import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaChartLine,
  FaMoneyBillWave,
  FaPlus,
} from "react-icons/fa";

function Deals() {
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:px-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              My Deals
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your sales pipeline and track progress.
            </p>
          </div>

          {/* Add Deal Button */}
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md transition">
            <FaPlus />
            Add Deal
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Total Deals
                </p>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  0
                </h2>
              </div>
              <FaHandshake className="text-blue-500 text-3xl" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Revenue
                </p>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  ₹0
                </h2>
              </div>
              <FaMoneyBillWave className="text-green-500 text-3xl" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Won Deals
                </p>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  0
                </h2>
              </div>
              <FaChartLine className="text-purple-500 text-3xl" />
            </div>
          </motion.div>
        </div>

        {/* Deals Table / Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="No Deals"
            className="w-28 mx-auto mb-4 opacity-80"
          />

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No Deals Available
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-5">
            Start by creating your first deal and grow your business.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition shadow-md">
            Create Deal
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default Deals;
