import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { name: null, role: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { name, role, accessToken, email, user_id } = action.payload;
            state.name = name;
            state.role = role;
            state.token = accessToken;
            state.email = email;
            state.user_id = user_id;
        },
        logOut: (state) => {
            state.name = null;
            state.role = null;
            state.token = null;
            state.email = null;
            state.user_id = null;
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer

export const selectCurrentUserName = (state) => state.auth.name
export const selectCurrentUserRole = (state) => state.auth.role
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUserEmail = (state) => state.auth.email;
export const selectCurrentUserId = (state) => state.auth.user_id;