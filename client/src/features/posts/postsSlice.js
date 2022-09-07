/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchPosts, createPost, updatePost, deletePost,
} from '../../api/index.js';

const initialState = {
	posts: [],
	isLoading: true,
	currentId: '',
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
	const response = await fetchPosts();
	return response.data;
});

export const addNewPost = createAsyncThunk(
	'posts/addNewPost',
	// The payload creator receives the partial `{creator, title, message, tags:[], selectedFile}`
	async (newPost) => {
		// save the new post to the database
		const response = await createPost(newPost);

		// The response from the database will include the complete object and assigned unique ID's
		return response.data;
	},
);
export const editPost = createAsyncThunk(
	'posts/editPost',
	// The payload creator receives the updatedPost and its Id
	async ({ id, updatedPost }) => {
		try {
			console.log(updatedPost);
			const response = await updatePost(id, updatedPost);
			// The response from the database will include the complete object and assigned unique ID's
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const removePost = createAsyncThunk(
	'posts/removePost',
	async ({ id }) => {
		try {
			await deletePost(id);
			return { id };
		} catch (error) {
			console.log(error);
		}
	},
);

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		getCurrentId(state, action) {
			state.currentId = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				// Add any fetched posts to the array
				state.posts = state.posts.concat(action.payload);
			})
			.addCase(getPosts.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				state.posts.push(action.payload);
			})
			.addCase(editPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editPost.fulfilled, (state, action) => {
				state.isLoading = false;
				// console.log(action.payload);
				const index = state.posts.findIndex((post) => post._id === action.payload._id);
				state.posts[index] = {
					...state.posts[index],
					...action.payload,
				};
			})
			.addCase(editPost.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(removePost.fulfilled, (state, action) => {
				const index = state.posts.findIndex(({ id }) => id === action.payload._id);
				state.posts.splice(index, 1);
			});
	},
});
export const { getCurrentId } = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
