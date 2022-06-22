const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const {User} = db.user;


verifyToken = (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "*"
  );
    let token = req.headers["authorization"];
  // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjgyOTFkM2RjYzgzZThkY2Y0N2E4ZiIsImlhdCI6MTY1MDk5NjY1M30.HKeb3yLAimnzMXYX2mWsH7C_CWACCk48bZxIOF-VPpA";
  console.log("token is coming here",token)
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const bearerToken = token.split(' ')[1];
  
  jwt.verify(bearerToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized Token!" });
    }
    req.userId = decoded.id;
    req.token = token;
    next();
  });
};





const authJwt = {
  verifyToken,
};
module.exports = authJwt;
