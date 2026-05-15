import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import { categoryApi } from "../features/category/categoryApi";
import { productApi } from "../features/products/productApi";
import { userAdminApi } from "../features/userAdminManagement/userAdminApi";
import editReducer from "../features/editSlice";
import cartReducer from "../features/cart/cartSlice";
import { cartApi } from "../features/cart/cartApi";
import { checkoutApi } from "../features/checkout/checkoutApi";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage

const persistConfig = {
    key: 'auth',
    storage,
    //   whitelist: ['token', 'name', 'role'], // persist only the auth slice
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// Collect unique middleware to avoid duplicates
const middlewareSet = new Set([
    apiSlice.middleware,
    categoryApi.middleware,
    productApi.middleware,
    userAdminApi.middleware,
    cartApi.middleware,
    checkoutApi.middleware,

]);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userAdminApi.reducerPath]: userAdminApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,
        // auth: authReducer,
        auth: persistedAuthReducer,
        editSlice: editReducer,
        cartSlice: cartReducer,
        // persistToken: persistedReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(...middlewareSet),
    devTools: true,
});

export const persistor = persistStore(store);


// admin credentials 
// password :Admin123 
// email:dipikaepili85@gmail.com