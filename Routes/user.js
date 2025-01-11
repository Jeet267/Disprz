const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
const {
  login,
  getAssignedSurveys,
  submitSurvey,
} = require("../controllers/userController");

router.post("/login", login);
router.get("/surveys", auth, getAssignedSurveys);
router.post("/surveys/:id/submit", auth, submitSurvey);

module.exports = router;
