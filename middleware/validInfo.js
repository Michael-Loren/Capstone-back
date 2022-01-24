module.exports = (req, res, next) => {
    const { u_email, u_password, u_name } = req.body;
  
    if (req.path === "/Register") {
      //check all 3 if is empty
      if (![u_email, u_password, u_name].every(Boolean)) {
        return res
          .status(401)
          .json("email, password and name can not be empty");
      }
    } else if (req.path === "/Login") {
      if (![u_email, u_password].every(Boolean)) {
        return res.status(401).json("email and password can not be empty");
      }
    }
  
    next();
}