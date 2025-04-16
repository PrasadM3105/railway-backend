const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema and Model
const bookingSchema = new mongoose.Schema({
    from: String,
    to: String
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes

// POST /api/book — Add a new booking
app.post('/api/book', async (req, res) => {
    const { from, to } = req.body;
    try {
        const newBooking = new Booking({ from, to });
        await newBooking.save();
        res.status(201).send('Booking Successful');
    } catch (error) {
        res.status(400).send('Error Booking');
    }
});

// GET /api/bookings — Get all bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).send('Error retrieving bookings');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
