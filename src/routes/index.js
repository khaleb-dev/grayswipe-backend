const { Router } = require("express");
const {
  login,
  register,
  requestPasswordReset,
  setNewPassword,
  requiresAuth,
} = require("../controllers/authController");

const router = Router();

// auth
router.post("/authenticate", login);
router.post("/register", register);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", setNewPassword);

module.exports = router;
