import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true },
    firstName: { 
        type: String, 
        required: [true, 'First name is required.'], 
        trim: true 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required.'], 
        trim: true 
    },
    username: { 
        type: String, 
        required: [true, 'Username is required.'], 
        trim: true, 
        unique: true 
    },
    email: { type: String, required: true, trim: true },
    phone: {
        type: String,
        required: [true, 'A 10-digit phone number is required.'],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    alternativePhone: {
        type: String,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    addressLine1: { 
        type: String, 
        required: [true, 'Address Line 1 is required.'], 
        trim: true 
    },
    addressLine2: { 
        type: String, 
        required: [true, 'Address Line 2 is required.'], 
        trim: true 
    },
    city: { 
        type: String, 
        required: [true, 'City is required.'], 
        trim: true 
    },
    state: { 
        type: String, 
        required: [true, 'State is required.'], 
        trim: true 
    },
    pincode: {
        type: String,
        required: [true, 'A 6-digit pincode is required.'],
        match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
    },
    landmark: { type: String, trim: true },
    profileCompleted: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

export default User;