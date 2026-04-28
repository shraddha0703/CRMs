const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all users
const sql = "SELECT * FROM users";
router.get("/usersDetails", (req, res) => {
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });

    res.json({ success: true, users: result });
  });
});

// // GET all users
// router.get("/users", (req, res) => {
//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json({ message: "Error fetching users" });

//     res.json({ success: true, users: result });
//   });
// });

// DELETE user
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting user" });

    res.json({ success: true, message: "User deleted" });
  });
});

// UPDATE user
router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  db.query(
    "UPDATE users SET email = ?, password = ? WHERE id = ?",
    [email, password, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Error updating user" });

      res.json({ success: true, message: "User updated" });
    },
  );
});

module.exports = router;
