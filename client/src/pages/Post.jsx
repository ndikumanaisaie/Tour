import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';

import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../features/postSlice.js';


const initialState = {
  title: '',
  description: '',
  tags: [],
}
const Post = () => {
  const [postData, setPostData] = useState(initialState);
  
  const { title, description, tags } = postData;

  const { error, isLoading } = useSelector((state) => ({ ...state.posts }))
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && tags) {
      const updatedPostData = { ...postData, name: user?.result?.name };

      dispatch(createPost({ updatedPostData, navigate, toast }));

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
        <h5> Add Post</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'> 
            <div className='col-md-12'>
              <input 
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
              <MDBBtn style={{ width: '100%'}}>Submit</MDBBtn>
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