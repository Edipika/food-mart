import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        isEditing: false,
        selectedCategory: null,
    },
    reducers: {
        startEditing(state, action) {
            state.isEditing = true;
            state.selectedCategory = action.payload;
        },
        stopEditing(state) {
            state.isEditing = false;
            state.selectedCategory = null;
        },
    },
});
export const { startEditing, stopEditing } = categorySlice.actions;
export default categorySlice.reducer;
