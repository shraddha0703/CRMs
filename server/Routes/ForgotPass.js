const express = require("express");
const router = express.Router();
const db = require("../db");

// FORGOT PASSWORD API
router.post("/forgot-password", (req, res) => {
  const { email, password, confirmpassword, role } = req.body;
  // Validate role
  if (role !== "Admin" && role !== "User") {
    return res.status(400).json({ message: "Invalid role" });
  }
  const tableName = role === "Admin" ? "admin" : "users";

  // validation
  if (!email || !password || !confirmpassword) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password !== confirmpassword) {
    return res.json({
      success: false,
      message: "Passwords do not match",
    });
  }

  // check user exist
  const checkUser = `SELECT * FROM ${tableName} WHERE email = ?`;

  db.query(checkUser, [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // update password
    const updateQuery = `UPDATE ${tableName} SET password = ? WHERE email = ?`;

    db.query(updateQuery, [password, email], (err, result) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error updating password",
        });
      }

      res.json({
        success: true,
        message: "Password updated successfully",
      });
    });
  });
});

module.exports = router;
