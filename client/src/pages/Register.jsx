import React, { useState, useEffect } from 'react';
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

import { register } from '../features/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;

  const { isLoading, error } = useSelector((state) => ({...state.auth}));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Password should match')
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({formValue, navigate, toast}))
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
        <h5>Register</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'> 
            <div className='col-md-6'>
              <MDBInput 
                label='firstName'
                type='firstName'
                value={firstName}
                onChange={onInputChange}
                name='firstName'
                required
                validation="Please provide your first name"
              />
            </div>
            <div className='col-md-6'>
              <MDBInput 
                label='lastName'
                type='lastName'
                value={lastName}
                onChange={onInputChange}
                name='lastName'
                required
                validation="Please provide your lastName"
              />
            </div>
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
            <div className='col-md-12'>
              <MDBInput 
                label='confirm password'
                type='password'
                value={confirmPassword}
                onChange={onInputChange}
                name='confirmPassword'
                required
                validation="Please confirm your password"
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
                Sign Up
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/Login'>
            <p>Already registered? Login here</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Register;