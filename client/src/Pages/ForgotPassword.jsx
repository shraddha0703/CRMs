import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className="flex items-center justify-center h-screen bg-white-400">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-bold mb-4 text-center">
            Change Password
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 mb-3 w-full rounded"
          />

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          {/* Button */}
          <button
            onClick={handleSubmit}
           // className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded"
           disabled={!isFormValid}
            className={`p-2 w-full rounded text-white ${
              isFormValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Update Password
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ForgotPassword;
