import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../../../firebase";
import {
  addDoc,
  getDocs,
  collection,
  doc,
  orderBy,
  updateDoc,
  deleteDoc,
  query,
} from "firebase/firestore";

const initialState = {
  chartData: [],
  status: "idle",
  error: null,
};

export const fetchChart = createAsyncThunk("dashboard/fetchChart", async () => {
  const dashboard = collection(db, "dashboard");
  const querySnapshot = await getDocs(
    query(dashboard, orderBy("timestamp", "asc"))
  );
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
    const currentProfits = data.profit;
    console.log(currentProfits);
    return await updateDoc(doc(db, "dashboard", id), {
      profit: currentProfits,
    });
  }
);

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
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

export const { updateChartStatus } = chartSlice.actions;

export const getChartStatus = (state) => state.chart.status;
export const getChart = (state) => state.chart.chartData;

export default chartSlice.reducer;
