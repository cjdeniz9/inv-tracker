import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackingNum: "",
  shippingInfo: {},
};

export const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    addTrackingNum: (state, action) => {
      state.trackingNum = action.payload;
    },
  },
});

export const { addTrackingNum } = shipmentSlice.actions;

export const getTrackingNum = (state) => state.shipment.trackingNum;

export default shipmentSlice.reducer;
