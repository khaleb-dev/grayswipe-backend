const User = require("../models/User");
const { createToken } = require("../middlewares/jwt");
const { handleErrors } = require("../middlewares/errorHandler");
const { mail } = require("../middlewares/emailHandler");
const randomId = require("random-id");
const { split } = require("lodash");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { emailOrPhoneNumber, password, remember_me } = req.body;

  try {
    const user = await User.login(emailOrPhoneNumber, password);

    const token = createToken({ id: user._id, remember_me });

    res.status(200).json({ user, token });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const register = async (req, res) => {
  const { full_name, email, phone_no, password } = req.body;

  try {
    const user = await User.create({ full_name, email, phone_no, password });

    const token = createToken(user._id);

    res.status(201).json({ user, token });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const resetToken = randomId(6, "0");
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { password_reset_token: resetToken } },
      { new: true }
    );

    if (!updatedUser) {
      throw Error("user not found");
    }

    const mailOptions = {
      to: updatedUser.email,
      subject: "Reset Password",
      html: `<h3>Your password reset pin is: ${updatedUser.password_reset_token}</h3>`,
    };

    const mailsender = mail(mailOptions);

    res.status(201).json(mailsender);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const setNewPassword = async (req, res) => {
  const { pin, new_password } = req.body;
  try {
    const user = await User.updatePassword(pin, new_password);

    res.status(200).json({ status: "success" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const requiresAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    const [tokenType, token] = split(req.headers.authorization, " ");
    if (token && tokenType === "Bearer") {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ error: "Unauthorized" });
        } else {
          // make user available for the next middleware
          res.locals.user = decodedToken.data.id;
        }
      });
    }
  }
  next();
};

module.exports = {
  login,
  register,
  requestPasswordReset,
  setNewPassword,
  requiresAuth,
};
