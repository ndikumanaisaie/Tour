/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getPostsByTag } from '../features/postSlice';
import excerpt from '../utilities/index';

const TagPosts = () => {
  const { tagPosts, isLoading } = useSelector((state) => ({ ...state.posts }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getPostsByTag(tag));
    }
  }, [tag, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div
      style={{
			  margin: 'auto',
			  padding: '120px',
			  maxWidth: '900px',
			  alignContent: 'center',
      }}
    >
      <h3 className="text-center">
        Posts with tag.
        {tag}
      </h3>
      <hr style={{ maxWidth: '570px' }} />
      {
				tagPosts && tagPosts.map((tagPost) => (
  <MDBCardGroup key={tagPost._id}>
    <MDBCard style={{ maxWidth: '600px' }} className="mt-2">
      <MDBRow className="g-0">
        <MDBCol md="4">
          <MDBCardImage
            className="rounded"
            src={tagPost.imageFile}
            alt={tagPost.title}
            fluid
          />
        </MDBCol>
        <MDBCol md="8">
          <MDBCardBody>
            <MDBCardTitle className="text-start">
              {
												tagPost.title
											}
            </MDBCardTitle>
            <MDBCardText className="text-start">
              {
												excerpt(tagPost.description, 40)
											}
            </MDBCardText>
            <div
              style={{ float: 'left', marginTop: '-10px' }}
            >
              <MDBBtn
                size="sm"
                rounded
                color="info"
                onClick={() => navigate(`/post/${tagPost._id}`)}
              >
                Read More
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  </MDBCardGroup>
				))
			}
    </div>
  );
};

export default TagPosts;
