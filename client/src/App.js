/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './app.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

const App = () => {
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getPosts());
	// }, [dispatch]);

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
