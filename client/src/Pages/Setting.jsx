import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Setting() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.role === "Admin") {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, []);

  return (
    <motion.div
      className="p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </div>
    </motion.div>
  );
}

export default Setting;
