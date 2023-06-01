import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshingUser: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled]: (state, { payload }) => {
      state.user = payload.email;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.fulfilled]: (state, { payload }) => {
      state.user = payload.email;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logOut.fulfilled]: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.pending]: state => {
      state.isRefreshingUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled]: (state, { payload }) => {
      state.user = payload.email;
      state.isLoggedIn = true;
      state.isRefreshingUser = false;
    },
    [authOperations.fetchCurrentUser.rejected]: (state) => {
      state.isRefreshingUser = false;
    },
  },
});

export default authSlice.reducer;
