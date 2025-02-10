import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: 'cart',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCartProducts: builder.mutation({
            query: (cart) => {
                console.log("Sending request to cart API with:", cart); 
                return {
                    url: 'cart/update',
                    method: 'POST',
                    body: { products: cart }
                };
            },
            invalidatesTags: ['Cart']
        }),
    })
});

export const {
    useGetCartProductsMutation,
} = cartApi