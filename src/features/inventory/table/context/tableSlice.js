import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: [],
  tableCurrent: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addTableData: (state, action) => {
      state.tableData = action.payload;
    },
    addTableCurrent: (state, action) => {
      state.tableCurrent = action.payload;
    },
  },
});

export const { addTableCurrent, addTableData } = tableSlice.actions;

export const getTableData = (state) => state.table.tableData;
export const getTableCurrent = (state) => state.table.tableCurrent;

export default tableSlice.reducer;
