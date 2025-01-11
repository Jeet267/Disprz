const User = require("../models/User");
const Survey = require("../models/Survey");

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.userId });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send("User deleted succussfully");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createSurvey = async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();

    if (req.body.assignedUsers) {
      await User.updateMany(
        { _id: { $in: req.body.assignedUsers } },
        { $push: { assignedSurveys: survey._id } }
      );
    }

    res.status(201).send(survey);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  addUser,
  removeUser,
  createSurvey,
};
