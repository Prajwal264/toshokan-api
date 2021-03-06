const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const verifyToken = (token) => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET);
    }
    return null;
  } catch (error) {
    return null;
  }
};

module.exports = {
  verifyToken,
};
