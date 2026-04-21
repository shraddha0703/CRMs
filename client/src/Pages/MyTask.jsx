import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

const MyTasks = ({ userData }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api
      .get(`/my-tasks/${userData.email}`)
      .then((res) => setTasks(res.data))
      .catch(() => console.log("Error"));
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/update-task/${id}`, { status }).then(() => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My CRM Tasks</h2>

      <div className="grid gap-5">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-5 rounded-xl shadow"
          >
            <div className="flex justify-between">
              <h3 className="font-bold">{task.task_title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
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

            <p className="text-sm text-gray-600 mt-1">
              Customer: {task.customer_name}
            </p>

            <p className="text-sm text-gray-500">Type: {task.task_type}</p>

            <p className="text-xs mt-2 text-gray-400">Due: {task.due_date}</p>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                }`}
              >
                {task.status}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(task.id, "In Progress")}
                  className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                >
                  Start
                </button>

                <button
                  onClick={() => updateStatus(task.id, "Completed")}
                  className="bg-green-500 text-white px-2 py-1 text-xs rounded"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
