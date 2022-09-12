import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const login = createAsyncThunk('auth/login', async({formValue, navigate}, {rejectWithValue}) => {
  try {
    const response = await api.signIn(formValue);
    navigate('/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    isLoading: false
  },
  reducers: {},
  extraReducers(builder) {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('prolile', JSON.stringify({...action.payload}));
        state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload.message;
			});
	},
});

export default authSlice.reducer;