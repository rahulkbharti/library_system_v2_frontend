
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login_data: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.login_data = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.login_data = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

