/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css'
import App from './App.js';
import authReducer from './features/authSlice.js';
import postReducer from './features/postSlice.js';

const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postReducer,
	},
});
const root = createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
);