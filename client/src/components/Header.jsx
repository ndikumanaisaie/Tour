import React, { useState } from 'react'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../features/postSlice';

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(getPostsBySearch(search));
      navigate(`/posts/search?searchQuery=${search}`);
      setSearch('');
    } else {
      navigate('/');
    }
  }

  return (
    <MDBNavbar fixed='top' expand='lg' style={{ background: '#f0e6ea' }} >
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
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
              <p className='header-text'>Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
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
                <MDBNavbarItem>
                  <MDBNavbarLink href='/Login'>
                    <p className='header-text'>Login</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
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
            <div style={{ marginTop: '5px', marginLeft: '5px' }}>
              <MDBIcon fas icon='search' />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header