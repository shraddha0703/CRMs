// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Footer from "../Components/Footer";

// const MyTasks = () => {
//   const [tasks, setTasks] = useState([]);

//   // ✅ get user from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     console.log("USER:", user);

//     if (user?.email) {
//       axios
//         .get(`http://localhost:8000/my-tasks/${user.email}`)
//         .then((res) => {
//           console.log("DATA:", res.data);
//           setTasks(res.data);
//         })
//         .catch((err) => {
//           console.log("ERROR:", err);
//         });
//     } else {
//       console.log("❌ No user email found");
//     }
//   }, []);

//   const updateStatus = (id, status) => {
//     axios
//       .put(`http://localhost:8000/update-task/${id}`, { status })
//       .then(() => {
//         setTasks((prev) =>
//           prev.map((t) => (t.id === id ? { ...t, status } : t)),
//         );
//       });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Tasks</h2>

//       {tasks.length === 0 ? (
//         <p>No tasks assigned ❌</p>
//       ) : (
//         tasks.map((task) => (
//           <div
//             key={task.id}
//             style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
//           >
//             <h3>{task.task_title}</h3>
//             <p>{task.customer_name}</p>
//             <p>{task.task_type}</p>
//             <p>{task.priority}</p>
//             <p>{task.status}</p>

//             <button onClick={() => updateStatus(task.id, "In Progress")}>
//               Start
//             </button>

//             <button onClick={() => updateStatus(task.id, "Completed")}>
//               Done
//             </button>
//           </div>
//         ))
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default MyTasks;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:8000/my-tasks/${user.email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:8000/update-task/${id}`, { status })
      .then(() => {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status } : t)),
        );
      });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex-1">
          {/* HEADER */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            My CRM Tasks
          </motion.h2>

          {/* EMPTY STATE */}
          {tasks.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500"
            >
              No tasks assigned ❌
            </motion.p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className=" p-5 rounded-xl shadow-md"
                >
                  {/* TITLE + PRIORITY */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg ">{task.task_title}</h3>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <p className="text-sm text-gray-600 mt-2">
                    Customer: {task.customer_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Type: {task.task_type}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Due: {task.due_date}
                  </p>

                  {/* STATUS */}
                  <div className="mt-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        task.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-2 mt-4">
                    {/* START */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => updateStatus(task.id, "In Progress")}
                      disabled={task.status !== "Pending"}
                      className={`flex-1 py-2 rounded text-white text-sm ${
                        task.status === "Pending"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      ▶ Start
                    </motion.button>

                    {/* DONE */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => updateStatus(task.id, "Completed")}
                      disabled={task.status === "Completed"}
                      className={`flex-1 py-2 rounded text-white text-sm ${
                        task.status !== "Completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      ✔ Done
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
