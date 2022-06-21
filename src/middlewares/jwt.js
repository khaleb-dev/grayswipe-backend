const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

const maxAge = 1 * 24 * 60 * 60;

const createToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports = { createToken };
