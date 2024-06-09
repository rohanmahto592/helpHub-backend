const mongoose = require('mongoose');

const UserPreferencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preferredShoppingTimes: { type: [String] }, // Array of preferred shopping times
  preferredStores: { type: [String] }, // Array of preferred stores
  otherPreferences: { type: String } // Additional preferences
});

module.exports = mongoose.model('UserPreferences', UserPreferencesSchema);
