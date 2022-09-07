import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	creator: {
		require: true,
		type: String,
	},
	title: {
		required: true,
		type: String,
	},
	message: {
		require: true,
		type: String,
	},
	tags: {
		required: true,
		type: [String],
	},
	selectedFile: {
		required: true,
		type: String,
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;