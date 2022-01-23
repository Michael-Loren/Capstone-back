module.exports = (req, res, next) => {
    const { email, password, name } = req.body;
  
    if (req.path === "/Register") {
      //check all 3 if is empty
      if (![email, password, name].every(Boolean)) {
        return res
          .status(401)
          .json("email, password and name can not be empty");
      }
    } else if (req.path === "/Login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("email and password can not be empty");
      }
    }
  
    next();
}