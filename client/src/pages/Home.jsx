import React from 'react';
import { useSelector, useDipatch } from 'react-redux';
import { MDBRow, MDBCol, MDBTypography, MDBContainer } from 'mdb-react-ui-kit';

const Home = () => {
  const { posts, isLoaing } = useSelector((state) => ({ ...state.posts}))

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

        }
      </MDBRow>
    </div>
  )
}

export default Home