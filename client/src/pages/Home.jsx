/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	MDBRow, MDBCol, MDBTypography, MDBContainer,
} from 'mdb-react-ui-kit';

import PostCard from '../components/PostCard.jsx';
import Spinner from '../components/Spinner.jsx';

import { getPosts, setCurrentPage } from '../features/postSlice.js';
import Pagination from '../components/Pagination.jsx';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
	const {
		posts, isLoading, currentPage, numberOfPages,
	} = useSelector((state) => ({ ...state.posts }));

	const dispatch = useDispatch();
	const location = useLocation();
	const query = useQuery();
	const searchQuery = query.get('searchQuery');

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
				maxWidth: '100%',
				alignContent: 'center',
			}}
		>
			<MDBRow className='mt-4'>
				{
					posts.length === 0 && location.pathname === '/' && (
						<MDBTypography className='text-center mb-0' tag='h2' >
              No posts Found
						</MDBTypography>
					)
				}
				{
					posts.length === 0 && location.pathname !== '/' && (
						<MDBTypography className='text-center mb-0' tag='h2' >
              We couldn&apos;t find any match with &rdquo;{searchQuery}&rdquo;
						</MDBTypography>
					)
				}

				<MDBCol>
					<MDBContainer fluid>
						<MDBRow className='row-cols-md-3 g-2' >
							{
								posts && posts?.map((post, i) => <PostCard key={i} { ...post } />)
							}
						</MDBRow>
					</MDBContainer>
				</MDBCol>
			</MDBRow>
			{
				posts.length > 0 && (
					<Pagination
						setCurrentPage={setCurrentPage}
						numberOfPages={numberOfPages}
						currentPage={currentPage}
						dispatch={dispatch}
					/>
				)
			}
		</div>
	);
};

export default Home;