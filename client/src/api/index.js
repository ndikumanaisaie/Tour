/* eslint-disable consistent-return */
import axios from 'axios';

const API = axios.create({ baseURL: 'https://toursapplication.herokuapp.com/'})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')){
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const googleSignIn = (result) => API.post('/users/googleSignIn', result);

export const createPost = (postData) => API.post('/posts', postData);
export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/like/${id}`);
export const commentPost = (id, value) => API.post(`/posts/comments/${id}`, {value});
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (updatedPostData, id) => API.patch(`/posts/${id}`, updatedPostData);
export const getPostsByUser = (userId) => API.get(`/posts/userPosts/${userId}`);
export const getPostsBySearch = (search) => API.get(`/posts/search?searchQuery=${search}`);
export const getPostsByTag = (tag) => API.get(`/posts/tag/${tag}`);
export const getRelatedPosts = (tags) => API.post('/posts/ralatedPosts', tags);
