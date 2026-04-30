import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Register() {
  // define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:8000/register", {
        email,
        password,
        role,
      });

      // Store email temporarily for OTP verification
      localStorage.setItem("verifyEmail", email);

      alert("OTP sent to your email");

      // redirect to OTP page
      window.location.href = "/verify-otp";
    } catch (err) {
      console.log(err);
      alert("Error inserting data");
    }
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
      {/* 🔥 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center gap-6 mb-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="User"
              checked={role === "User"}
              onChange={(e) => setRole(e.target.value)}
              className="accent-pink-500"
            />
            User
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="Admin"
              checked={role === "Admin"}
              onChange={(e) => setRole(e.target.value)}
              className="accent-pink-500"
            />
            Admin
          </label>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-3 rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        {/* Register Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: isFormValid ? 1.05 : 1 }}
          onClick={handleRegister}
          disabled={!isFormValid}
          className={`w-full p-3 rounded-lg font-semibold transition ${
            isFormValid
              ? "bg-gradient-to-r from-pink-500 to-yellow-500 hover:opacity-90 shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Register
        </motion.button>

        {/* Links */}
        <div className="flex justify-between mt-5 text-sm text-gray-200">
          <Link to="/Login" className="hover:underline">
            User Login
          </Link>
          <Link to="/Login" className="hover:underline">
            Admin Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
