import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import { categoryApi } from "../features/category/categoryApi";
import { productApi } from "../features/products/productApi";
import { userAdminApi } from "../features/userAdminManagement/userAdminApi";
import editReducer from "../features/editSlice";
import cartReducer from '../features/cart/cartSlice' ;
import {cartApi} from "../features/cart/cartApi";

// console.log("cartApi:", cartApi);
export const store = configureStore({
    reducer: {

        [apiSlice.reducerPath]: apiSlice.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userAdminApi.reducerPath]: userAdminApi.reducer,
        auth: authReducer,
        editSlice: editReducer,
        cartSlice:cartReducer,
        [cartApi.reducerPath]: cartApi.reducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            categoryApi.middleware,
            productApi.middleware,           
            userAdminApi.middleware,  
            cartApi.middleware
        ),
    devTools: true
})