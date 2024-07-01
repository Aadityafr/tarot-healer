const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  day: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  planType: { type: String, required: true },
}, {
  timestamps: true
});


bookingSchema.index({ date:1, time: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
