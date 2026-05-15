import { apiSlice } from "../../app/api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  reducerPath: "product",
  tagTypes: ["product"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products/show",
      providedTags: ["product"],
    }), //to show products in admin panel

    //for search
    getSearchProducts: builder.query({
      query: (searchTerm = "") =>
        `api/search?query=${encodeURIComponent(searchTerm)}`,
      providesTags: ["product"],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: "products/add",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: "products/edit",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `products/delete/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    getProduct: builder.query({
      query: (productId) => ({
        url: `products/getProduct/${productId}`,
        method: "GET",
      }),
      providedTags: ["product"],
    }), //to get a single product in product details page

    getProductsByCategory: builder.query({
      query: (productId) => ({
        url: `/products/getByCategory/${productId}`,
        method: "GET",
      }),
      providedTags: ["product"],
    }),
  }),
});

export const {
  useGetProductsQuery, //getProducts
  useGetProductQuery,
  useGetSearchProductsQuery, //getSearchProducts
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByCategoryQuery,
} = productApi;
