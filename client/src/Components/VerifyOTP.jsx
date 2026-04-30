import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const email = localStorage.getItem("verifyEmail");

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:8000/verify-otp", {
        email,
        otp,
      });

      alert(res.data.message);

      // After success  go to login
      window.location.href = "/login";
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    // <div className="flex items-center justify-center h-screen">
    //   <div className="bg-white p-6 rounded">
    //     <h2>Verify OTP</h2>

    //     <input
    //       type="text"
    //       placeholder="Enter OTP"
    //       onChange={(e) => setOtp(e.target.value)}
    //       className="border p-2 mb-2 w-full"
    //     />

    //     <button
    //       onClick={handleVerify}
    //       className="bg-green-500 text-white p-2 w-full"
    //     >
    //       Verify
    //     </button>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-violet-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-sm text-white"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP 🔐</h2>

        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-5 p-3 text-center tracking-widest text-lg rounded-lg bg-white/20 placeholder-gray-200 outline-none focus:ring-2 focus:ring-purple-300 transition"
        />

        {/* Verify Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleVerify}
          className="w-full p-3 rounded-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-500 hover:opacity-90 shadow-lg"
        >
          Verify OTP
        </motion.button>

        {/* Resend + Back */}
        <div className="flex justify-between mt-5 text-sm text-gray-200">
          <button className="hover:underline hover:text-white">
            Resend OTP
          </button>
          <Link to="/Login" className="hover:underline hover:text-white">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyOTP;
