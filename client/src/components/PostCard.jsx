import React from 'react';
import {
  MDBCard, 
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import excerpt from '../utilities/index.js'
import { likePost } from '../features/postSlice.js';

const PostCard = ({ imageFile, description, title, tags, _id, name, likes }) => {
  const { user } = useSelector((state) => ({...state.auth}));
  const userId = user?.result?._id || user?.result?.googleId;

  const dispatch = useDispatch();

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {
            likes.length > 2 ? (
              <MDBTooltip 
                tag='a'
                title={`You and ${likes.length -1 } other people likes this`}
              >
                {likes.length} Likes
              </MDBTooltip>
            ) : (
              `${likes.length} Like${likes.length > 1 ? 's': ''}`
            )
          }
        </>
      ) : (
        <>
          <MDBIcon far icon='thumbs-up' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon='thumbs-up' />
        &nbsp;Like
      </>
    );
  };
  
  const handleLike = () => {
    dispatch(likePost({ _id }));
  };
  return (
    <MDBCardGroup>
      <MDBCard className='h-180 mt-2 d-sm-flex' style={{ maxWidth: '20rem' }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position='top'
          style={{ maxWidth: '100%', height: '180px' }}
        />
          <div className='top-left'>{name}</div>
          <span className='text-start tag-card'>
            {
              tags.map((tag, i) => (
                <Link key={i} to={`/post/tag/${tag}`}> #{tag}</Link>
              ))
            }
            <MDBBtn
              style={{float:'right'}}
              tag='a'
              color='none'
              onClick={!user?.result ? null : handleLike}
            >
              {
                !user?.result ? (
                  <MDBTooltip title='Please login to like this post' tag='a'>
                    <Likes />
                  </MDBTooltip>
                ) : (
                  <Likes />
                )
              }
            </MDBBtn>
          </span>

          <MDBCardBody>
            <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
            <MDBCardText className='text-start'>
              {
                excerpt(description, 100)
              }
              <Link to={`/post/${_id}`}>Read More</Link>
            </MDBCardText>
          </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default PostCard