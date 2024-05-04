import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customItemForm: false,
  createItem: false,
  createInventory: true,
  noResults: false,
  productDetails: false,
  productForm: false,
  searchList: true,
};

export const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    toggleCustomItemForm: (state) => {
      state.customItemForm = !state.customItemForm;
    },
    toggleCreate: (state) => {
      state.createItem = !state.createItem;
    },
    toggleCreateInventory: (state) => {
      state.createInventory = !state.createInventory;
    },
    toggleNoResults: (state, action) => {
      state.noResults = action.payload;
    },
    toggleProductDetails: (state) => {
      state.productDetails = !state.productDetails;
    },
    toggleProduct: (state) => {
      state.productForm = !state.productForm;
    },
    toggleSearchList: (state, action) => {
      state.searchList = action.payload;
    },
    resetShow: () => initialState,
  },
});

export const {
  resetShow,
  toggleCustomItemForm,
  toggleCreate,
  toggleNoResults,
  toggleProduct,
  toggleCreateInventory,
  toggleProductDetails,
  toggleSearchList,
} = showSlice.actions;

export const getCustomItemForm = (state) => state.show.customItemForm;
export const getCreate = (state) => state.show.createItem;
export const getCreateInventory = (state) => state.show.createInventory;
export const getNoResults = (state) => state.show.noResults;
export const getProductDetails = (state) => state.show.productDetails;
export const getProductForm = (state) => state.show.productForm;
export const getSearchList = (state) => state.show.searchList;

export default showSlice.reducer;
