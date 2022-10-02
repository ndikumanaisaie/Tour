import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBRow, MDBCol, MDBTypography, MDBContainer } from 'mdb-react-ui-kit';

import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

import { getPosts } from '../features/postSlice';

const Home = () => {
  const { posts, isLoading, currentPage } = useSelector((state) => ({ ...state.posts}));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [dispatch, currentPage]);
  
  if (isLoading) {
    return (
      <Spinner />
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
                posts && posts?.map((post, i) => <PostCard key={i} { ...post } />)
              }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Home