import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customForm: false,
  createItem: false,
  productForm: false,
};

export const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    toggleCustom: (state) => {
      state.customForm = !state.customForm;
    },
    toggleCreate: (state) => {
      state.createItem = !state.createItem;
    },
    toggleProduct: (state) => {
      state.productForm = !state.productForm;
    },
    resetShow: () => initialState,
  },
});

export const { resetShow, toggleCustom, toggleCreate, toggleProduct } =
  showSlice.actions;

export const getCustom = (state) => state.show.customForm;
export const getCreate = (state) => state.show.createItem;
export const getProductForm = (state) => state.show.productForm;

export default showSlice.reducer;
