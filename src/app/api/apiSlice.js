import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        console.log("Token from state:",token);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQuerywithReauth = async (args, api, extraOptions) => {
    console.log("sending login request")
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log("sending refresh token ")

        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log("refreshResult".refreshResult)

        if (refreshResult?.data) {
            const user = api.getState().auth.user

            api.dispatch(setCredentials({ ...refreshResult.data, user }))

            result = await baseQuery(args, api, extraOptions)

        } else {
            api.dispatch(logOut())
        }
    }
    return result;
}


export const apiSlice = createApi({
    baseQuery: baseQuerywithReauth,
    endpoints: (builder) => ({})
})
