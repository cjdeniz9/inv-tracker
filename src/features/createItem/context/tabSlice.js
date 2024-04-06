import { createSlice } from "@reduxjs/toolkit";

const initialState = "1";

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    tabValue: (state, action) => action.payload,
    resetTabValue: () => initialState,
  },
});

export const { tabValue, resetTabValue } = tabSlice.actions;

export const getTabValue = (state) => state.tab;

export default tabSlice.reducer;
