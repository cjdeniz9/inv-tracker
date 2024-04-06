import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action) => action.payload,
    deleteResults: () => initialState,
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchResults.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchResults.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.results.push(action.payload);
  //     })
  //     .addCase(fetchResults.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     });
  // },
});

export const { deleteResults, setResults } = resultsSlice.actions;

export const getResults = (state) => state.results;

export default resultsSlice.reducer;
