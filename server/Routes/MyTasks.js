const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET My Tasks
router.get("/my-tasks/:email", (req, res) => {
  const { email } = req.params;

  const sql = "SELECT * FROM tasks WHERE assigned_to = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log("GET TASK ERROR:", err);
      return res.status(500).json({ message: "DB Error" });
    }

    res.json(results);
  });
});

// ✅ UPDATE Task Status
router.put("/update-task/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE tasks SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log("UPDATE ERROR:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Task updated successfully" });
  });
});

module.exports = router;