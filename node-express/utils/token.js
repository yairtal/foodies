const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (userId) => {
  const secretKey = config.secretKey;
  const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: "1h" });
  return token;
};

module.exports = {
  generateToken,
};
