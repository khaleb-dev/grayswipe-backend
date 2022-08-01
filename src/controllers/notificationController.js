const User = require("../models/User");
const UserNotification = require("../models/UserNotification");
const { handleErrors } = require("../middlewares/errorHandler");

const readNotification = async (req, res) => {
  try {
    const notification = await UserNotification.findOneAndUpdate(
      { _id: req.params.notificationId },
      { $set: { seen: true } },
      { new: true }
    )
      .populate("from_user")
      .populate("to_user");
    return res.status(200).json(notification);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notification = await UserNotification.deleteOne({
      _id: req.params.notificationId,
    });
    if (notification) {
      res.status(200).json({ status: "success" });
    }
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "An error occured" });
  }
};

const fetchOneNotification = async (req, res) => {
  try {
    const notification = await UserNotification.findOne({
      _id: req.params.notificationId,
    })
      .populate("from_user")
      .populate("to_user");
    res.status(200).json(notification);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "Notification not found" });
  }
};

const fetchAllNotifications = async (req, res) => {
  try {
    const notifications = await UserNotification.find({})
      .populate("from_user")
      .populate("to_user");
    res.status(200).json(notifications);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "Notifications not found" });
  }
};

const fetchAllNotificationsBySender = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const notifications = await UserNotification.find({
      from_user: req.params.userId,
    }).populate("to_user");
    res.status(200).json({ user, notifications });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error: "Notifications not found" });
  }
};

module.exports = {
  readNotification,
  deleteNotification,
  fetchOneNotification,
  fetchAllNotifications,
  fetchAllNotificationsBySender,
  fetchAllNotificationsByReceiver,
};
