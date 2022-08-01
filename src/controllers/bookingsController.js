const User = require("../models/User");
const Booking = require("../models/Booking");
const UserNotification = require("../models/UserNotification");
const { handleErrors } = require("../middlewares/errorHandler");

const createBooking = async (req, res) => {};

const deleteBooking = async (req, res) => {
  try {
    const notification = await Booking.deleteOne({
      _id: req.params.bokingId,
    });
    if (notification) {
      res.status(200).json({ status: "success" });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "An error occured" });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
};
