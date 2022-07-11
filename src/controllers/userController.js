const User = require("../models/User");
const { handleErrors } = require("../middlewares/errorHandler");

const updateProfile = async (req, res) => {
  const { emailOrPhoneNumber, password, remember_me } = req.body;

  try {
    const user = await User.login(emailOrPhoneNumber, password);

    res.status(200).json({ user, token });
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
    const updated = await User.changePassword(user, old_password, new_password );

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

module.exports = {
  fetchProfile,
  changePassword,
  fetchProfiles
};
