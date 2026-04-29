const express = require("express");
const router = express.Router();
const db = require("../db");

// ADD new lead
router.post("/leads", (req, res) => {
  try {
    const { name, email, phone, source, status, assigned_to } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).send("Required fields missing");
    }

    db.query(
      "INSERT INTO leads (name, email, phone, source, status, assigned_to) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, source, status || "New", assigned_to || null],
      (err, result) => {
        if (err) {
          console.log("ERROR:", err);
          return res.status(500).send("Error adding lead");
        }

        res.send("Lead added successfully");
      },
    );
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).send("Error adding lead");
  }
});

// GET leads
router.get("/leads", (req, res) => {
  db.query("SELECT * FROM leads", (err, results) => {
    if (err) {
      console.log("ERROR:", err);
      return res.status(500).send("Error fetching leads");
    }

    res.json(results);
  });
});

// UPDATE status
router.put("/leads/:id", (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  if (!status) {
    return res.status(400).send("Status is required");
  }

  db.query(
    "UPDATE leads SET status=? WHERE id=?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log("ERROR:", err);
        return res.status(500).send("Error updating lead");
      }

      res.send("Lead updated successfully");
    },
  );
});

module.exports = router;
