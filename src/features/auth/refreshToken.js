import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include', // Ensures cookies are sent
});

const refreshTokenQuery = async (api) => {
    try {
        const refreshResult = await baseQuery('/refresh', api, {});
        console.log("refreshResult:", refreshResult);

        if (refreshResult?.data) {
            // Update credentials in the Redux store
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));

            return refreshResult.data; // Return refreshed token data
        } else {
            console.error("Failed to refresh token. Logging out...");
            // api.dispatch(logOut());
            return null;
        }
    } catch (error) {
        console.error("Error hitting refresh endpoint:", error);
        return null;
    }
};

export default refreshTokenQuery;
