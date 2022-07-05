const User = require("../models/User");
const Salon = require("../models/Salon");
const { handleErrors } = require("../middlewares/errorHandler");

const createSalon = async (req, res) => {
  const { salon_id, ratings, details } = req.body;
  try {
    let user = await User.currentUser(res.locals.user);

    const salon = await Salon.create({ user, salon, ratings, details });

    res.status(201).json(salon);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchOneSalon = async (req, res) => {
  try {
    const salon = await Salon.find({ _id: req.params.salonId });
    res.status(200).json(salon);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchAllSalons = async (req, res) => {
  try {
    const salons = await Salon.find({});
    res.status(200).json(salons);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports = {
  createSalon,
  fetchOneSalon,
  fetchAllSalons,
};
