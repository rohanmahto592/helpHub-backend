const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String,required:true },
  password: { type: String, required: true },
  profileUrl: { type: String },
  currentLocation: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  isHelper: { type: Boolean, default: true },
  registerAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
UserSchema.index({ currentLocation:"2dsphere" });
module.exports = mongoose.model("User", UserSchema);


