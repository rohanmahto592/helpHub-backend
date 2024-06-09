const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 } // Rating between 1 and 5
});

const UserDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: { type: [SkillSchema], default: [] }, // Array of skills with ratings
  college: { type: String }, // College name
  degree: { type: String }, // Degree name
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserDetails', UserDetailsSchema);
