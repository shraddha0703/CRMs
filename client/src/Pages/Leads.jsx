import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:8000/leads");
    setLeads(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/api/leads/${id}`, { status });
    fetchLeads();
  };

  return (
   
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="min-h-screen flex flex-col ">
        <Navbar />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" p-6 rounded-2xl shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Leads Management</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-100">
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Assign</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <motion.tr
                key={lead.id}
                whileHover={{ scale: 1.01 }}
                className="border-b"
              >
                <td className="p-3">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>

                {/* Status Dropdown */}
                <td>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className=" text-black border p-1 rounded "
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Interested</option>
                    <option>Converted</option>
                    <option>Lost</option>
                  </select>
                </td>

                {/* Assign User */}
                <td>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Assign
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
   
    </div>
     <Footer/>
    </div>
  );
}

export default Leads;
