import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAdminApi = createApi({
    reducerPath: 'userAdmin',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['UserAdmin'],
    endpoints: (builder) => ({

        getUser: builder.query({
            query: () => '/users',
            providedTags: ['UserAdmin']
        }),
        getAdmin: builder.query({
            query: () => '/admins',
            providedTags: ['UserAdmin']
        }),
        addAdmin: builder.mutation({
            query: (admin) => ({
                url: '/register',
                method: 'POST',
                body: admin
            }),
            invalidatesTags: ['UserAdmin']
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['UserAdmin']
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetAdminQuery,
    useAddAdminMutation,
    useDeleteAdminMutation,
} = userAdminApi;