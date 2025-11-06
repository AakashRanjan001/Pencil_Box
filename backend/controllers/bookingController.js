import Booking from '../models/bookingModel.js';

export const createBooking = async (req, res) => {
    try {
        const bookingData = new Booking(req.body);
        await bookingData.save();
        res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Please fill all required fields correctly' });
        }
        res.status(500).json({ error: 'Failed to book call' });
    }
};