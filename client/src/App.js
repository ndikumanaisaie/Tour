/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './app.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Post from './pages/Post.jsx';
import Header from './components/Header.jsx';
import SinglePost from './pages/SinglePost.jsx';
import { setUser } from './features/authSlice.js';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import TagPosts from './pages/TagPosts.jsx';
import ReactBootstrapNav from './components/ReactBootstrapNav.jsx';

const App = () => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(null);

	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize < 768) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	useEffect(() => {
		dispatch(setUser(user));
	});

	return (
		<div className='app' id="outer-container">
			 {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
			 <div id="page-wrap">
				<Header />
				<ToastContainer />
				<Routes>
					<Route path='/' element={ <Home />} />
					<Route path='/post/search' element={ <Home />} />
					<Route path='/post/tag/:tag' element={ <TagPosts />} />
					<Route path='/login' element={ <Login />} />
					<Route path='/register' element={ <Register />} />
					<Route
						path='/post'
						element={
							<PrivateRoute>
								<Post />
							</PrivateRoute>
						} />
					<Route
						path='/editPost/:id'
						element={
							<PrivateRoute>
								<Post />
							</PrivateRoute>
						} />
					<Route path='/post/:id' element={ <SinglePost />} />
					<Route
						path='/dashboard'
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						} />
					<Route path='*' element={<NotFound />}/>
				</Routes>
			 </div>
		</div>
	);
};

export default App;
