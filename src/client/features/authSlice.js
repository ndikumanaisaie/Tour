/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const login = createAsyncThunk('auth/login', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.signIn(formValue);
    toast.success('Login Successfully!');
    navigate('/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const register = createAsyncThunk('auth/register', async ({ formValue, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.signUp(formValue);
    toast.success('Registered Successfully!');
    navigate('/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const googleSignIn = createAsyncThunk('auth/googleSignIn', async ({ result, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await api.googleSignIn(result);
    toast.success('google sign in Successfully!');
    navigate('/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
