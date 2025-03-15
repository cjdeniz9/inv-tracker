import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customItemForm: false,
  createItem: false,
  createInventory: true,
  modalCreate: false,
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
    toggleModalCreate: (state, action) => {
      state.modalCreate = action.payload;
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
  toggleModalCreate,
  toggleNoResults,
  toggleProduct,
  toggleCreateInventory,
  toggleProductDetails,
  toggleSearchList,
} = showSlice.actions;

export const getCustomItemForm = (state) => state.show.customItemForm;
export const getCreate = (state) => state.show.createItem;
export const getCreateInventory = (state) => state.show.createInventory;
export const getModalCreate = (state) => state.show.modalCreate;
export const getNoResults = (state) => state.show.noResults;
export const getProductDetails = (state) => state.show.productDetails;
export const getProductForm = (state) => state.show.productForm;
export const getSearchList = (state) => state.show.searchList;

export default showSlice.reducer;
