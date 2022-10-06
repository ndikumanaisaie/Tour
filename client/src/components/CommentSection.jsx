import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  MDBCard,
  MDBIcon,
  MDBInput,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBCardText,
} from 'mdb-react-ui-kit';
import { commentPost } from '../features/postSlice';

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  const user = JSON.parse(localStorage.getItem('profile'));
  const id = post._id;
  const commentsRef = useRef();
  const dispatch = useDispatch();

  const handleClick = async () => {
    const value = `${user?.result?.name}: ${comment}`;
    const newComments = await dispatch(commentPost({ id, value }));

    console.log('comments', newComments);
    setComments(newComments.payload.comments);
    setComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
 
   return (
    <MDBCard alignment='start'>
      <MDBCardHeader>Comments ({comments?.length})</MDBCardHeader>
      <MDBCardBody>
        {
          user?.result?.name && (
            <div className='col-md-6 d-flex'>
              <MDBIcon fas icon='user-circle' className='fa-2x'/>
              <MDBInput 
                label='Comment'
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                name='comment'
              />
              <MDBBtn
                color='dark'
                disabled={!comment}
                onClick={handleClick}
              >Comment</MDBBtn>
            </div>
          )
        }
        <MDBCardText className='lead mb-0 text-start'>
          {
            comments?.map((c, i) => (
              <p key={i}><strong>{c?.split(': ')[0]}</strong>: {c?.split(': ')[1]}</p>
            ))
          }
          <div ref={commentsRef} />
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export default CommentSection