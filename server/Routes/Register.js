// const express = require("express");
// const  router = express.Router();
// const db = require("../db");

// router.post("/register",(req,res)=>{
//     const { email, password, role} = req.body;

//     let tableName;

//     if(role==="Admin"){
//         tableName= "admin";
//    }else{
//     tableName="users"   ;
//     }

//     const sql = `INSERT INTO ${tableName} (email, password) VALUES (?, ?)`;

//     db.query(sql, [email, password], (err,result)=>{
//         if(err){
//             console.log(err);
//             return res.status(500).json({
//                 message:"Database Error"
//             });
//         }

//         res.json({message:`${role} Registerd Successfully`})
//     });
// });
// module.exports = router;

// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const db = require("../db");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// router.post("/register", (req, res) => {
//   const { email, password, role } = req.body;

//   const tableName = role === "Admin" ? "admin" : "users";

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

//   const sql = `INSERT INTO ${tableName}
//   (email, password, role, otp, otp_expiry, is_verified)
//   VALUES (?, ?, ?, ?, ?, ?)`;

//   db.query(
//     sql,
//     [email, password, role, otp, otpExpiry, false],
//     async (err, result) => {
//       if (err) {
//         console.log("DB ERROR:", err);
//         return res.status(500).json({ message: "Database Error" });
//       }

//       try {
//         console.log("EMAIL:", process.env.EMAIL_USER);

//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: "OTP Verification",
//           text: `Your OTP is: ${otp}`,
//         });

//         res.json({ message: "OTP sent successfully" });
//       } catch (error) {
//         console.log("MAIL ERROR:", error);
//         res.status(500).json({ message: "Error sending email" });
//       }
//     }
//   );
// });

// module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // simpler & better
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/register", (req, res) => {
  const { email, password, role } = req.body;

  const tableName = role === "Admin" ? "admin" : "users";
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  //  Insert user (NO OTP here)
  const Sql = `INSERT INTO ${tableName} (email, password) VALUES (?, ?)`;

  db.query(Sql, [email, password], (err, result) => {
    if (err) {
      console.log("USER INSERT ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    // Insert OTP into verifyotp table
    const otpSql = `INSERT INTO Verify_OTP (email, otp, otp_expiry, is_verified, role) VALUES (?, ?, ?, ?, ?)`;

    db.query(
      otpSql,
      [email, otp, otpExpiry, false, role],
      async (err2, result2) => {
        if (err2) {
          console.log("OTP INSERT ERROR:", err2);
          return res.status(500).json({ message: "OTP Save Error" });
        }
        

        try {
          //  Send Email
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is: ${otp}`,
          });

          res.json({ message: "User registered & OTP sent" });
        } catch (error) {
          console.log("MAIL ERROR:", error);
          res.status(500).json({ message: "Error sending email" });
        }
      },
    );
  });
});

module.exports = router;
