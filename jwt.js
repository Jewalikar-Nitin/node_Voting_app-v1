const jwt = require("jsonwebtoken");
require("dotenv").config;

const jwtAuthMiddleware = function (req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).json({ error: "unauthorize" });
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid access" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorize" });
  }
};

const generateToken= function(userData){
    console.log('generation token')
    const token =jwt.sign(userData,'VOTING_node_1');
    return token;
}

module.exports={jwtAuthMiddleware,generateToken};