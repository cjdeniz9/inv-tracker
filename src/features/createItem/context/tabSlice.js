import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTabIndex: (state, action) => action.payload,
    resetTabIndex: () => initialState,
  },
});

export const { setTabIndex, resetTabIndex } = tabSlice.actions;

export const getTabIndex = (state) => state.tab;

export default tabSlice.reducer;
