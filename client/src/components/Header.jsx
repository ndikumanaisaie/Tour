import React, { useState } from 'react'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBInputGroup,
  MDBCollapse,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { setLogout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../features/postSlice';

const Header = () => {
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => ({ ...state.auth }));

  const token = user?.token
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
  }

  return (
    <MDBNavbar fixed='top' expand='lg' light bgColor='light'>
      <MDBContainer>
        <MDBNavbarBrand
          href='/'
          style={{ color: '#606080', fontWeight: '600', fontSize: '22px'}}
        >
          Memories
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShow(!show)}
          style={{ color: '#606080'}}
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
    // <MDBNavbar expand='lg' light bgColor='light'>
    //   <MDBContainer fluid>
    //     <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
    //     <MDBBtn
    //       onClick={() => setShow(!show)}
    //     >
    //       <MDBIcon icon='bars' fas />
    //     </MDBBtn>
    //     <MDBCollapse navbar show={show}>
    //       <MDBNavbarNav>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink active aria-current='page' href='#'>
    //             Home
    //           </MDBNavbarLink>
    //         </MDBNavbarItem>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink href='#'>Features</MDBNavbarLink>
    //         </MDBNavbarItem>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
    //         </MDBNavbarItem>
    //         <MDBNavbarItem>
    //           <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
    //             Disabled
    //           </MDBNavbarLink>
    //         </MDBNavbarItem>
    //       </MDBNavbarNav>
    //     </MDBCollapse>
    //   </MDBContainer>
    // </MDBNavbar>
  )
}

export default Header