import {configureStore} from '@reduxjs/toolkit';
import userReducer  from '../slice/authSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,  // This key ('user') will be the name of the slice in the state
      },
})