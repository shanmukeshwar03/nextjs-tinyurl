import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import router from 'next/router';

export const signin = createAsyncThunk('signin', async (payload) => {
  try {
    const response = await axios.post('auth/signin', payload);
    return {
      success: response.data,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    signinLoading: false,
    signupLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = undefined;
    },
  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      state.signinLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      if (action.payload.error) {
      } else {
        state.user = action.payload.success;
        router.replace('/dashboard');
      }
      state.signinLoading = false;
    },
  },
});

export const { setUser, removeUser } = slice.actions;
export default slice.reducer;
