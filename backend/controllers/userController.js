import User from '../models/userModel.js';


export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ auth0Id: req.params.auth0Id });
        res.json(user || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData.auth0Id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const existingUser = await User.findOne({ 
            username: userData.username,
            auth0Id: { $ne: userData.auth0Id }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

       
        userData.profileCompleted = true;

        const user = await User.findOneAndUpdate(
            { auth0Id: userData.auth0Id },
            { ...userData },
            { new: true, upsert: true, runValidators: true }
        );
        
        res.json(user);
    } catch (error) {
        // This catch block will now automatically handle validation errors from Mongoose
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        res.status(500).json({ error: error.message });
    }
};

export const checkUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const existingUser = await User.findOne({ username });
        res.json({
            available: !existingUser,
            currentUser: existingUser?.auth0Id === req.query.auth0Id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};