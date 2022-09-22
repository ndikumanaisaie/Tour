import React, { useEffect } from 'react'
import {
  MDBCard, 
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getPost } from '../features/postSlice';

const SinglePost = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => ({ ...state.posts}));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id])
  

  return (
    <MDBContainer>
      <MDBCard className='mb-3 mt-2'>
        <MDBCardImage 
          position='top'
          style={{ widith: '100%', maxHeight: '600px' }}
          src={post.imageFile}
          alt={post.title}
        />
        <MDBCardBody>
          <h3>{post?.title}</h3>
          <span>
            <p className='text-start post-name'>Created by: {post.name}</p>
          </span>
          <div style={{ float: 'left' }}>
            <span className='text-start'>
              {
                post && post.tags && tags.map((tag) => `#${post} `)
              }
            </span>
          </div>
          <br />
          <MDBCardText className='text-start mt-2'>
            <MDBIcon 
              style={{ float: 'left', margin: '5px' }}
              far
              icon='calendar-alt'
              size='lg'
            />
            <small className='text-muted'>
              {moment(post.createdAt).fromNow()}
            </small>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

export default SinglePost