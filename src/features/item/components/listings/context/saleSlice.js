import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
  filteredId: "",
  saleDate: "",
  salePlatform: "",
  salePlatformFees: "",
  salePrice: "",
  saleShipping: "",
};

export const addSaleToFirestore = createAsyncThunk(
  "inventory/addSaleToFirestore",
  async (sale) => {
    const id = sale.filteredId;
    return await updateDoc(doc(db, "inventory", id), {
      saleDate: sale.saleDate,
      salePlatform: sale.salePlatform,
      salePlatformFees: sale.salePlatformFees,
      salePrice: sale.salePrice,
      saleShipping: sale.saleShipping,
      status: "Sold",
    });
  }
);

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    addSaleFilteredId: (state, action) => {
      state.filteredId = action.payload;
    },
    addSaleDate: (state, action) => {
      state.saleDate = action.payload;
    },
    addSalePlatform: (state, action) => {
      state.salePlatform = action.payload;
    },
    addSalePlatformFees: (state, action) => {
      state.salePlatformFees = action.payload;
    },
    addSalePrice: (state, action) => {
      state.salePrice = action.payload;
    },
    addSaleShipping: (state, action) => {
      state.saleShipping = action.payload;
    },
    clearSale: () => initialState,
  },
});

export const {
  addSaleFilteredId,
  addSaleDate,
  addSalePlatform,
  addSalePlatformFees,
  addSalePrice,
  addSaleShipping,
  clearSale,
} = saleSlice.actions;

export const getSale = (state) => state.sale;

export default saleSlice.reducer;
