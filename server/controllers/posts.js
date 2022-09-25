import mongoose from 'mongoose';

import PostModal from '../models/posts.js';

export const getPosts = async (req, res) => { 
    try {
        const posts = await PostModal.find();
                
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const Post = await PostModal.findById(id);
        
        res.status(200).json(Post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const posts = req.body;

    const newPost = new PostModal({
        ...posts,
        creator: req.userId,
    })

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description, name, imageFile, tags } = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with id: ${id}` });

        const updatedPost = { name, title, description, tags, imageFile, _id: id };
    
        await PostModal.findByIdAndUpdate(id, updatedPost, { new: true });
    
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with id: ${id}` });

        await PostModal.findByIdAndRemove(id);

        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostModal.findById(id);

    const updatedPost = await PostModal.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}
export const getPostsByUser = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: `No post with id: ${userId}`});
    
    const userPosts = await PostModal.find({ creator: userId });
    
    res.status(200).json(userPosts);
}
