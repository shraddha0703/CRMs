const express =require("express");
const router =express.Router();
const db = require("../db");
router.post("/login",(req,res)=>{
     const { email, password, role } = req.body;
//validate role
    if(role !=="Admin" && role!=="User"){
     return res.status(400).json({message:"Invalid role"});
    }
//decides table
    const tableName = role ==="Admin" ? "admin" : "users";
    //validate input
     if(!email || !password)
     {
        return res.status(400).json({
            success:false,
            message:"Email and Password is required",
        });

     }
    
     const sql = `SELECT * FROM ${tableName} WHERE email = ? AND password= ? `;

     db.query(sql , [email , password], (err,result)=> {
         if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }
        if(result.length > 0){
            res.json({
                success : true ,
                message : `${role} Login Successful !`,
                user : result[0],
            });
        }else 
        {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

     });

});
module.exports = router;