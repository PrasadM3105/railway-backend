const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST - Create a new booking
router.post('/book', async (req, res) => {
    const { from, to } = req.body;
    try {
        const newBooking = new Booking({ from, to });
        await newBooking.save();
        res.status(201).send('Booking Successful');
    } catch (error) {
        res.status(400).send('Error Booking');
    }
});

// GET - Retrieve all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Error retrieving bookings');
    }
});

module.exports = router;
