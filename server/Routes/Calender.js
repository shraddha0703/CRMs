const express = require("express");
const router = express.Router();
const db = require("../db");

// // ✅ Get tasks for logged-in user
// router.get("/user-calendar", (req, res) => {
//   const userId = req.query.userId;

//   const sql = `
//     SELECT
//       id,
//       task_title,
//       due_date,
//       priority
//     FROM tasks
//     WHERE assigned_to = ?

//   `;

//   db.query(sql, [userId], (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Error" });
//     }

//     res.json(result);
//   });
// });

router.get("/user-calendar", (req, res) => {
  const email = req.query.email;

  console.log("Email ID:", email);

  //   const sql = "SELECT * FROM tasks";
  const sql = `SELECT id, task_title, due_date, priority FROM tasks WHERE assigned_to = ?
`;

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ message: "DB Error" });
    }

    console.log("DB RESULT:", result);
    res.json(result);
  });
});
module.exports = router;
