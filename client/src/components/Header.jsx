/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
	MDBNavbar,
	MDBContainer,
	MDBIcon,
	MDBBtn,
	MDBNavbarNav,
	MDBNavbarItem,
	MDBNavbarLink,
	MDBNavbarToggler,
	MDBCollapse,
	MDBNavbarBrand,
} from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../features/authSlice.js';
import { getPostsBySearch } from '../features/postSlice.js';

const Header = () => {
	const [show, setShow] = useState(true);
	const [search, setSearch] = useState('');
	const { user } = useSelector((state) => ({ ...state.auth }));
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(null);

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
		<MDBNavbar fixed='top' expand='lg' light bgColor='light'>
	  <MDBContainer>
	    <MDBNavbarBrand
	      href='/'
	      style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}
	    >
	      Memories
	    </MDBNavbarBrand>
	    <MDBNavbarToggler
	      type='button'
	      aria-expanded='false'
	      aria-label='Toggle navigation'
	      onClick={() => setShow(!show)}
	      style={{ color: '#606080' }}
	    >
	      <MDBIcon icon='bars' fas />
	    </MDBNavbarToggler>
	    <MDBCollapse show={show} navbar>
	      <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
	        {
	          user?.result?._id && (
	            <h5 style={{ marginRight: '30px', marginTop: '27px' }}>
	              Logged in as: { user?.result?.name }
	            </h5>
	          )
	        }
	        {
	          user?.result?._id && (
	        <>
	          <MDBNavbarItem>
	            <MDBNavbarLink href='/Post'>
	              <p className='header-text'>Add Post</p>
	            </MDBNavbarLink>
	          </MDBNavbarItem>
	          <MDBNavbarItem>
	            <MDBNavbarLink href='/dashboard'>
	              <p className='header-text'>Dashboard</p>
	            </MDBNavbarLink>
	          </MDBNavbarItem>
	        </>
	          )
	        }
	        {
	          user?.result?._id ? (
	            <MDBNavbarItem>
	              <MDBNavbarLink href='/Login'>
	                <p className='header-text' onClick={ handleLogout }>Logout</p>
	              </MDBNavbarLink>
	            </MDBNavbarItem>
	          ) : (
	            <>
	              <MDBNavbarItem>
	              <MDBNavbarLink href='/Login'>
	                <p className='header-text'>Login</p>
	              </MDBNavbarLink>
	              </MDBNavbarItem>
	              <MDBNavbarItem>
	              <MDBNavbarLink href='/Register'>
	              <button type="button" className="btn btn-primary" style={{ marginTop: '12px' }}>
	                Sign up
	              </button>
	              </MDBNavbarLink>
	              </MDBNavbarItem>
	            </>
	          )
	        }
	      </MDBNavbarNav>
	      <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
	        <input
	          className='form-control'
	          type='text'
	          placeholder='search post'
	          value={search}
	          onChange={(e) => setSearch(e.target.value)}
	        />
	         <MDBBtn outline>Search</MDBBtn>
	      </form>
	    </MDBCollapse>
	  </MDBContainer>
		</MDBNavbar>

	// 	<nav className="navbar navbar-expand-lg navbar-light bg-light">
	// 		<div className="container-fluid">
	// 			<button
	// 				className="navbar-toggler"
	// 				type="button"
	// 				data-toggle="collapse"
	// 				data-target="#navbarSupportedContent"
	// 				aria-controls="navbarSupportedContent"
	// 				aria-expanded="false"
	// 				aria-label="Toggle navigation"
	// 				onClick={() => setActiveMenu(!activeMenu)}
	// 			>
	// 				<i className="fas fa-bars"></i>
	// 			</button>
	// 			{
	// 				activeMenu && (
	// 					<>
	// 						<div className="collapse navbar-collapse" id="navbarSupportedContent">
	// 							<a className="navbar-brand mt-2 mt-lg-0" href="#">
	// 								<img
	// 									src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
	// 									height="15"
	// 									alt="MDB Logo"
	// 									loading="lazy"
	// 								/>
	// 							</a>

	// 							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
	// 								<li className="nav-item">
	// 									<a className="nav-link" href="#">Dashboard</a>
	// 								</li>
	// 								<li className="nav-item">
	// 									<a className="nav-link" href="#">Team</a>
	// 								</li>
	// 								<li className="nav-item">
	// 									<a className="nav-link" href="#">Projects</a>
	// 								</li>
	// 							</ul>
	// 						</div>

	// 						<div className="d-flex align-items-center">
	// 							<a className="text-reset me-3" href="#">
	// 								<i className="fas fa-shopping-cart"></i>
	// 							</a>

	// 							<div className="dropdown">
	// 								<a
	// 									className="text-reset me-3 dropdown-toggle hidden-arrow"
	// 									href="#"
	// 									id="navbarDropdownMenuLink"
	// 									role="button"
	// 									data-mdb-toggle="dropdown"
	// 									aria-expanded="false"
	// 								>
	// 									<i className="fas fa-bell"></i>
	// 									<span className="badge rounded-pill badge-notification bg-danger">1</span>
	// 								</a>
	// 								<ul
	// 									className="dropdown-menu dropdown-menu-end"
	// 									aria-labelledby="navbarDropdownMenuLink"
	// 								>
	// 									<li>
	// 										<a className="dropdown-item" href="#">Some news</a>
	// 									</li>
	// 									<li>
	// 										<a className="dropdown-item" href="#">Another news</a>
	// 									</li>
	// 									<li>
	// 										<a className="dropdown-item" href="#">Something else here</a>
	// 									</li>
	// 								</ul>
	// 							</div>

	// 							<div className="dropdown">
	// 								<a
	// 									className="dropdown-toggle d-flex align-items-center hidden-arrow"
	// 									href="#"
	// 									id="navbarDropdownMenuAvatar"
	// 									role="button"
	// 									data-mdb-toggle="dropdown"
	// 									aria-expanded="false"
	// 								>
	// 									<img
	// 										src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
	// 										className="rounded-circle"
	// 										height="25"
	// 										alt="Black and White Portrait of a Man"
	// 										loading="lazy"
	// 									/>
	// 								</a>
	// 								<ul
	// 									className="dropdown-menu dropdown-menu-end"
	// 									aria-labelledby="navbarDropdownMenuAvatar"
	// 								>
	// 									<li>
	// 										<a className="dropdown-item" href="#">My profile</a>
	// 									</li>
	// 									<li>
	// 										<a className="dropdown-item" href="#">Settings</a>
	// 									</li>
	// 									<li>
	// 										<a className="dropdown-item" href="#">Logout</a>
	// 									</li>
	// 								</ul>
	// 							</div>
	// 						</div>
	// 					</>
	// 				)
	// 			}
	// 		</div>
	// 	</nav>
	);
};

export default Header;