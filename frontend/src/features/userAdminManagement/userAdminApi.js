
import { apiSlice } from "../../app/api/apiSlice";

export const userAdminApi = apiSlice.injectEndpoints({
    reducerPath: 'userAdmin',
    tagTypes: ['UserAdmin'],

    endpoints: builder => ({
    
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
    })
})


export const {
    useGetUserQuery,
    useGetAdminQuery,
    useAddAdminMutation,
    useDeleteAdminMutation,
} = userAdminApi;