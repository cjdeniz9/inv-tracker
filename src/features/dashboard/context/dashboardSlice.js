import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  netProfit: 0,
  salesCount: 0,
  totalSpend: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addNetProfit: (state, action) => {
      state.netProfit = action.payload;
    },
    addSalesCount: (state, action) => {
      state.salesCount = action.payload;
    },
    addTotalSpend: (state, action) => {
      state.totalSpend = action.payload;
    },
  },
});

export const { addNetProfit, addSalesCount, addTotalSpend } =
  dashboardSlice.actions;

export const getNetProfit = (state) => state.dashboard.netProfit;
export const getSalesCount = (state) => state.dashboard.salesCount;
export const getTotalSpend = (state) => state.dashboard.totalSpend;

export default dashboardSlice.reducer;
