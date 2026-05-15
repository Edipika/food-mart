import { apiSlice } from "../../app/api/apiSlice"

export const categoryApi = apiSlice.injectEndpoints({
    reducerPath: 'category',
    tagTypes: ['Category'],

    endpoints: builder => ({
       
        getCategory: builder.query({
            query: () => 'categories/show',
            providedTags: ['Category']
        }),

        addCategory: builder.mutation({
            query: (category) => ({
                url: 'categories/add',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),

        updateCategory: builder.mutation({
            query: (category) => ({
                url: 'categories/edit',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `categories/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),

    })
})


export const {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi