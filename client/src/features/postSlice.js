import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const createPost = createAsyncThunk('post/createPost', async({ updatedPostData, navigate, toast }, {rejectWithValue}) => {
  try {
    const response = await api.createPost(updatedPostData);
    toast.success('Post created Successfully!');
    navigate('/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
export const getPosts = createAsyncThunk('post/getPosts', async(_, {rejectWithValue}) => {
  try {
    const response = await api.getPosts();
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
export const getPost = createAsyncThunk('post/getPost', async(id, {rejectWithValue}) => {
  try {
    const response = await api.getPost(id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
export const getPostsByUser = createAsyncThunk('post/getPostsByUser', async(userId, {rejectWithValue}) => {
  try {
    const response = await api.getPostsByUser(userId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const authSlice = createSlice({
  name: 'posts',
  initialState: {
    post: {},
    posts: [],
    userPosts: [],
    error: '',
    isLoading: false
  },
  extraReducers(builder) {
		builder
			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [action.payload];
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
			.addCase(getPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
			.addCase(getPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
			})
			.addCase(getPost.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
			.addCase(getPostsByUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPostsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPosts = action.payload;
			})
			.addCase(getPostsByUser.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			});
	},
});

export default authSlice.reducer;