const User = require("../models/User");
const Salon = require("../models/Salon");
const SalonService = require("../models/SalonService");
const { handleErrors } = require("../middlewares/errorHandler");

const createSalonService = async (req, res) => {
  const { salon_id, name, price, discount, estimated_time, photo_urls } =
    req.body;
  try {
    let user = await User.currentUser(res.locals.user);
    let salon = await Salon.findOne({ _id: salon_id });
    if (user == salon.owner) {
      const salon_service = await SalonService.create({
        salon,
        name,
        price,
        discount,
        estimated_time,
        photo_urls,
      });

      return res.status(201).json(salon_service);
    }

    return res.status(403).json({ error: "You are not permitted to perform this action." });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

module.exports = {
    createSalonService
  };