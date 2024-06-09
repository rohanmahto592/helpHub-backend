const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // ID of the user providing feedback
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ID of the user being reviewed
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 }, // Rating provided by the user (1-5 stars)
  message: { type: String, required: true }, // Feedback message
  createdAt: { type: Date, default: Date.now }, // Timestamp of when the feedback was created
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
