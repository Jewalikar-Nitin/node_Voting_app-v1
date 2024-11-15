const jwt = require("jsonwebtoken");
require("dotenv").config;
const key = process.env.JWT_SCERET;

const jwtAuthMiddleware = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "unauthorize" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid access" });

    const decode = jwt.verify(token, key);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorize" });
  }
};

const generateToken = async function (userData) {
  const token = jwt.sign(userData, key);
  return token;
};

module.exports = { jwtAuthMiddleware, generateToken };
