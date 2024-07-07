const Booking = require('../models/Booking');
const mongoose = require('mongoose');

const createBooking = async (req, res) => {
  try {
    const { name, date, time, mobile, email, gender, planType } = req.body;

    const bookingDate = new Date(date);
    const bookingTime = time;

    const existingBooking = await Booking.findOne({ date: bookingDate, time: bookingTime });

    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    const booking = new Booking({ name, date: bookingDate, time: bookingTime, mobile, email, gender, planType });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    const bookings = await Booking.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    const bookedTimes = bookings.map(booking => booking.time);

    res.status(200).json(bookedTimes);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  createBooking,
  getBookedSlots, 
};
