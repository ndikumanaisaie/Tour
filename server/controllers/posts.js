/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const {
		creator, title, message, tags, selectedFile,
	} = req.body;

	const newPostMessage = new PostMessage({
		creator, title, message, tags, selectedFile,
	});

	try {
		await newPostMessage.save();

		res.status(201).json(newPostMessage);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const {
		title, message, creator, selectedFile, tags,
	} = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

	const updatedPost = {
		creator, title, message, tags, selectedFile, _id: id,
	};

	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: 'Post deleted successfully.' });
};
