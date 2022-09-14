/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './app.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { setUser } from './features/authSlice';

const App = () => {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem('profile'));
	useEffect(() => {
		dispatch(setUser(user));
	});

	return (
		<div className='app'>
			<Header />
			<ToastContainer />
				<Routes>
					<Route path='/' element={ <Home />} />
					<Route path='/login' element={ <Login />} />
					<Route path='/register' element={ <Register />} />
				</Routes>
		</div>
	);
};

export default App;
