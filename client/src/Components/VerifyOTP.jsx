import { useState } from "react";
import axios from "axios";

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
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded">
        <h2>Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        <button
          onClick={handleVerify}
          className="bg-green-500 text-white p-2 w-full"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;
