import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nameError: false,
  payoutError: false,
  sizeError: false,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    nameError: (state, action) => {
      state.nameError = action.payload;
    },
    payoutError: (state, action) => {
      state.payoutError = action.payload;
    },
    sizeError: (state, action) => {
      state.sizeError = action.payload;
    },
    resetError: () => initialState,
  },
});

export const { nameError, payoutError, sizeError, resetError } =
  errorSlice.actions;

export const getNameError = (state) => state.error.nameError;
export const getPayoutError = (state) => state.error.payoutError;
export const getSizeError = (state) => state.error.sizeError;

export default errorSlice.reducer;
