const mongoose=require("mongoose")
const RequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    typeOfHelp: { type: [String], required: true }, // e.g., 'Grocery Shopping', 'Tutoring'
    details: { type: String },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true }
    },
    status: { type: String, default: 'Pending' }, // e.g., 'Pending', 'Accepted', 'Completed'
    createdAt: { type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now }
  });
  
  RequestSchema.index({ location: '2dsphere' });
  
  module.exports = mongoose.model('Request', RequestSchema);