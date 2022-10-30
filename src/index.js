/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './client/index.css';
import App from './client/App';
import authReducer from './client/features/authSlice';
import postReducer from './client/features/postSlice';

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
