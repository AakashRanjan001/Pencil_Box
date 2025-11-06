import Contact from '../models/contactModel.js';

export const createContactMessage = async (req, res) => {
    try {
        const contactData = new Contact(req.body);
        await contactData.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Please fill all required fields' });
        }
        res.status(500).json({ error: 'Failed to send message' });
    }
};