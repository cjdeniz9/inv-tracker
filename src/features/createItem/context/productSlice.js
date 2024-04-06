import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  color: "",
  condition: "",
  name: "",
  notes: "",
  orderNum: "",
  placeOfPurchase: "",
  price: "",
  purchasedDate: "",
  shippingPrice: "",
  sku: "",
  tax: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addBrand: (state, action) => {
      state.brand = action.payload;
    },
    addColor: (state, action) => {
      state.color = action.payload;
    },
    addCondition: (state, action) => {
      state.condition = action.payload;
    },
    addName: (state, action) => {
      state.name = action.payload;
    },
    addNotes: (state, action) => {
      state.notes = action.payload;
    },
    addOrderNum: (state, action) => {
      state.orderNum = action.payload;
    },
    addPlaceOfPurchase: (state, action) => {
      state.placeOfPurchase = action.payload;
    },
    addPrice: (state, action) => {
      state.price = action.payload;
    },
    addPurchasedDate: (state, action) => {
      state.purchasedDate = action.payload;
    },
    addShippingPrice: (state, action) => {
      state.shippingPrice = action.payload;
    },
    addSku: (state, action) => {
      state.sku = action.payload;
    },
    addTax: (state, action) => {
      state.tax = action.payload;
    },
    deleteProduct: () => initialState,
  },
});

export const {
  addBrand,
  addColor,
  addCondition,
  addName,
  addNotes,
  addOrderNum,
  addPlaceOfPurchase,
  addPrice,
  addPurchasedDate,
  addShippingPrice,
  addSku,
  addTax,
  deleteProduct,
} = productSlice.actions;

export const getProduct = (state) => state.product;

export default productSlice.reducer;
