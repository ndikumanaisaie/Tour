/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './App.js';
import postsReducer from './features/posts/postsSlice.js';

const store = configureStore({
	reducer: {
		posts: postsReducer,
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