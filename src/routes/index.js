const { Router } = require("express");
const {
  login,
  register,
  requestPasswordReset,
  setNewPassword,
  requiresAuth,
} = require("../controllers/authController");
const {
  createSalon,
  updateSalon,
  fetchOneSalon,
  fetchAllSalons,
} = require("../controllers/salonController");
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
const { fetchProfile, changePassword, fetchProfiles } = require("../controllers/userController");

const router = Router();

// auth
router.post("/authenticate", login);
router.post("/register", register);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", setNewPassword);

// salon
router.post("/salon", requiresAuth, createSalon);
router.patch("/salon/:salonId", requiresAuth, updateSalon);
router.get("/salon/:salonId", fetchOneSalon);
router.get("/salons", fetchAllSalons);

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
router.patch("/profile/change-password", requiresAuth, changePassword);
router.get("/profile/:userId", requiresAuth, fetchProfile);

module.exports = router;
