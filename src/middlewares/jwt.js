const jwt = require("jsonwebtoken");

const maxAge = 1 * 24 * 60 * 60; // 1 day

const createToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports = { createToken };
