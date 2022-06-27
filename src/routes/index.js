const { Router } = require("express");
const {
  login,
  register,
  requestPasswordReset,
  setNewPassword,
  requiresAuth,
} = require("../controllers/authController");
const {
  createReview,
  updateReview,
  deleteReview,
  fetchOneReview,
  fetchAllReviews,
  fetchAllReviewsByUser,
  fetchAllReviewsBySalon
} = require("../controllers/reviewController");

const router = Router();

// auth
router.post("/authenticate", login);
router.post("/register", register);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", setNewPassword);


// review
router.post("/review", requiresAuth, createReview);
router.patch("/review/:reviewId", requiresAuth, updateReview);
router.delete("/review/:reviewId", requiresAuth, deleteReview);
router.get("/review/:reviewId", fetchOneReview);
router.get("/reviews", fetchAllReviews);
router.get("/reviews/user/:userId", fetchAllReviewsByUser);
router.get("/reviews/salon/:salonId", fetchAllReviewsBySalon);

module.exports = router;
