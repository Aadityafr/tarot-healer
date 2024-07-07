const express = require('express');
const router = express.Router();
const { createBooking, getBookedSlots } = require('../controllers/bookingController');
const Booking  = require('../models/Booking');

router.post('/book', createBooking);
router.get('/booked-slots', getBookedSlots);


module.exports = router;
