/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBCardImage,
	MDBCol,
	MDBRow,
} from 'mdb-react-ui-kit';

import { Link } from 'react-router-dom';
import excerpt from '../utilities/index.js';

const RelatedPosts = ({ relatedPosts, postId }) => (
	<>
		{
			relatedPosts && relatedPosts.length > 0 && (
				<>
					{
						relatedPosts.length > 1 && <h4>related posts</h4>
					}
					<MDBRow className='row-col-1 row-cols-md-3 g-4'>
						{
							relatedPosts.filter((post) => post._id !== postId).splice(0, 3).map((relatedPost) => (
								<MDBCol key={relatedPost._id}>
									<MDBCard>
										<Link to={`/post/${relatedPost._id}`}>
											<MDBCardImage
												src={relatedPost.imageFile}
												alt={relatedPost.title}
												position='top'
											/>
										</Link>
										<span className='text-start tag-card' >
											{
												relatedPost.tags.map((tag, i) => (
													<Link key={i} to={`/post/tag/${tag}`}> #{tag}</Link>
												))
											}
										</span>
										<MDBCardBody>
											<MDBCardTitle className='text-start'>
												{
													relatedPost.title
												}
											</MDBCardTitle>
											<MDBCardText className='text-start'>
												{excerpt(relatedPost.description, 45)}
											</MDBCardText>
										</MDBCardBody>
									</MDBCard>
								</MDBCol>
							))
						}
					</MDBRow>
				</>
			)
		}
	</>
);

export default RelatedPosts;