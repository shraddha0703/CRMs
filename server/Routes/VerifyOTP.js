// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   const user = users.find((u) => u.email === email);

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   if (user.otp === otp) {
//     user.isVerified = true;
//     return res.json({ message: "Email verified successfully" });
//   } else {
//     return res.status(400).json({ message: "Invalid OTP" });
//   }
// });
// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// router.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   // 1️⃣ Get OTP from Verify_OTP table
//   const sql = `SELECT * FROM Verify_OTP WHERE email = ?`;

//   db.query(sql, [email], (err, results) => {
//     if (err) return res.status(500).json({ message: "DB Error" });

//     if (results.length === 0) {
//       return res.status(400).json({ message: "OTP not found" });
//     }

//     const record = results[0];

//     //  Wrong OTP
//     if (record.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // Expired
//     if (new Date() > new Date(record.otp_expiry)) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // 2️⃣ Update user/admin table
//     const tableName = record.role === "Admin" ? "admin" : "users";

//     const updateUser = `UPDATE ${tableName} SET is_verified = true WHERE email = ?`;

//     db.query(updateUser, [email], (err2) => {
//       if (err2) return res.status(500).json({ message: "Update failed" });

//       // 3️⃣ Delete OTP after success
//       const deleteOtp = `DELETE FROM Verify_OTP WHERE email = ?`;
//       db.query(deleteOtp, [email]);

//       res.json({ message: "Email verified successfully" });
//     });
//   });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/verify-otp", (req, res) => {
  let { email, otp } = req.body;

  otp = otp.toString().trim();

  const sql = `
    SELECT * FROM Verify_OTP 
    WHERE email = ? 
    ORDER BY id DESC 
    LIMIT 1
  `;

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    if (results.length === 0) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const record = results[0];

    console.log("DB OTP:", record.otp);
    console.log("USER OTP:", otp);

    // ✅ Correct comparison
    if (record.otp.toString().trim() !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Expiry check
    if (new Date() > new Date(record.otp_expiry)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const tableName = record.role === "Admin" ? "admin" : "users";

    const updateUser = `UPDATE ${tableName} SET is_verified = true WHERE email = ?`;

    db.query(updateUser, [email], (err2) => {
      if (err2) return res.status(500).json({ message: "Update failed" });

      const deleteOtp = `DELETE FROM Verify_OTP WHERE email = ?`;
      db.query(deleteOtp, [email]);

      res.json({ message: "Email verified successfully" });
    });
  });
});

module.exports = router;
