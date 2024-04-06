import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const keywordSlice = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    setKeyword: (state, action) => action.payload,
    deleteKeyword: () => initialState,
  },
});

export const { deleteKeyword, setKeyword } = keywordSlice.actions;

export const getKeyword = (state) => state.keyword;

export default keywordSlice.reducer;
