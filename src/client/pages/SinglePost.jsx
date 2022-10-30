/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import RelatedPosts from '../components/RelatedPosts';

import Spinner from '../components/Spinner';
import { getPost, getRelatedPosts } from '../features/postSlice';
import CommentSection from '../components/CommentSection';

const SinglePost = () => {
  const { post, relatedPosts, isLoading } = useSelector((state) => ({ ...state.posts }));
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tags = post?.tags;

  useEffect(() => {
    if (tags) {
      dispatch(getRelatedPosts(tags));
    }
  }, [tags, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <MDBContainer>
      <MDBCard className="mb-3 mt-2">
        <MDBCardImage
          position="top"
          style={{ widith: '100%', maxHeight: '600px' }}
          src={post.imageFile}
          alt={post.title}
        />
        <MDBCardBody>
          <MDBBtn
            tag="a"
            color="none"
            style={{ float: 'left', color: '#000' }}
            onClick={() => navigate('/')}
          >
            <MDBIcon
              fas
              size="lg"
              icon="long-arrow-alt-left"
              style={{ float: 'left' }}
            />
          </MDBBtn>
          <h3>{post?.title}</h3>
          <span>
            <p className="text-start post-name">
              Created by:
              {post.name}
            </p>
          </span>
          <div style={{ float: 'left' }}>
            <span className="text-start">
              {
					      post && post.tags && post.tags.map((tag) => (
  <Link key={tag} to={`/post/tag/${tag}`}>
    {' '}
    #
    {tag}
  </Link>
								))
							}
            </span>
          </div>
          <br />
          <MDBCardText className="text-start mt-2">
            <MDBIcon
              style={{ float: 'left', margin: '5px' }}
              far
              icon="calendar-alt"
              size="lg"
            />
            <small className="text-muted">
              {moment(post.createdAt).fromNow()}
            </small>
          </MDBCardText>
          <MDBCardText className="lead mb-0 text-start">
            {
							post.description
						}
          </MDBCardText>
        </MDBCardBody>
        {/* Related posts */}
        <RelatedPosts relatedPosts={relatedPosts} postId={id} />
      </MDBCard>
      <CommentSection post={post} />
    </MDBContainer>
  );
};

export default SinglePost;
