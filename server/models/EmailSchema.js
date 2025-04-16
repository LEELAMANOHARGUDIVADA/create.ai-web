import mongoose from "mongoose"

const emailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Email = new mongoose.model('Email', emailSchema);

export default Email;