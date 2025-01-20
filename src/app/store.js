import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import { categoryApi } from "../features/category/categoryApi";
import { productApi } from "../features/products/productApi";
import editReducer from "../features/editSlice";

export const store = configureStore({
    reducer: {

        [apiSlice.reducerPath]: apiSlice.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        auth: authReducer,
        editSlice: editReducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            categoryApi.middleware,
            productApi.middleware
        ),
    devTools: true
})