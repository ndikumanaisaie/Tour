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
import { useSelector } from 'react-redux';
const Header = () => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
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
          aria-label='Togle navigation'
          onClick={() => setShow(!show)}
          style={{ color: '#606080'}}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
              <p className='header-text'>Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {
              user?.result?._id && (
            <>
              <MDBNavbarItem>
                <MDBNavbarLink href='/addTour'>
                  <p className='header-text'>Add Tour</p>
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
                    <p className='header-text'>Logout</p>
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
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header