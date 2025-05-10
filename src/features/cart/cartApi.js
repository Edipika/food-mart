

import { apiSlice } from "../../app/api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
    reducerPath: 'cart',
    tagTypes: ['Cart'],
    endpoints: builder => ({
      
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
})

export const {
    useGetCartProductsMutation,
} = cartApi