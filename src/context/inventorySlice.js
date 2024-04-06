import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../firebase";
import { addDoc, getDocs, collection, orderBy } from "firebase/firestore";

const initialState = {
  inventoryArray: [],
  status: "idle",
  error: null,
};

export const addItemToFirestore = createAsyncThunk(
  "inventory/addItemToFirestore",
  async (item) => {
    const addItemRef = await addDoc(collection(db, "inventory"), item);
    const newItem = { id: addItemRef.id, item };
    return newItem;
  }
);

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const querySnapshot = await getDocs(
      collection(db, "inventory"),
      orderBy("timestamp", "asc")
    );
    const inventory = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      item: doc.data(),
    }));
    return inventory;
  }
);

export const inventorySlice = createSlice({
  name: "Inventory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inventoryArray = action.payload;
      })
      .addCase(addItemToFirestore.fulfilled, (state, action) => {
        state.inventoryArray.push(action.payload);
      })
      .addCase(fetchInventory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getInventoryStatus = (state) => state.inventory.status;
export const getInventoryError = (state) => state.inventory.error;

export const getInventory = (state) => state.inventory.inventoryArray;

export const selectItemId = (state, itemId) =>
  state.item.find((item) => item.id === itemId);

export const { activeItem } = inventorySlice.actions;

export default inventorySlice.reducer;
