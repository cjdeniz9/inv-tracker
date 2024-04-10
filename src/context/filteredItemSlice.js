import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const filteredItemSlice = createSlice({
  name: "fitleredItem",
  initialState,
  reducers: {
    setFilteredItem: (state, action) => {
      state.filteredItem = action.payload;
    },
    editBrand: (state, action) => {
      state.filteredItem[0].item.brand = action.payload;
    },
    editColor: (state, action) => {
      state.filteredItem[0].item.color = action.payload;
    },
    editCondition: (state, action) => {
      state.filteredItem[0].item.condition = action.payload;
    },
    editName: (state, action) => {
      state.filteredItem[0].item.name = action.payload;
    },
    editNotes: (state, action) => {
      state.filteredItem[0].item.notes = action.payload;
    },
    editOrderNum: (state, action) => {
      state.filteredItem[0].item.orderNum = action.payload;
    },
    editPlaceOfPurchase: (state, action) => {
      state.filteredItem[0].item.placeOfPurchase = action.payload;
    },
    editPrice: (state, action) => {
      state.filteredItem[0].item.price = action.payload;
    },
    editPurchasedDate: (state, action) => {
      state.filteredItem[0].item.purchasedDate = action.payload;
    },
    editShippingPrice: (state, action) => {
      state.filteredItem[0].item.shippingPrice = action.payload;
    },
    editSize: (state, action) => {
      state.filteredItem[0].item.size = action.payload;
    },
    editSku: (state, action) => {
      state.filteredItem[0].item.sku = action.payload;
    },
    editTax: (state, action) => {
      state.filteredItem[0].item.tax = action.payload;
    },
    deleteFilteredItem: () => initialState,
  },
});

export const getFilteredId = (state) => state.filteredItem.filteredItem[0].id;
export const getFilteredItem = (state) =>
  state.filteredItem.filteredItem[0].item;
export const getFilteredData = (state) => state.filteredItem.filteredItem[0];

export const {
  editBrand,
  editColor,
  editCondition,
  editName,
  editNotes,
  editOrderNum,
  editPlaceOfPurchase,
  editPrice,
  editPurchasedDate,
  editShippingPrice,
  editSize,
  editSku,
  editTax,
  deleteFilteredItem,
  setFilteredItem,
} = filteredItemSlice.actions;

export default filteredItemSlice.reducer;
