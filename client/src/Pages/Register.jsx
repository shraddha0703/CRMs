import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  // define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const handleRegister = async () => {
    // try {
    //   const res = await axios.post("http://localhost:8000/register", {
    //     email,
    //     password,
    //     role,
    //   });

    //    if (role === "Admin") {
    //     localStorage.setItem("Admin", JSON.stringify({ email }));
    //     window.location.href = "/Login";
    //   } else {
    //     localStorage.setItem("User", JSON.stringify({ email }));
    //     window.location.href = "/Login";
    //   }

    //   alert(res.data.message);
    // } catch (err) {
    //   console.log(err);
    //   alert("Error inserting data");
    // }\
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
    <div className="flex items-center justify-center h-screen bg-black-800">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl mb-4">Register Here...</h2>
        <div className="mb-3">
          <label>
            <input
              type="radio"
              value="User"
              checked={role === "User"}
              onChange={(e) => setRole(e.target.value)}
            />
            User
          </label>

          <label className="ml-4">
            <input
              type="radio"
              value="Admin"
              checked={role === "Admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
        </div>
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
          className="border p-2 mb-2 w-full"
        />

        <button
          onClick={handleRegister}
          //className="bg-blue-500 text-white p-2 w-full"
          disabled={!isFormValid}
          className={`p-2 w-full rounded text-white ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Register
        </button>
        <div className="flex justify-between mt-3 text-sm">
          <Link to="/Login" className="hover:text-gray-200">
            User Login
          </Link>
          <Link to="/Login" className="hover:text-gray-200">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
