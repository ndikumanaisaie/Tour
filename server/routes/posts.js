import express from 'express';

import {
  getPosts,
  getPost, 
  createPost, 
  updatePost, 
  likePost, 
  deletePost, 
  getPostsByUser, 
  getPostsBySearch,
  getPostsByTag,
  getRelatedPosts,
  commentPost, 
} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const postRouter = express.Router();

postRouter.get('/search', getPostsBySearch);
postRouter.get('/tag/:tag', getPostsByTag);
postRouter.post('/ralatedPosts', getRelatedPosts);
postRouter.get('/', getPosts);
postRouter.get('/:id', getPost);

postRouter.patch('/like/:id', auth, likePost);
postRouter.post('/comments/:id', auth, commentPost);
postRouter.post('/', auth, createPost);
postRouter.patch('/:id', auth, updatePost);
postRouter.delete('/:id', auth, deletePost);
postRouter.get('/userPosts/:userId', auth, getPostsByUser);

export default postRouter;