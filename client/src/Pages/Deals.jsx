
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import axios from "axios";

function Deals() {
  const [show, setShow] = useState(false);
  const [deals, setDeals] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    client_name: "",
    company: "",
    amount: "",
    stage: "New",
    close_date: "",
    email: "",
    phone: "",
    notes: "",
    user_email: user.email,
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = () => {
    axios
      .get(`http://localhost:8000/deals/${user.email}`)
      .then((res) => setDeals(res.data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8000/adddeal", form).then((res) => {
      alert("Deal Added");
      setShow(false);
      fetchDeals();
    });
  };

  const revenue = deals.reduce((a, b) => a + Number(b.amount), 0);
  const wonDeals = deals.filter((d) => d.stage === "Won").length;

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl  text-black font-bold dark:text-white">My Deals</h1>

          <button
            onClick={() => setShow(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Add Deal
          </button>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded shadow">
            <p>Total Deals</p>
            <h2 className="text-2xl font-bold">{deals.length}</h2>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <p>Revenue</p>
            <h2 className="text-2xl font-bold">₹{revenue}</h2>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <p>Won Deals</p>
            <h2 className="text-2xl font-bold">{wonDeals}</h2>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded shadow p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Deal</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Stage</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {deals.map((d) => (
                <tr key={d.id} className="text-center border-b">
                  <td>{d.title}</td>
                  <td>{d.client_name}</td>
                  <td>₹{d.amount}</td>
                  <td>{d.stage}</td>
                  <td>{d.close_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">Create Deal</h2>

            <input
              name="title"
              placeholder="Deal Title"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="client_name"
              placeholder="Client Name"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="company"
              placeholder="Company"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="amount"
              placeholder="Amount"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <select
              name="stage"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            >
              <option>New</option>
              <option>Proposal</option>
              <option>Negotiation</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <input
              type="date"
              name="close_date"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <textarea
              name="notes"
              placeholder="Notes"
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShow(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Deal
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Deals;
