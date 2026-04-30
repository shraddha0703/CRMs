// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// // ✅ GET My Tasks
// router.get("/my-tasks/:email", (req, res) => {
//   const { email } = req.params;

//   const sql = "SELECT * FROM tasks WHERE assigned_to = ?";

//   db.query(sql, [email], (err, results) => {
//     if (err) {
//       console.log("GET TASK ERROR:", err);
//       return res.status(500).json({ message: "DB Error" });
//     }

//     res.json(results);
//   });
// });

// // ✅ UPDATE Task Status
// router.put("/update-task/:id", (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const sql = "UPDATE tasks SET status = ? WHERE id = ?";

//   db.query(sql, [status, id], (err, result) => {
//     if (err) {
//       console.log("UPDATE ERROR:", err);
//       return res.status(500).json({ message: "Update failed" });
//     }

//     res.json({ message: "Task updated successfully" });
//   });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../db");

//  TEST ROUTE
router.get("/test", (req, res) => {
  res.send(" Task API Working");
});

//  GET My Tasks
router.get("/my-tasks/:email", (req, res) => {
  const { email } = req.params;

  console.log("Fetching tasks for:", email);

  const sql = `
    SELECT * FROM tasks
    WHERE LOWER(assigned_to) = LOWER(?)
    ORDER BY id DESC
  `;  
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("GET TASK ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    console.log("Tasks:", results);
    res.json(results);
  });
});

//  UPDATE Task Status
router.put("/update-task/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("Update:", id, status);

  const validStatus = ["Pending", "In Progress", "Completed"];

  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = "UPDATE tasks SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("UPDATE ERROR:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  });
});

module.exports = router;
