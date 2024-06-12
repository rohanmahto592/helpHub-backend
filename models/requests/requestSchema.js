const mongoose = require("mongoose");
const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  typeOfHelp: { type: [String], required: true }, // e.g., 'Grocery Shopping', 'Tutoring'
  details: { type: String },
  pickupLocation: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // Coordinates of the store or anything where helper need to reach.
  },
  deliveryLocation: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true }, // Coordinates of the user's address where the delivery person need to reach after fulfilling the request.
  },
  status: { type: String, default: "Pending" }, // e.g., 'Pending', 'Accepted', 'Completed'
  matchedOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offer" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

RequestSchema.index({ pickupLocation: "2dsphere" });
RequestSchema.index({ deliveryLocation: "2dsphere" });

module.exports = mongoose.model("Request", RequestSchema);
