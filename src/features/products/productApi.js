import { apiSlice } from "../../app/api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    reducerPath: 'product',
    tagTypes: ['product'],

    endpoints:builder=>({
   
        getProducts: builder.query({
            query: () => 'products/show',
            providedTags: ['product']
        }),//to show products in admin panel

        addProduct: builder.mutation({
            query: (product) => ({
                url: 'products/add',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['product']
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: 'products/edit',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['product']
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `products/delete/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product']
        }),

        getProduct: builder.query({
            query: (productId) => ({
                url:   `products/getProduct/${productId}`,
                method: 'GET',
            }),
            providedTags: ['product']
        }),//to get a single product in product details page

        getProductsByCategory: builder.query({
            query: (productId) => ({
                url:   `/products/getByCategory/${productId}`,
                method: 'GET',
            }),
            providedTags: ['product']
        }),

    })
})


export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductsByCategoryQuery
} = productApi



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const productApi = createApi({
//     reducerPath: 'product',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
//     tagTypes: ['product'],
//     endpoints: (builder) => ({

//         getProducts: builder.query({
//             query: () => 'products/show',
//             providedTags: ['product']
//         }),//to show products in admin panel

//         addProduct: builder.mutation({
//             query: (product) => ({
//                 url: 'products/add',
//                 method: 'POST',
//                 body: product
//             }),
//             invalidatesTags: ['product']
//         }),

//         updateProduct: builder.mutation({
//             query: (product) => ({
//                 url: 'products/edit',
//                 method: 'POST',
//                 body: product
//             }),
//             invalidatesTags: ['product']
//         }),

//         deleteProduct: builder.mutation({
//             query: (productId) => ({
//                 url: `products/delete/${productId}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['product']
//         }),

//         getProduct: builder.query({
//             query: (productId) => ({
//                 url:   `products/getProduct/${productId}`,
//                 method: 'GET',
//             }),
//             providedTags: ['product']
//         }),//to get a single product in product details page

//         getProductsByCategory: builder.query({
//             query: (productId) => ({
//                 url:   `/products/getByCategory/${productId}`,
//                 method: 'GET',
//             }),
//             providedTags: ['product']
//         }),

//     })
// });