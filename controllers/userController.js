const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Survey = require("../models/Survey");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });
    if (!user) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAssignedSurveys = async (req, res) => {
  try {
    await req.user.populate("assignedSurveys");
    const openSurveys = req.user.assignedSurveys.filter(
      (survey) =>
        !survey.responses.some(
          (response) => response.user.toString() === req.user._id.toString()
        )
    );
    res.send(openSurveys);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const submitSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    console.log(survey);
    if (!survey) {
      return res.status(404).send({ error: "Survey not found" });
    }

    survey.responses.push({
      user: req.user._id,
      answers: req.body.answers,
    });

    await survey.save();
    res.send(survey);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  login,
  getAssignedSurveys,
  submitSurvey,
};
