import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisabled: true,
  search: "",
  selectedItems: [],
  status: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
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

export const { addSearch, addStatus, addSelectedItems, resetFilter } =
  filterSlice.actions;

export const getSearch = (state) => state.filter.search;
export const getSelectedItems = (state) => state.filter.selectedItems;
export const getStatus = (state) => state.filter.status;

export default filterSlice.reducer;
