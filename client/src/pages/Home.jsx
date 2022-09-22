import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBRow, MDBCol, MDBTypography, MDBContainer, MDBSpinner } from 'mdb-react-ui-kit';

import PostCard from '../components/PostCard';

import { getPosts } from '../features/postSlice';

const Home = () => {
  const { posts, isLoading } = useSelector((state) => ({ ...state.posts}));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);
  
  if (isLoading) {
    return (
      <div style={{ marginTop: '100px'}} className='text-center'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '1000px',
        alignContent: 'center',
      }}
    >
      <MDBRow className='mt-5'>
        {
          posts.length === 0 && (
            <MDBTypography className='text-center mb-0' tag='h2' >
              No Tours Found
            </MDBTypography>
          )
        }

        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-md-3 g-2' >
              {
                posts && posts.map((post, i) => <PostCard key={i} { ...post } />)
              }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Home