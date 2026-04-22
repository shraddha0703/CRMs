// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// // ✅ CREATE TASK (ADMIN)
// router.post("/create-task", (req, res) => {
//   const {
//     task_title,
//     customer_name,
//     task_type,
//     priority,
//     due_date,
//     assigned_to,
//     created_by,
//   } = req.body;

//   const sql = `
//     INSERT INTO tasks
//     (task_title, customer_name, task_type, priority, due_date, assigned_to, created_by)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;
//   //   const notificationSql = `
//   // INSERT INTO notifications (user_email, message)
//   // VALUES (?, ?)
//   // `;

//   //   const msg = `New task assigned: ${task_title}`;

//   // db.query(notificationSql, [assigned_to, msg]);

//   db.query(
//     sql,
//     [
//       task_title,
//       customer_name,
//       task_type,
//       priority,
//       due_date,
//       assigned_to,
//       created_by,
//     ],
//     (err, result) => {
//       if (err) {
//         console.log("CREATE TASK ERROR:", err);
//         return res.status(500).json({ message: "Task creation failed" });
//       }

//       res.json({ message: "Task assigned successfully" });
//     },
//   );
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ CREATE TASK (ADMIN)
router.post("/create-task", (req, res) => {
  const {
    task_title,
    customer_name,
    task_type,
    priority,
    due_date,
    assigned_to,
    created_by,
  } = req.body;

  // 🔒 Validation
  if (!task_title || !customer_name || !assigned_to) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const sql = `
    INSERT INTO tasks 
    (task_title, customer_name, task_type, priority, due_date, assigned_to, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      task_title,
      customer_name,
      task_type || null,
      priority || null,
      due_date || null,
      assigned_to,
      created_by || null,
    ],
    (err, result) => {
      if (err) {
        console.log("CREATE TASK ERROR:", err);
        return res.status(500).json({ message: "Task creation failed" });
      }

      // ✅ OPTIONAL: Notification insert (safe inside success)
      // const notificationSql = `
      //   INSERT INTO notifications (user_email, message)
      //   VALUES (?, ?)
      // `;

      // const msg = `New task assigned: ${task_title}`;

      // db.query(notificationSql, [assigned_to, msg], (nErr) => {
      //   if (nErr) {
      //     console.log("NOTIFICATION ERROR:", nErr);
      //   }
      // });

      res.json({
        message: "Task assigned successfully",
        taskId: result.insertId,
      });
    },
  );
});

module.exports = router;
