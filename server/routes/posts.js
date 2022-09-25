import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost, getPostsByUser } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.post('/', auth, createPost);
postRouter.get('/:id', getPost);
postRouter.patch('/:id', updatePost);
postRouter.delete('/:id', auth, deletePost);
postRouter.patch('/:id/likePost', likePost);
postRouter.get('/userPosts/:userId', auth, getPostsByUser);

export default postRouter;