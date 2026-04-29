import { motion } from "framer-motion";

function WelcomeCard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center"
    >
      <div>
        <h2 className="text-2xl font-bold">
          {getGreeting()}, {user.name || "User"} 👋
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Welcome back to your dashboard
        </p>
      </div>

      {/* Optional icon / avatar */}
      <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
        {user.name ? user.name[0].toUpperCase() : "U"}
      </div>
    </motion.div>
  );
}

export default WelcomeCard;
