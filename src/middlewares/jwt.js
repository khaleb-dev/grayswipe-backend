const jwt = require("jsonwebtoken");

let maxAge = 15 * 24 * 60 * 60; // 15 day

const createToken = (data) => {
  if (data.remember_me && data.remember_me === true) {
    maxAge = 30 * 24 * 60 * 60; // 30 day
    return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: maxAge });
  }
  return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports = { createToken };
