import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    name: '',
  };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload;
    },
    removeUser: (state) => {
      state.isLoggedIn = false;
      state.name = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
