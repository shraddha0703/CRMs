import React, { useState } from "react";

import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const TaskManage = () => {
  const [form, setForm] = useState({
    task_title: "",
    customer_name: "",
    task_type: "",
    priority: "",
    due_date: "",
    assigned_to: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Get admin from localStorage
    const admin = JSON.parse(localStorage.getItem("admin"));

    console.log("Admin:", admin); // 🔍 debug

    try {
      const res = await axios.post("http://localhost:8000/create-task", {
        ...form,
        created_by: admin?.email, // ✅ now defined
      });

      console.log("SUCCESS:", res.data);

      alert("✅ Task Assigned Successfully");

      setForm({
        task_title: "",
        customer_name: "",
        task_type: "",
        priority: "",
        due_date: "",
        assigned_to: "",
      });
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("BACKEND ERROR:", err.response?.data);

      alert(err.response?.data?.message || "❌ Error creating task");
    }

    setLoading(false);
  };
  // Disable button if empty
  const isDisabled =
    !form.task_title ||
    !form.customer_name ||
    !form.task_type ||
    !form.priority ||
    !form.due_date ||
    !form.assigned_to;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex-1 flex items-center justify-center h-screen ">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className=" p-8 rounded-xl shadow-lg w-full max-w-lg space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Create Task</h2>

            {/* Task Title */}
            <input
              type="text"
              name="task_title"
              placeholder="Task Title"
              value={form.task_title}
              onChange={handleChange}
              className="w-full  border p-2 rounded"
            />

            {/* Customer */}
            <input
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={form.customer_name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            {/* Task Type */}
            <select
              name="task_type"
              value={form.task_type}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Task Type</option>
              <option value="Call">Call</option>
              <option value="Meeting">Meeting</option>
              <option value="Follow-up">Follow-up</option>
            </select>

            {/* Priority */}
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Due Date */}
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            {/* Assign To */}
            <input
              type="email"
              name="assigned_to"
              placeholder="Assign to (user email)"
              value={form.assigned_to}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            {/* Button */}
            <motion.button
              type="submit"
              disabled={isDisabled || loading}
              whileHover={{ scale: isDisabled ? 1 : 1.05 }}
              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              className={`w-full py-2 rounded text-white transition ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Assigning..." : "Assign Task"}
            </motion.button>
          </motion.form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TaskManage;
