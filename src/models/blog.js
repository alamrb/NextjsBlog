import mongoose from "mongoose";



//databse
// model
// api routes->add, fetch/get, update, delete

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

})

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;