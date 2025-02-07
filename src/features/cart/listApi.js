import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listApi = createApi({
    reducerPath: 'list',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['List'],
    endpoints: (builder) => ({

        // Fetch all lists
        fetchLists: builder.mutation({
            query: (cart) => ({
                url: 'cart/update',
                method: 'POST',
                body: { products: cart }
            }),
            // invalidatesTags: [{ type: 'List' }],
        }),
    })
});

export const {
    useFetchListsMutation
} = listApi;