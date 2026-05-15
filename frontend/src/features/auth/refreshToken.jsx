import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://www.foodmart-api.dipikaepili.in',
    credentials: 'include', // Ensures cookies are sent
});

const refreshTokenQuery = async (api) => {
    try {
        const refreshResult = await baseQuery('/refresh', api, {});
        // console.log("refreshResult:", refreshResult);

        if (refreshResult?.data) {
            // Update credentials in the Redux store
            const user = api.getState().auth.user;
            // console.log("user",user);
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // console.log("refresh token set");
            return refreshResult.data; // Return refreshed token data
        } else {
            // console.error("Failed to refresh token. Logging out...");
            api.dispatch(logOut());
            return null;
        }
    } catch (error) {
        // console.error("Error hitting refresh endpoint:", error);
        api.dispatch(logOut());
        return null;
    }
};

export default refreshTokenQuery;
