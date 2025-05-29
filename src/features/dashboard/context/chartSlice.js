import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../../../firebase";
import {
  getDocs,
  collection,
  doc,
  orderBy,
  updateDoc,
  query,
  deleteDoc,
} from "firebase/firestore";

const initialState = {
  chartData: [],
  dateFilter: "",
  filteredChartData: [],
  status: "idle",
  error: null,
};

export const fetchChart = createAsyncThunk("dashboard/fetchChart", async () => {
  const dashboard = collection(db, "dashboard");
  const querySnapshot = await getDocs(query(dashboard, orderBy("date", "asc")));
  const chart = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    item: doc.data(),
  }));
  return chart;
});

export const updateChartInFirestore = createAsyncThunk(
  "dashboard/updateChartInFirestore",
  async (data) => {
    const id = data.id;
    const newTotal = data.updatedAmount;
    return await updateDoc(doc(db, "dashboard", id), {
      profit: newTotal,
    });
  }
);

export const deleteItemFromFirestore = createAsyncThunk(
  "dashboard/deleteItemFromFirestore",
  async (id) => {
    return await deleteDoc(doc(db, "dashboard", id));
  }
);

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    addFilteredChartData: (state, action) => {
      state.filteredChartData = action.payload;
    },
    updateChartStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chartData = action.payload;
      })
      //   .addCase(addItemToFirestore.fulfilled, (state, action) => {
      //     state.inventoryArray.push(action.payload);
      //   })
      .addCase(fetchChart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchChart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addDateFilter, addFilteredChartData, updateChartStatus } =
  chartSlice.actions;

export const getChartStatus = (state) => state.chart.status;
export const getChartError = (state) => state.chart.error;

export const getChart = (state) => state.chart.chartData;
export const getDateFilter = (state) => state.chart.dateFilter;
export const getFilteredChart = (state) => state.chart.filteredChartData;

export default chartSlice.reducer;
