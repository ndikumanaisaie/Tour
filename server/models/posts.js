import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    comments:{
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model('posts', postSchema);