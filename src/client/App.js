/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './app.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Post from './pages/Post';
import Header from './components/Header';
import SinglePost from './pages/SinglePost';
import { setUser } from './features/authSlice';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import TagPosts from './pages/TagPosts';

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user));
  });

  return (
    <div className="app" id="outer-container">
      <div id="page-wrap">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/search" element={<Home />} />
          <Route path="/post/tag/:tag" element={<TagPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/post"
            element={(
              <PrivateRoute>
                <Post />
              </PrivateRoute>
     )}
          />
          <Route
            path="/editPost/:id"
            element={(
              <PrivateRoute>
                <Post />
              </PrivateRoute>
     )}
          />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route
            path="/dashboard"
            element={(
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
     )}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
