import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../../../../../firebase";
import { deleteField, doc, updateDoc } from "firebase/firestore";

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
      status: "Listed",
    });
  }
);

export const updateListingToFirestore = createAsyncThunk(
  "inventory/updateListingToFirestore",
  async (listing) => {
    const id = listing.id;
    const item = listing.item;
    console.log(id);
    return await updateDoc(doc(db, "inventory", id), {
      name: item.name,
      listingDate: item.listingDate,
      listingPlatform: item.listingPlatform,
      listingPrice: item.listingPrice,
      status: "Listed",
    });
  }
);

export const deleteListingToFirestore = createAsyncThunk(
  "inventory/deleteListingToFirestore",
  async (id) => {
    return await updateDoc(doc(db, "inventory", id), {
      listingDate: deleteField(),
      listingPlatform: deleteField(),
      listingPrice: deleteField(),
      status: "Unlisted",
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
    clearListing: () => initialState,
  },
});

export const {
  addListingFilteredId,
  addListingDate,
  addListingPlatform,
  addListingPrice,
  clearListing,
} = listingSlice.actions;

export const getListing = (state) => state.listing;

export default listingSlice.reducer;
