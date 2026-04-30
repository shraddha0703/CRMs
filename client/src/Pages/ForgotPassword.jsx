import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async () => {
    // ✅ Frontend Validation
    if (!email || !password || !confirmpassword || !role) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/forgot-password", {
        email,
        password,
        confirmpassword,
        role,
      });

      console.log("Response:", res.data);

      if (res.data.success) {
        localStorage.setItem("role", role);

        if (role === "Admin") {
          localStorage.setItem("admin", JSON.stringify({ email }));
          window.location.href = "/Admindashboard";
        } else {
          localStorage.setItem("user", JSON.stringify({ email }));
          window.location.href = "/Userdashboard";
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error");
    }
  };
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  return(
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 via-red-700 to-pink-300">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white"
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password 🔐</h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-300 transition"
      />

      {/* New Password */}
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-300 transition"
      />

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-300 transition"
      />

      {/* Role Selection */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-5 p-3 rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <option className="text-black" value="">
          Select Role
        </option>
        <option className="text-black" value="Admin">
          Admin
        </option>
        <option className="text-black" value="User">
          User
        </option>
      </select>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: isFormValid ? 1.05 : 1 }}
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`w-full p-3 rounded-lg font-semibold transition ${
          isFormValid
            ? "bg-gradient-to-r from-yellow-400 to-red-500 hover:opacity-90 shadow-lg"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Update Password
      </motion.button>

      {/* Back to Login */}
      <div className="text-center mt-5 text-sm text-gray-200">
        <Link to="/Login" className="hover:underline hover:text-white">
          Back to Login
        </Link>
      </div>
    </motion.div>
  </div>
  );
}

export default ForgotPassword;
