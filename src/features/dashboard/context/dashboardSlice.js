import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsPurchased: 0,
  netProfit: 0,
  salesCount: 0,
  salesIncome: 0,
  totalSpend: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setItemsPurchased: (state, action) => {
      state.itemsPurchased = action.payload;
    },
    setNetProfit: (state, action) => {
      state.netProfit = action.payload;
    },
    setSalesCount: (state, action) => {
      state.saleCount = action.payload;
    },
    setSalesIncome: (state, action) => {
      state.saleIncome = action.payload;
    },
    setTotalSpend: (state, action) => {
      state.totalSpend = action.payload;
    },
  },
});

export const {
  setItemsPurchased,
  setNetProfit,
  setSalesCount,
  setSalesIncome,
  setTotalSpend,
} = dashboardSlice.actions;

export const getItemsPurchased = (state) => state.dashboard.itemsPurchased;
export const getNetProfit = (state) => state.dashboard.netProfit;
export const getSalesCount = (state) => state.dashboard.salesCount;
export const getTotalSpend = (state) => state.dashboard.totalSpend;

export default dashboardSlice.reducer;
