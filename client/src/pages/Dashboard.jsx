import React, { useEffect } from 'react'
import {
  MDBCard, 
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBIcon,
  MDBSpinner,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardGroup,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

import Spinner from '../components/Spinner';

import { getPostsByUser, deletePost } from '../features/postSlice';


const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userPosts, isLoading } = useSelector((state) => ({ ...state.posts }));
  const userId = user?.result?._id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPostsByUser(userId));
  }, [userId, dispatch]);

  const excerpt = (str) => {
    if (str.length > 45){
      str = str.substring(0, 45) + '...';
    }
    return str;
  }
  
  if (isLoading) {
    return (
      <Spinner />
    );
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')){
      dispatch(deletePost({ id, toast }));
    }
  };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '120px',
        maxWidth: '900px',
        alignContent: 'center',
      }}
    >
      <h4 className='text-center'>Dashboard: {user?.result?.name}</h4>
      <hr style={{ maxWidth: '570px' }} />
      {
        userPosts && userPosts.map((userPost) => (
          <MDBCardGroup key={userPost._id}>
            <MDBCard
              style={{ maxWidth: '600px'}}
              className='mt-2'
            >
              <MDBRow className='g-0'>
                <MDBCol md='4'>
                  <MDBCardImage 
                    className='rounded'
                    src={userPost.imageFile}
                    alt={userPost.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md='8'>
                  <MDBCardBody>
                    <MDBCardTitle className='text-start'>
                      { userPost.title}
                    </MDBCardTitle>
                    <MDBCardText className='text-start'>
                      <small className='text-muted'>
                        {
                          excerpt(userPost.description)
                        }
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: '5px',
                        float: 'right',
                        marginTop: '-60px',
                      }}
                    >
                      <MDBBtn className='mt-1' tag='a' color='none'>
                        <MDBIcon 
                          fas
                          icon='trash'
                          style={{ color: '#dd4b39' }}
                          size='lg'
                          onClick={() => handleDelete(userPost._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editPost/${userPost._id}`}>
                        <MDBIcon 
                          fas
                          icon='edit'
                          style={{ color: '#55acee', marginLeft: '10px' }}
                          size='lg'
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))
      }
    </div>
  )
}

export default Dashboard