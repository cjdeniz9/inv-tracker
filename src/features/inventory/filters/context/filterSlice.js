import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisabled: true,
  pathname: "",
  search: "",
  selectedItems: [],
  status: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addPathname: (state, action) => {
      state.pathname = action.payload;
    },
    addSearch: (state, action) => {
      state.search = action.payload;
    },
    addStatus: (state, action) => {
      state.status = action.payload;
    },
    addSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const {
  addPathname,
  addSearch,
  addStatus,
  addSelectedItems,
  resetFilter,
} = filterSlice.actions;

export const getPathname = (state) => state.filter.pathname;
export const getSearch = (state) => state.filter.search;
export const getSelectedItems = (state) => state.filter.selectedItems;
export const getStatus = (state) => state.filter.status;

export default filterSlice.reducer;
