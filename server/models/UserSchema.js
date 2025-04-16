import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isNewUser: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: String,
    credits: {
        type: Number,
        default: 300
    }
}, { timestamps: true });

const User = new mongoose.model('User', userSchema);

export default User;