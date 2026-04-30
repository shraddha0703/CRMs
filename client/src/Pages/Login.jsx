import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
        role,
      });

      if (res.data.success) {
        localStorage.setItem("role", role);
        if (role === "Admin") {
          localStorage.setItem("admin", JSON.stringify(res.data.user));

          window.location.href = "/Admindashboard";
        } else {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.href = "/Userdashboard";
        }
      } else {
        alert("Invalid Email or Password");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Server Error"); // FIX
    }
  };
  const isFormValid = email.trim() !== "" && password.trim() !== "";

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800">
    
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white"
    >
      
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Welcome Back 👋
      </h2>

      {/* Role Selection */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <option className="text-black" value="User">User</option>
        <option className="text-black" value="Admin">Admin</option>
      </select>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-5 p-3 rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-cyan-400 transition"
      />

      {/* Login Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: isFormValid ? 1.05 : 1 }}
        onClick={handleLogin}
        disabled={!isFormValid}
        className={`w-full p-3 rounded-lg font-semibold transition ${
          isFormValid
            ? "bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 shadow-lg"
            : "bg-gray-500 cursor-not-allowed"
        }`}
      >
        Login
      </motion.button>

      {/* Links */}
      <div className="flex justify-between mt-5 text-sm text-gray-200">
        <Link to="/" className="hover:underline hover:text-white">
          Register
        </Link>
        <Link to="/ForgotPassword" className="hover:underline hover:text-white">
          Forgot Password?
        </Link>
      </div>

    </motion.div>
  </div>
);
}

export default Login;
