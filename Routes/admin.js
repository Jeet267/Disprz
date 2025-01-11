const express = require("express");
const router = express.Router();
const { adminAuth } = require("../Middleware/auth");
const {
  addUser,
  removeUser,
  createSurvey,
} = require("../Controllers/adminController");

router.post("/users", adminAuth, addUser);
router.delete("/users/:userId", adminAuth, removeUser);
router.post("/surveys", adminAuth, createSurvey);

module.exports = router;
