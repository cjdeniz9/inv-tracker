import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisabled: true,
  selectedItems: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    clearCheckboxes: () => initialState,
  },
});

export const { addSelectedItems, clearCheckboxes } = filterSlice.actions;

export const getSelectedItems = (state) => state.filter.selectedItems;

export default filterSlice.reducer;
