import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameError: false,
  sizeError: false,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    nameError: (state, action) => {
      state.nameError = action.payload;
    },
    sizeError: (state, action) => {
      state.sizeError = action.payload;
    },
    resetError: () => initialState,
  },
});

export const { nameError, sizeError, resetError } = errorSlice.actions;

export const getNameError = (state) => state.error.nameError;
export const getSizeError = (state) => state.error.sizeError;

export default errorSlice.reducer;
