import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { name: null, role: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { name, role, accessToken } = action.payload;
            state.name = name;
            state.role = role;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.name = null;
            state.role = null;
            state.token = null;
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer

export const selectCurrentUserName = (state) => state.auth.name
export const selectCurrentUserRole = (state) => state.auth.role
export const selectCurrentToken = (state) => state.auth.token