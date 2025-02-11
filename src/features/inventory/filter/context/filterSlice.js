import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
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
    resetFilter: () => initialState,
  },
});

export const { addSearch, addStatus, resetFilter } = filterSlice.actions;

export const getSearch = (state) => state.filter.search;
export const getStatus = (state) => state.filter.status;

export default filterSlice.reducer;
