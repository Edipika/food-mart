import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    name: '',
  };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
