const express = require("express");

const router = express.Router();
const db = require("../db");

// Add Deal
router.post("/adddeal", (req, res) => {
  const {
    title,
    client_name,
    company,
    amount,
    stage,
    close_date,
    email,
    phone,
    notes,
    user_email,
  } = req.body;

  const sql = `
 INSERT INTO deals
 (title,client_name,company,amount,stage,close_date,email,phone,notes,user_email)
 VALUES (?,?,?,?,?,?,?,?,?,?)
 `;

  db.query(
    sql,
    [
      title,
      client_name,
      company,
      amount,
      stage,
      close_date,
      email,
      phone,
      notes,
      user_email,
    ],
    (err, result) => {
      if (err) return res.json(err);
      res.json({ message: "Deal Added" });
    },
  );
});

// Get User Deals
router.get("/deals/:email", (req, res) => {
  const sql = "SELECT * FROM deals WHERE user_email=?";
  db.query(sql, [req.params.email], (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});
module.exports = router;
