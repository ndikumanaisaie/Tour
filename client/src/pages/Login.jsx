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
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import { login, googleSignIn } from '../features/authSlice';

const initialState = {
  email: '',
  password: '',
}
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const { isLoading, error } = useSelector((state) => ({...state.auth}));

  const clientId = '141620846333-oiepfcs7an6th0f5l1hjddfa6ujfimik.apps.googleusercontent.com'

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
          clientId: clientId,
          scope: ''
      });
    };
     gapi.load('client:auth2', initClient);
 }, []);

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

  const googleSuccess = (res) => {
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const googleId = res?.googleId;
    const token = res?.tokenId;
    const result = { email, name, googleId, token, };

    dispatch(googleSignIn({ result, navigate, toast }))
  };
  const googleFailure = (error) => {
    console.log('error:', error);
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
          <br />
          <GoogleLogin
            clientId={clientId}
            render={(renderProp) => (
              <MDBBtn
                style={{width: '100%'}}
                onClick={renderProp.onClick}
                disabled={renderProp.disabled}
                color='danger'
              >
                <MDBIcon className='me-2' fab icon='google' /> Login with google
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
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