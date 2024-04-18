import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
  filteredId: "",
  listingDate: "",
  listingPlatform: "",
  listingPrice: "",
};

export const addListingToFirestore = createAsyncThunk(
  "inventory/addListingToFirestore",
  async (listing) => {
    const id = listing.filteredId;
    return await updateDoc(doc(db, "inventory", id), {
      listingDate: listing.listingDate,
      listingPlatform: listing.listingPlatform,
      listingPrice: listing.listingPrice,
    });
  }
);

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    addListingFilteredId: (state, action) => {
      state.filteredId = action.payload;
    },
    addListingDate: (state, action) => {
      state.listingDate = action.payload;
    },
    addListingPlatform: (state, action) => {
      state.listingPlatform = action.payload;
    },
    addListingPrice: (state, action) => {
      state.listingPrice = action.payload;
    },
  },
});

export const {
  addListingFilteredId,
  addListingDate,
  addListingPlatform,
  addListingPrice,
} = listingSlice.actions;

export const getListing = (state) => state.listing;

export default listingSlice.reducer;
