const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["rating", "text"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 5 },
  },
});

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    responses: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        answers: [
          {
            questionId: mongoose.Schema.Types.ObjectId,
            answer: mongoose.Schema.Types.Mixed,
          },
        ],
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Survey", surveySchema);
