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

const authSlice = createSlice({
  name: 'posts',
  initialState: {
    post: {},
    posts: [],
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
			});
	},
});

export default authSlice.reducer;