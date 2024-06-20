import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showToast } from '../../pages/Toast';
import { SignJWT } from 'jose';
import { removeToken, setToken } from '../../utils/auth';
import axiosInstance from '../../utils/axiosInstance';

const api = process.env.REACT_APP_API_URL;

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // const response = await axios.get(`${api}/registration`);
      const response = await axiosInstance.get('/registration');
      const users = response.data;
      const userExists = users.find((user) => user.email === userData.email);
      if (userExists) {
        return rejectWithValue(showToast('error', 'User already exists'));
      }
      await axios.post(`${api}/registration`, userData);
      showToast('success', 'Registration Successful');
      return userData;
    } catch (error) {
      return rejectWithValue(showToast('error', error.message));
    }
  }
);

const secretKey = new TextEncoder().encode(process.env.REACT_APP_SECRET_KEY);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      // const response = await ax.get(`${api}/registration`);
      const response = await axiosInstance.get('/registration');
      const users = response.data;
      const user = users.find(
        (user) => user.email === loginData.email && user.password === loginData.password
      );

      if (!user) {
        return rejectWithValue(showToast('error', 'Invalid email or password'));
      }
      showToast('success', 'Login Successful');
      const accessToken = await new SignJWT({ email: loginData.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('10m')
        .sign(secretKey);

      setToken(accessToken);

      return user;
    } catch (error) {
      return rejectWithValue(showToast('error', error.message));
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const selectUser = (state) => state.user.user;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.loading = false;
      state.user = null;
      state.error = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
