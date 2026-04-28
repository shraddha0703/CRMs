import React from "react";
 import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Logout from "../Components/Logout";
import { motion } from "framer-motion";
import { FaUsers, FaChartBar, FaTasks, FaCog } from "react-icons/fa";
import axios from "axios";
function Admindashboard() {
  const cards = [
    {
      title: "Leads",
      value: 120,
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "CustomerTasks",
      value: 45,
      icon: <FaChartBar />,
      color: "bg-green-500",
    },
    { title: "Report", value: 78, icon: <FaTasks />, color: "bg-purple-500" },
    { title: "Settings", value: 12, icon: <FaCog />, color: "bg-red-500" },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  //  Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/usersDetails");
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.log(err);
      alert("Error fetching users");
    }
  };

  //Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/user/${id}`);
      alert("User deleted");
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Delete error");
    }
  };

  // Update User
  const handleUpdate = async (user) => {
    const newEmail = prompt("Enter new email:", user.email);
    const newPassword = prompt("Enter new password:", user.password);

    if (!newEmail || !newPassword) return;

    try {
      await axios.put(`http://localhost:8000/user/${user.id}`, {
        email: newEmail,
        password: newPassword,
      });

      alert("User updated");
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Update error");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      
      <div className="min-h-screen flex flex-col ">
      {/* <Navbar /> */}
      <Navbar />

    
        {/* Sidebar */}

        {/* <div className="w-64 bg-gray-900 text-white p-5">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <ul className="space-y-4">
         
            {["Dashboard", "Leads", "Reports", "Settings"].map((item, i) => (
              <li
                key={i}
                className="hover:bg-gray-700 p-2 rounded cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-5 rounded-xl shadow-lg text-white ${card.color}`}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h2 className="text-lg">{card.title}</h2>
                <p className="text-2xl font-bold">{card.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Table Section */}
          <motion.div
            className="mt-10  p-6 rounded-xl shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 ">Recent Users</h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Password</th>
                   <th className="p-2">OTP Verified</th>
                 
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border">
                    <td className="p-2">{user.id}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.password}</td>
                      <td className="p-2">{user.is_verified}</td>
                   

                    <td className="p-2">
                      <button
                        onClick={() => handleUpdate(user)}
                        className="bg-yellow-400 px-2 mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500  px-2 mr-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
    
  );
}

export default Admindashboard;
