import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    blog: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Blog = new mongoose.model('Blog', blogSchema);

export default Blog;