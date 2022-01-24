const router = require("express").Router();
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");

router.post("/Register", validInfo, async (req, res) => {


    try {

        const { u_email, u_password, u_name } = req.body;
      
      
        //check user exist
        const ifExist = await pool.query("SELECT * FROM t_user WHERE u_email = $1", [
          u_email,
        ]);
      
        if (ifExist.rows.length !== 0) {
          return res.status(401).json("user exist");
        }
      
        //Bcrypt the user password
      
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(u_password, salt);
      
        const newUser = await pool.query(
          "INSERT INTO t_user (u_email,u_password,u_name) VALUES ($1,$2,$3) RETURNING *",
          [u_email, hashedPassword, u_name]
        );
      
      
        res.json(newUser.rows[0])

        
    } catch (err) {
        return res.status(500).json(err.message)
    }


});

module.exports = router;
