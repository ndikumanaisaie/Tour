/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../features/authSlice';
import { getPostsBySearch } from '../features/postSlice';
import { firstCharacter } from '../utilities/index';

const Header = () => {
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => ({ ...state.auth }));

  const token = user?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(getPostsBySearch(search));
      navigate(`/post/search?searchQuery=${search}`);
      setSearch('');
    } else {
      navigate('/');
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Memories</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {
							user?.result?._id && (
								<>
  <Nav.Link href="#action1">
    <MDBIcon fas icon="user-circle" className="fa-2x" />
    <span className="header-text">
      {' '}
      {firstCharacter(user?.result?.name).toUpperCase()}
      {' '}
    </span>
  </Nav.Link>
  <Nav.Link href="/Post">
    <span className="header-text"> Create Post </span>
  </Nav.Link>
  <Nav.Link href="/dashboard">
    <span className="header-text">Dashboard</span>
  </Nav.Link>
								</>
							)
						}
            {
							user?.result?._id ? (
  <Nav.Link href="/Login">
    <span className="header-text" onClick={handleLogout}>Logout</span>
  </Nav.Link>
							) : (
  <>
    <Nav.Link className="mt-2" href="/Login">
      <span className="header-text">Login</span>
    </Nav.Link>
    <Nav.Link href="/Register">
      <Button type="button" className="btn btn-primary">
        Sign up
      </Button>
    </Nav.Link>
  </>
							)
						}
          </Nav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="search post"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MDBBtn outline>Search</MDBBtn>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
