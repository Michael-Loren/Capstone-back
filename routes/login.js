const router = require("express").Router()
const pool = require("../db")
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");


router.post('/Login',validInfo,async(req,res)=>{

    try {

        const {u_email, u_password} = req.body

        const user = await pool.query('SELECT * FROM t_user WHERE u_email = $1',[u_email])

        //check user is in the db or not
        if(user.rows.length === 0)
        {
            return res.status(401).json("user is undefined")
        }

        // compare user input password to DB password
        
        const correctPassword = await bcrypt.compare(
            u_password,
            user.rows[0].u_password
          );

        
          if(!correctPassword){
            return res.status(401).json("ERROR!! email or password is incorrect");
          }


        res.json(user.rows[0])


    } catch (err) {
        return res.status(500).json(err.message)
    }

})

module.exports = router;