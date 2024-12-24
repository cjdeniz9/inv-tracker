import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetailsTabs: 0,
  sizeChartTabs: 0,
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setSizeChartTabIndex: (state, action) => {
      state.sizeChartTabs = action.payload;
    },
    setProductDetailsTabIndex: (state, action) => {
      state.productDetailsTabs = action.payload;
    },
    resetTabIndex: () => initialState,
  },
});

export const {
  setSizeChartTabIndex,
  setProductDetailsTabIndex,
  resetTabIndex,
} = tabSlice.actions;

export const getProductDetailsTabIndex = (state) =>
  state.tab.productDetailsTabs;
export const getSizeChartTabIndex = (state) => state.tab.sizeChartTabs;

export default tabSlice.reducer;
