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
});

export const getPosts = createAsyncThunk('post/getPosts', async(page, {rejectWithValue}) => {
  try {
    const response = await api.getPosts(page);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPost = createAsyncThunk('post/getPost', async(id, {rejectWithValue}) => {
  try {
    const response = await api.getPost(id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async({id, toast}, {rejectWithValue}) => {
  try {
    const response = await api.deletePost(id);
    toast.success('Post deleted Successfully!');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async({id, updatedPostData, toast, navigate}, {rejectWithValue}) => {
  try {
    const response = await api.updatePost(updatedPostData, id);
    toast.success('Post updated Successfully!');
    navigate('/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPostsByUser = createAsyncThunk('post/getPostsByUser', async(userId, {rejectWithValue}) => {
  try {
    const response = await api.getPostsByUser(userId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPostsBySearch = createAsyncThunk('post/getPostBySearch', async(search, {rejectWithValue}) => {
  try {
    const response = await api.getPostsBySearch(search);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getPostsByTag = createAsyncThunk('post/getPostByTag', async(tag, {rejectWithValue}) => {
  try {
    const response = await api.getPostsByTag(tag);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getRelatedPosts = createAsyncThunk('post/getRelatedPosts', async(tags, {rejectWithValue}) => {
  try {
    const response = await api.getRelatedPosts(tags);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const likePost = createAsyncThunk('post/likePost', async({_id}, {rejectWithValue}) => {
  try {
    const response = await api.likePost(_id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const commentPost = createAsyncThunk('post/commentPost', async({ id, value }, {rejectWithValue}) => {
  try {
    const response = await api.commentPost(id, value);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const postSlice = createSlice({
  name: 'posts',
  initialState: {
    post: {},
    posts: [],
    userPosts: [],
    tagPosts: [],
    relatedPosts: [],
    currentPage: 1,
    numberOfPages: null,
    error: '',
    isLoading: false
  },
  reducers:{
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
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
        state.posts = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
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
      .addCase(likePost.pending, (state) => {})
			.addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const { arg : { _id } } = action.meta;
        if (_id) {
          state.posts = state.posts.map((post) => post._id === _id ? action.payload: post);
        }
			})
			.addCase(likePost.rejected, (state, action) => {
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
			})
			.addCase(deletePost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('action', action);
        const { arg : { id } } = action.meta;
        if (id) {
          state.userPosts = state.userPosts.filter((userPost) => userPost._id !== id);
          state.posts = state.posts.filter((post) => post._id !== id);
        }
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
			.addCase(updatePost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const { arg : { id } } = action.meta;
        if (id) {
          state.userPosts = state.userPosts.map((userPost) => userPost._id === id ? action.payload: userPost);
          state.posts = state.posts.map((post) => post._id === id ? action.payload: post);
        }
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
      .addCase(getPostsBySearch.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
			.addCase(getPostsBySearch.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
			})
      .addCase(getPostsByTag.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
			.addCase(getPostsByTag.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPostsByTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tagPosts = action.payload;
			})
      .addCase(getRelatedPosts.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			})
			.addCase(getRelatedPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRelatedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedPosts = action.payload;
			})
      .addCase(commentPost.pending, (state) => {
				// state.isLoading = true;
			})
			.addCase(commentPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
			})
			.addCase(commentPost.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			});
	},
});

export const { setCurrentPage } = postSlice.actions;

export default postSlice.reducer;