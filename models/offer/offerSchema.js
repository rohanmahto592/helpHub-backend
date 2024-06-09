const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  typeOfHelp: { type: [String], required: true }, // e.g., 'Grocery Shopping', 'Tutoring'
  details: { type: String },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  availability: { type: String }, // e.g., 'Weekdays', 'Weekends'
  status: { type: String, default: 'Available' }, // e.g., 'Available', 'Accepted', 'Completed'
  createdAt: { type: Date, default: Date.now }
});

OfferSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Offer', OfferSchema);
