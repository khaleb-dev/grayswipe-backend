const User = require("../models/User");
const Booking = require("../models/Booking");
const Salon = require("../models/Salon");
const SalonService = require("../models/SalonService");
const UserNotification = require("../models/UserNotification");
const { handleErrors } = require("../middlewares/errorHandler");

const createBooking = async (req, res) => {
  const { service_id, total_number, comment, date_time } = req.body;
  try {
    const user = await User.currentUser(res.locals.user);
    const service = await SalonService.findOne({ _id: service_id });
    let qty = total_number && total_number > 0 ? total_number : 1;
    if (service) {
      const salon = await Salon.findOne({ _id: service.salon });
      const booking = await Booking.create({
        customer: user,
        salon,
        salon_service: service,
        price: service.price,
        discount: service.discount,
        total_number: qty,
        total_amount: service.price * qty - service.discount * qty,
        comment,
        date_time,
      });
      // send notification to salon owner
      if (booking) {
        const title = `${salon.name} got a new booking.`;
        const description = `A customer has booked ${service.name} service by ${date_time}`;
        const user_notification = await UserNotification.create({
          from_user: user,
          to_user: salon.owner,
          title,
          description,
          url: `${process.env.BASE_URL}/bookings/${booking._id}`,
        });
      }
      res.status(201).json(booking);
    }
    return res.status(400).json({ error: "Service not found!" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.deleteOne({
      _id: req.params.bookingId,
    });
    if (booking) {
      res.status(200).json({ status: "success" });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "An error occured" });
  }
};

const fetchAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: res.locals.user })
      .populate("customer")
      .populate("salon")
      .populate("salon_service");
    res.status(200).json(bookings);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchAllBookingsBySalon = async (req, res) => {
  try {
    const bookings = await Booking.find({ salon: req.params.salonId })
      .populate("customer")
      .populate("salon")
      .populate("salon_service");
    res.status(200).json(bookings);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports = {
  createBooking,
  deleteBooking,
  fetchAllBookings,
  fetchAllBookingsBySalon,
};
