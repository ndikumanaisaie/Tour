import React from 'react';
import {
  MDBCard, 
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import excerpt from '../utilities/index.js'

const PostCard = ({ imageFile, description, title, tags, _id, name }) => {

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