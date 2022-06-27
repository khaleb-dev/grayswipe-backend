const User = require("../models/User");
const Review = require("../models/Review");
const { handleErrors } = require("../middlewares/errorHandler");
const randomId = require("random-id");

const createReview = async (req, res) => {
  const { user_id, salon_id, ratings, details } = req.body;

  try {
    const review = await Review.create({ user_id, salon_id, ratings, details });

    res.status(201).json({ review });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const updateReview = async (req, res) => {
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

const deleteReview = async (req, res) => {
  const { pin, new_password } = req.body;
  try {
    const user = await User.updatePassword(pin, new_password);

    res.status(200).json({ status: "success" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchOneReview = async (req, res) => {
  const { pin, new_password } = req.body;
  try {
    const user = await User.updatePassword(pin, new_password);

    res.status(200).json({ status: "success" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();

    res.status(200).json({ reviews });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchAllReviewsByUser = async (req, res) => {
  const { pin, new_password } = req.body;
  try {
    const user = await User.updatePassword(pin, new_password);

    res.status(200).json({ status: "success" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchAllReviewsBySalon = async (req, res) => {
  const { pin, new_password } = req.body;
  try {
    const user = await User.updatePassword(pin, new_password);

    res.status(200).json({ status: "success" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  fetchOneReview,
  fetchAllReviews,
  fetchAllReviewsByUser,
  fetchAllReviewsBySalon
};
