import { apiSlice } from "../../app/api/apiSlice";

export const checkoutApi = apiSlice.injectEndpoints({
  reducerPath: "checkout",
  tagTypes: ["checkout"],

  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (checkoutForm) => ({
        url: "checkout",
        method: "POST",
        body: checkoutForm,
      }),
      invalidatesTags: ["checkout"],
    }),

    getOrders: builder.query({
      query: (userId) => `/orders?userId=${userId}`,
      providedTags: ["checkout"],
    }),
    
  }),
});

// export const { usecheckoutMutation } = checkoutApi;
export const { useCheckoutMutation, useGetOrdersQuery } = checkoutApi;
