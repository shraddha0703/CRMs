import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUser, FaTasks, FaChartLine, FaCalendarAlt } from "react-icons/fa";
function Userdashboard() {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(data);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8000//my-tasks/:email");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const cards = [
    {
      title: "My Tasks",
      value: 2,
      icon: <FaTasks size={24} />,
      color: "from-orange-500 to-red-700",
    },
    {
      title: "Performance",
      value: "85%",
      icon: <FaChartLine size={24} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Meetings",
      value: 1,
      icon: <FaCalendarAlt size={24} />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Profile",
      value: "Active",
      icon: <FaUser size={24} />,
      color: "from-pink-500 to-pink-700",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      {/* <motion.div
        className="bg-blue-500 w-32 h-32 "
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center h-screen bg-white-400"
      >
        <div className="bg-blue-800 text-white p-8 rounded-lg">
          <div>
            <h2>Welcome to UserDashboard...</h2>
            
          </div>
        </div>
      </motion.div> */}

      <div className="min-h-screen  text-white p-6">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-xl mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome, {user.name || user.email || "User"} 👋
          </h1>
          <p className="text-sm mt-2 opacity-90">
            Manage your tasks, meetings, and performance efficiently.
          </p>
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-gradient-to-r ${card.color} p-5 rounded-2xl shadow-lg cursor-pointer`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  <p className="text-2xl font-bold mt-2">{card.value}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">{card.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity Section */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Recent Activity */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

            <ul className="space-y-3 text-sm max-h-64 overflow-y-auto">
              {tasks && tasks.length > 0 ? (
                tasks
                  .sort(
                    (a, b) =>
                      new Date(b.updated_at || b.created_at) -
                      new Date(a.updated_at || a.created_at),
                  )
                  .slice(0, 5)
                  .map((task, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                    >
                      <span>
                        {task.status === "Completed" ? "✔" : "⏳"}{" "}
                        {task.task_title}
                      </span>

                      <span className="text-xs text-gray-300">
                        {new Date(
                          task.updated_at || task.created_at,
                        ).toLocaleString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </li>
                  ))
              ) : (
                <p className="text-gray-400">No recent activity</p>
              )}
            </ul>
          </div>

          {/* Completed Tasks Card */}
          <div className="bg-gradient-to-r from-yellow-500 to-green-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
            <div className="text-4xl font-bold mb-4">
              {tasks?.filter((t) => t.status === "Completed").length}
            </div>

            <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
              {tasks
                ?.filter((t) => t.status === "Completed")
                .slice(0, 5)
                .map((task, index) => (
                  <li key={index} className="bg-white/20 p-2 rounded">
                    ✔ {task.task_title}
                  </li>
                ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
export default Userdashboard;
