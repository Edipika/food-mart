import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        isEditing: false,
        selectedCategory: null,
    },
    reducers: {
        startEditing(state, action) {       
            state.isEditing = true;
            state.selectedCategory = action.payload;
            console.log('Payload received in startEditing:', action.payload);
            console.log('selectedCategory:', state.selectedCategory);
        },
        stopEditing(state) {
            state.isEditing = false;
            state.selectedCategory = null;
        },
    },
});
export const { startEditing, stopEditing } = categorySlice.actions;
export default categorySlice.reducer;
