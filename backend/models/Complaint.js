const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  category:   { type: String, required: true },
  message:    { type: String, required: true },
  priority:   { type: String, default: 'medium' },
  status:     { type: String, default: 'pending' },
  trackingId: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);