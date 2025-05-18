
import { apiSlice } from "../../app/api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
    reducerPath: 'cart',
    tagTypes: ['Cart'],
    endpoints: builder => ({
      
            getCartProducts: builder.mutation({
            query: ({cart,user_id}) => {
                return {
                    url: 'cart/update',
                    method: 'POST',
                    body: { products: cart , user_id}
                };
            },
            invalidatesTags: ['Cart']
        }),

    })
})

export const {
    useGetCartProductsMutation,
} = cartApi