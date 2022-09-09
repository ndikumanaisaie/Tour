import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';

import Post from './Post/Post.jsx';

const Posts = () => {
	const posts = useSelector((state) => state.posts.posts);
	const isLoading = useSelector((state) => state.posts.isLoading);
	// console.log(posts);
	return (
		isLoading ? <CircularProgress /> : (
			<Grid className="container" container alignItems="stretch" spacing={3} >
				{
					posts?.map((post) => (
						<Grid key={post._id} item xs={12} sm={6}>
							<Post post={post} />
						</Grid>
					))
				}
			</Grid>
		)
	);
};

export default Posts;