/* eslint-disable consistent-return */
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req;

});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const googleSignIn = (result) => API.post('/users/googleSignIn', result);

export const createPost = (postData) => API.post('/posts', postData);
export const getPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, updatedData) => API.patch(`/posts/${id}`, updatedData);
export const getPostsByUser = (userId) => API.get(`/posts/userPosts/${userId}`);