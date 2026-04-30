import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

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
     <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex-1 flex items-center justify-center h-screen ">
   

    <motion.div
      className="p-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      <div className="bg-white dark:bg-gray-500 p-6 rounded-xl shadow-md max-w-lg">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </div>
    </motion.div>
</div>
      <Footer />
      </div>
      </div>
   
  );
}

export default Setting;
