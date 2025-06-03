import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};
const initialState = {
    products: loadCartFromLocalStorage() || []
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        saveTocart(state, action) {
            const { productId, quantity } = action.payload;
            const existingProduct = state.products.find((product) => product.productId === productId);
            if (existingProduct) {
                existingProduct.quantity = quantity;
            } else {
                state.products.push({ productId, quantity });
            }
            // state.totalQuantity = state.products.reduce((sum, product) => sum + product.quantity, 0);
            saveCartToLocalStorage(state.products);
        },
        clearCart(state) {
            state.products = [];
            localStorage.removeItem('cart');
        }
    }
});

export const { saveTocart,clearCart } = cartSlice.actions;
// export const selectCartProducts = (state) => state.cart.products;
export default cartSlice.reducer;