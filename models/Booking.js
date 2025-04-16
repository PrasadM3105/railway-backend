const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    from: String,
    to: String
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
