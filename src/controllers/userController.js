const User = require("../models/User");
const Salon = require("../models/Salon");
const { handleErrors } = require("../middlewares/errorHandler");

const updateProfile = async (req, res) => {
  const {
    first_name,
    last_name,
    phone_no,
    display_name,
    age,
    gender,
    city,
    profile_photo,
  } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: res.locals.user },
      {
        $set: {
          first_name,
          last_name,
          phone_no,
          display_name,
          age,
          gender,
          city,
          profile_photo,
        },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchProfile = async (req, res) => {
  try {
    const profile = await User.findOne({ _id: req.params.userId });
    res.status(200).json(profile);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "User not found" });
  }
};

const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;

  try {
    const user = await User.currentUser(res.locals.user);
    const updated = await User.changePassword(user, old_password, new_password);

    res.status(200).json({ status: "success" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const fetchProfiles = async (req, res) => {
  try {
    const profiles = await User.find({});
    res.status(200).json(profiles);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "User not found" });
  }
};

const fetchProfileSalons = async (req, res) => {
  try {
    const profile = await User.findOne({ _id: req.params.userId });
    if (profile) {
      const salons = await Salon.find({
        owner: profile,
      });
      return res.status(200).json(salons);
    }
    res.status(400).json({ error: "Invalid request" });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "User not found" });
  }
};

module.exports = {
  updateProfile,
  fetchProfile,
  changePassword,
  fetchProfiles,
  fetchProfileSalons,
};
