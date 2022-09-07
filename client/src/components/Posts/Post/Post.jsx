/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
	Card, CardHeader, CardMedia, CardActions, CardContent, Button, Typography,
} from '@mui/material';
import { MoreHorizOutlined, DeleteOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import moment from 'moment';

import './style.css';

import { getCurrentId, removePost } from '../../../features/posts/postsSlice.js';

const Post = ({ post }) => {
	const dispatch = useDispatch();
	return (
		<Card className="card">
			<CardMedia className="media" component='img' image={post.selectedFile} title={post.title} />
			<div className="overlay">
				<Typography variant="h6">{post.creator}</Typography>
				<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
			</div>
			<div className="overlay2">
				<Button variant="h6" style={{ color: 'white' }} size="small" onClick={() => dispatch(getCurrentId(post._id))} >
					<MoreHorizOutlined fontSize="default" />
				</Button>
			</div>
			<div className="details">
				<Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
			</div>

			<Typography className="title" variant="h5" gutterBottom>{post.title}</Typography>

			<CardContent>
				<Typography className="message" variant="body2" >{post.message}</Typography>
			</CardContent>
			<CardActions className="card-actions">
				<Button variant="h6" color="primary" size="small" onClick={() => {}} >
					<ThumbUpAltOutlined fontSize="default" /> Like
				</Button>
				<Button variant="h6" color="primary" size="small" onClick={() => dispatch(removePost({ id: post._id }))} >
					<DeleteOutlined fontSize="default" /> Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;