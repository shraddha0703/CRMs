import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Calendar() {
  const [events, setEvents] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchTasks = async () => {
    try {
      if (!user.id) {
        console.log("User ID missing ❌");
        return;
      }

      console.log("Calling API with:", user.email);

      const res = await axios.get(
        `http://localhost:8000/user-calendar?email=${user.email}`,
      );

      console.log("API DATA:", res.data);

      const today = new Date().toISOString().split("T")[0];

      const todayTasks = res.data.filter((task) => task.due_date === today);

      if (todayTasks.length > 0) {
        alert(`🔔 You have ${todayTasks.length} task(s) today`);
      }

      const formatted = res.data.map((task) => ({
        id: task.id,
        title: task.task_title,
        date: task.due_date,
        color:
          task.priority === "High"
            ? "red"
            : task.priority === "Medium"
              ? "orange"
              : "green",
      }));

      setEvents(formatted);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="p-5">
          <h2 className="text-xl font-bold mb-4">My Task Calendar</h2>

          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(info) => {
              alert(`Task: ${info.event.title}`);
            }}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Calendar;
