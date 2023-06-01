import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { BASE_URL } from 'constants';

axios.defaults.baseURL = BASE_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('auth/register', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      toast.warning(error.response.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return thunkAPI.rejectWithValue();
    }
  }
);

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('auth/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    toast.warning(error.response.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return thunkAPI.rejectWithValue();
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.get('auth/logout');
    token.unset();
  } catch (error) {
    toast.warning(error.response.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return thunkAPI.rejectWithValue();
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const savedToken = state.auth.token;

    if (savedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(savedToken);

    try {
      const { data } = await axios.get('auth/current');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const operations = {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
};

export default operations;
