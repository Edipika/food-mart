import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: loadCartFromLocalStorage() },
    reducers: {
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const existingProduct = state.items.find((item) => item.productId === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.items.push({ productId, quantity });
            }
            saveCartToLocalStorage(state.items);
        },
        removeFromCart(state, action) {

        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;