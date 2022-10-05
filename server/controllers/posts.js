import mongoose from 'mongoose';

import PostModal from '../models/posts.js';

export const getPosts = async (req, res) => { 
    const { page } = req.query;
    try {
        // const posts = await PostModal.find();   
        // res.status(200).json(posts);
        const limit = 6;
        const startIndex = (Number(page) -1) * limit;
        const total = await PostModal.countDocuments({});
        const posts = await PostModal.find().limit(limit).skip(startIndex);
        res.json({
            data: posts,
            currentPage: Number(page),
            totalPosts: total,
            numberOfPages: Math.ceil(total/limit),
        })
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
    console.log('userId: ', req.userId);
    try {
        if (!req.userId) {
            return res.json({ message: 'User is not authenticated' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        
        const post = await PostModal.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostModal.findByIdAndUpdate(id, post, { new: true, });
    
        res.status(200).json(updatedPost);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

    
}
export const getPostsByUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ message: `No post with id: ${userId}`});
    
    const userPosts = await PostModal.find({ creator: req.userId });
    res.status(200).json(userPosts);
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostModal.find({ title });
        res.json(posts);
    } catch (error) {
        res.status(404).json({ message: 'This post does not exist in the database' });
    }
}

export const getPostsByTag = async (req, res) => {
    
    const { tag } = req.params;
    try {
        const posts = await PostModal.find({ tags: { $in: tag } });
        res.json(posts);
    } catch (error) {
        res.status(404).json({ message: 'This post does not exist in the database' });
    }
}

export const getRelatedPosts = async (req, res) => {
    const tags = req.body;
    try {
        const posts = await PostModal.find({ tags: { $in: tags } });
        res.json(posts);
    } catch (error) {
        res.status(404).json({ message: 'This post does not exist in the database' });
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    try {
        const post = await PostModal.findById(id);
        post.comments.push(value);
        
        const updatedPost = await PostModal.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}