import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
} from 'mdb-react-ui-kit';

import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../features/postSlice.js';


const initialState = {
  title: '',
  description: '',
  tags: [],
}
const Post = () => {
  const [postData, setPostData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  
  const { title, description, tags } = postData;
  const { id } = useParams();

  const { error, userPosts } = useSelector((state) => ({ ...state.posts }))
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const postToEdit = userPosts.find((userPost) => userPost._id === id);
      setPostData({ ...postToEdit });
    }
  }, [id, userPosts]);
  

  useEffect(() => {
    error && toast.error(error);
  }, [error])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tags.length) setTagErrMsg('Please provide some tags');

    if (title && description && tags) {
      const updatedPostData = { ...postData, name: user?.result?.name };

      if (!id) {
        dispatch(createPost({ updatedPostData, navigate, toast }));
      } else {
        dispatch(updatePost({ id, updatedPostData, toast, navigate }));
      }

      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({...postData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setPostData({
      ...postData, 
      tags: postData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setPostData({
      title: '',
      description: '',
      tags: [],
    })
  }

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px'
      }}
    >
      <MDBCard alignment='center'>
        <h5>{ id ? 'Update Post': 'Add New Post'}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'> 
            <div className='col-md-12'>
              <MDBInput 
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={onInputChange}
                className='form-control'
                name='title'
                required
                validation="Please enter your title"
              />
            </div>
            <div className='col-md-12'>
              <textarea 
                type='text'
                placeholder='Enter Description'
                value={description}
                className='form-control'
                style={{ height: '100px' }}
                onChange={onInputChange}
                name='description'
                required
                validation="Please provide description"
              />
            </div>
            <div className='col-md-12'>
              <ChipInput
                name='tags'
                variant='outlined'
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {
                tagErrMsg && (
                  <div className="tagErrMsg">{tagErrMsg}</div>
                )
              }
            </div>
            <div className='d-flex justify-content-start'>
              <FileBase
                type='file'
                multiple={false}
                onDone={({base64}) => {
                  setPostData({ ...postData, imageFile: base64 })
                }}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className='col-md-12'>
              <MDBBtn style={{ width: '100%'}}>{ id ? 'Update': 'Submit'}</MDBBtn>
              <MDBBtn 
                style={{ width: '100%'}}
                className='mt-2'
                color='danger'
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
   </div>
  )
};

export default Post;