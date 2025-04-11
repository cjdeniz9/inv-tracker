import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisabled: true,
  pathname: "",
  search: "",
  status: "",
};

export const filtersSlice = createSlice({
  name: "filters",
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
    clearSearch: (state) => {
      state.search = initialState.search;
    },
    resetFilter: (state) => {
      state.search = "";
      state.status = "";
    },
  },
});

export const { addPathname, addSearch, addStatus, clearSearch, resetFilter } =
  filtersSlice.actions;

export const getPathname = (state) => state.filters.pathname;
export const getSearch = (state) => state.filters.search;
export const getStatus = (state) => state.filters.status;

export default filtersSlice.reducer;
