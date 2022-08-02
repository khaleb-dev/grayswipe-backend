const { Router } = require("express");
const {
  login,
  register,
  requestPasswordReset,
  setNewPassword,
  regenerateToken,
  requiresAuth,
} = require("../controllers/authController");
const {
  createSalon,
  updateSalon,
  fetchOneSalon,
  fetchAllSalons,
} = require("../controllers/salonController");
const {
  createSalonService,
  updateSalonService,
  fetchOneSalonService,
} = require("../controllers/salonServiceController");
const {
  createReview,
  updateReview,
  deleteReview,
  fetchOneReview,
  fetchAllReviews,
  fetchAllReviewsByUser,
  fetchAllReviewsBySalon,
} = require("../controllers/reviewController");
const { uploadFile, deleteFile } = require("../middlewares/fileHandler");
const {
  updateProfile,
  fetchProfile,
  changePassword,
  fetchProfiles,
} = require("../controllers/userController");
const {
  createBooking,
  deleteBooking,
  fetchAllBookings,
  fetchAllBookingsBySalon,
} = require("../controllers/bookingsController");
const {
  readNotification,
  deleteNotification,
  fetchOneNotification,
  fetchAllNotifications,
  fetchAllNotificationsBySender,
  fetchAllNotificationsByReceiver,
} = require("../controllers/notificationController");

const router = Router();

// auth
router.post("/authenticate", login);
router.post("/register", register);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", setNewPassword);
router.get("/regenerate-token", requiresAuth, regenerateToken);

// salon
router.post("/salon", requiresAuth, createSalon);
router.patch("/salon/:salonId", requiresAuth, updateSalon);
router.get("/salon/:salonId", fetchOneSalon);
router.get("/salons", fetchAllSalons);

// salon service
router.post("/salon-service", requiresAuth, createSalonService);
router.patch("/salon-service/:salonServiceId", requiresAuth, updateSalonService);
router.get("/salon-service/:salonServiceId", requiresAuth, fetchOneSalonService);

// review
router.post("/review", requiresAuth, createReview);
router.patch("/review/:reviewId", requiresAuth, updateReview);
router.delete("/review/:reviewId", requiresAuth, deleteReview);
router.get("/review/:reviewId", fetchOneReview);
router.get("/reviews", requiresAuth, fetchAllReviews);
router.get("/reviews/user/:userId", requiresAuth, fetchAllReviewsByUser);
router.get("/reviews/salon/:salonId", fetchAllReviewsBySalon);

// file upload
router.post("/uploads", requiresAuth, uploadFile);
router.delete("/uploads", requiresAuth, deleteFile);

// user profile
router.get("/profiles", requiresAuth, fetchProfiles);
router.patch("/profile", requiresAuth, updateProfile);
router.patch("/profile/change-password", requiresAuth, changePassword);
router.get("/profile/:userId", requiresAuth, fetchProfile);

// bookings
router.post("/bookings", requiresAuth, createBooking);
router.get("/bookings", requiresAuth, fetchAllBookings);
router.get("/bookings/:salonId", requiresAuth, fetchAllBookingsBySalon);
router.delete("/bookings/:bookingId", requiresAuth, deleteBooking);

// notifications
router.get("/notifications", requiresAuth, fetchAllNotificationsByReceiver);
router.get("/notification/:notificationId", requiresAuth, fetchOneNotification);
router.patch("/notification/:notificationId", requiresAuth, readNotification);
router.delete("/notification/:notificationId", requiresAuth, deleteNotification);
router.get("/notifications/sender/:userId", requiresAuth, fetchAllNotificationsBySender);
router.get("/notifications/all", requiresAuth, fetchAllNotifications);

module.exports = router;
