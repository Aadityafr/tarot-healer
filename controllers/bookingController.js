const Booking = require('../models/Booking');
const mongoose = require('mongoose');

const createBooking = async (req, res) => {
  try {
    const { name, day, date, time, mobile, email, gender, planType } = req.body;

    const bookingDate = new Date(date);
    const bookingTime = time;

    const existingBooking = await Booking.findOne({ date: bookingDate, time: bookingTime });

    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    const booking = new Booking({ name, day, date: bookingDate, time: bookingTime, mobile, email, gender, planType });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBooking,
};
