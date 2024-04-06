import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    addSize: (state, action) => action.payload,
    deleteSize: () => initialState,
  },
});

export const getSize = (state) => state.size;

export const { addSize, deleteSize } = sizeSlice.actions;

export default sizeSlice.reducer;
