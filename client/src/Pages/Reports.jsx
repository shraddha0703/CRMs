import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { motion } from "framer-motion";

function Reports() {
  
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />

    
      <div className="flex-1 overflow-y-auto p-6 ">
        {/* 🔝 Heading */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          My Report 
        </h1>
       
        <p className="text-black dark:text-white"> No Report Added</p>
      </div>

      <Footer />
    </div>
  );
}

export default Reports;
