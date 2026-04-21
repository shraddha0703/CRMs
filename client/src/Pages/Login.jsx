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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className="flex items-center justify-center h-screen bg-black-500">
        <div className="bg-black p-6 rounded-lg w-80">
          <h2 className="text-xl mb-4 text-center text-white">Login Here...</h2>

          {/*  Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 mb-3 w-full"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-3 w-full"
          />

          <button
            onClick={handleLogin}
            //className="bg-black-500 text-white p-2 w-full border"
            disabled={!isFormValid}
            className={`p-2 w-full rounded text-white ${
              isFormValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Login
          </button>

          <div className="flex justify-between mt-3 text-white">
            <Link to="/">Register</Link>
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
