import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: 'editSlice',
    initialState: {
        selectedItem: null,
        successMsg: null,
    },
    reducers: {
        startEditing(state, action) {
            state.selectedItem = action.payload;
        },
        stopEditing(state) {
            state.selectedItem = null;
        },
        setSuccessMsg(state, action) {
            state.successMsg = action.payload;
        },
        nullSuccessMsg(state, action) {
            state.successMsg = null;
        }
    },
});
export const { startEditing, stopEditing, setSuccessMsg,nullSuccessMsg } = editSlice.actions;
export default editSlice.reducer;
