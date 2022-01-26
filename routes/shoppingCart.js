const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/shoppingCart", authorization, async (req, res) => {
  try {
    const u_id_fk = req.user;

    const { f_id_fk, f_qty } = req.body;

    //check the food is exist
    const ifExist = await pool.query(
      "SELECT * FROM t_cart WHERE u_id_fk = $1 AND f_id_fk = $2",
      [u_id_fk, f_id_fk]
    );
    if (ifExist.rows.length !== 0) {
      return res.status(401).json("Food exist");
    }

    const cart = await pool.query(
      "INSERT INTO t_cart (f_id_fk,u_id_fk,f_qty) VALUES ($1,$2,$3) RETURNING *",
      [f_id_fk, u_id_fk, f_qty]
    );
    res.json(cart.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/shoppingCart", async (req, res) => {
  try {
    const cart = await pool.query("SELECT * FROM t_cart");
    res.json(cart.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/shoppingCart/:f_id_fk", authorization, async (req, res) => {
  
  const u_id_fk = req.user;
  const { f_id_fk } = req.params;
  const { f_qty } = req.body;

  //check the food is exist
  const ifExist = await pool.query(
    "SELECT * FROM t_cart WHERE u_id_fk = $1 AND f_id_fk = $2",
    [u_id_fk, f_id_fk]
  );
  if (ifExist.rows.length === 0) {
    return res.status(401).json("Food undefined");
  }

  const cart = await pool.query(
    "UPDATE t_cart set f_qty = $1 WHERE f_id_fk = $2 AND u_id_fk = $3",
    [f_qty, f_id_fk, u_id_fk]
  );
  res.json(`shoppingCart was updated!`);
});

router.delete("/shoppingCart/:f_id_fk", authorization, async (req, res) => {
  try {
    const u_id_fk = req.user;
    const { f_id_fk } = req.params;

    //check the food is exist
    const ifExist = await pool.query(
      "SELECT * FROM t_cart WHERE u_id_fk = $1 AND f_id_fk = $2",
      [u_id_fk, f_id_fk]
    );
    if (ifExist.rows.length === 0) {
      return res.status(401).json("Food undefined");
    }

    const deleteCart = await pool.query(
      "DELETE FROM t_cart WHERE  f_id_fk = $1 AND u_id_fk = $2",
      [f_id_fk, u_id_fk]
    );
    res.json("item delete!");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete('/shoppingCart/checkout/',async (req,res)=>{


  try {

    const u_id_fk = req.user;
    const deleteCart = await pool.query(
      "DELETE FROM t_cart WHERE u_id_fk = $1",
      [u_id_fk]

    );
    res.json("checkout!");
  } catch (err) {
    res.status(500).json(err.message)
  }


})

module.exports = router;
