const router = require("express").Router()
const pool = require("../db")
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");


router.post('/Login',async(req,res)=>{

    try {

        const {u_email, u_password} = req.body

        const user = await pool.query('SELECT * FROM t_user WHERE u_email = $1',[u_email])

        if(u_password !== user.rows[0].u_password)
        {
            return res.status(401).json("ERROR!! email or password is incorrect")
        }


        


        res.json(user.rows[0])


    } catch (err) {
        return res.status(500).json(err.message)
    }


})

module.exports = router;