import React, { useEffect } from 'react'
import {
  MDBCard, 
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBSpinner,
  MDBRow,
  MDBCol,
  MDBCardGroup,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPostsByUser } from '../features/postSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userPosts, isLoading } = useSelector((state) => ({ ...state.posts }));
  const userId = user?.result?._id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getPostsByUser(userId));
  }, [userId, dispatch])
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard