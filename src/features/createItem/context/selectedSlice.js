import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedArray: [],
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    addSelected: (state, action) => action.payload,
    deleteSelected: () => initialState,
  },
});

export const getSelected = (state) => state.selected;

export const { addSelected, deleteSelected } = selectedSlice.actions;

export default selectedSlice.reducer;
