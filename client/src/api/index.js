/* eslint-disable consistent-return */
import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = async (id, updatedPost) => {
	const response = axios.patch(`${url}/${id}`, updatedPost);
	return (await response).data;
};

export const deletePost = (id) => axios.delete(`${url}/${id}`);

// // console.log(updatedPost);

// if (response.data) {
// 	return {
// 		...(await response).data, id,
// 	};
// }
