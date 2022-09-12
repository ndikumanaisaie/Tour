import React, {useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import { login } from '../features/authSlice';

const initialState = {
  email: '',
  password: '',
}
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const { isLoading, error } = useSelector((state) => ({...state.auth}));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({formValue, navigate, toast}))
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({...formValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px',
      }}
    >
      <MDBCard>
        <MDBIcon fas icon='user-circle' className='fa-2x'/>
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'> 
            <div className='col-md-12'>
              <MDBInput 
                label='email'
                type='email'
                value={email}
                onChange={onInputChange}
                name='email'
                required
                validation="Please provide your email"
              />
            </div>
            <div className='col-md-12'>
              <MDBInput 
                label='password'
                type='password'
                value={password}
                onChange={onInputChange}
                name='password'
                required
                validation="Please provide your password"
              />
            </div>
            <div className='col-12'>
              <MDBBtn style={{ width: '100%'}} className='mt-2'>
                {
                  isLoading && (
                    <MDBSpinner
                      size='small'
                      role='status'
                      tag='span'
                      className='me-2'
                    />
                  )
                }
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/Register'>
            <p>Don't have an account? Sign up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Login