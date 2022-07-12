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
    console.log(user._id, salon.owner._id)
    if (user._id.toString() == salon.owner._id.toString()) {
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

    return res
      .status(403)
      .json({ error: "You are not permitted to perform this action." });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const updateSalonService = async (req, res) => {
  const { name, price, discount, estimated_time, photo_urls } = req.body;
  try {
    const salon_service = await SalonService.findOneAndUpdate(
      { _id: req.params.salonServiceId },
      { $set: { name, price, discount, estimated_time, photo_urls } },
      { new: true }
    ).populate("salon");
    if (salon_service) {
      return res.status(200).json( salon_service );
    }
    res.status(400).json({ error: "Salon Service not found" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchOneSalonService = async (req, res) => {
  try {
    const salon_service = await SalonService.findOne({ _id: req.params.salonServiceId }).populate("salon"); 
    res.status(200).json( salon_service );
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "Review not found" });
  }
};

module.exports = {
  createSalonService,
  updateSalonService,
  fetchOneSalonService
};