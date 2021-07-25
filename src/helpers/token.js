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

/**
 *
 *
 */
const createToken = (user, expiresIn) => {
  try {
    if (user) {
      jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn,
      });
    }
    return null;
  } catch {
    return null;
  }
};

module.exports = {
  verifyToken,
  createToken,
};
