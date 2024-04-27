import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../firebase";
import {
  addDoc,
  getDocs,
  collection,
  doc,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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

export const updateItemInFirestore = createAsyncThunk(
  "inventory/updateItemInFirestore",
  async (data) => {
    const id = data.id;
    const item = data.item;
    return await updateDoc(doc(db, "inventory", id), {
      brand: item.brand === undefined ? "" : item.brand,
      color: item.color === undefined ? "" : item.color,
      condition: item.condition === undefined ? "" : item.condition,
      name: item.name,
      notes: item.notes === undefined ? "" : item.notes,
      orderNum: item.orderNum === undefined ? "" : item.orderNum,
      placeOfPurchase:
        item.placeOfPurchase === undefined ? "" : item.placeOfPurchase,
      price: parseFloat(item.price),
      purchasedDate: item.purchasedDate,
      shippingPrice:
        item.shippingPrice !== "" ? parseFloat(item.shippingPrice) : "",
      size: item.size === undefined ? "" : item.size,
      sku: item.sku === undefined ? "" : item.sku,
      tax: item.tax !== "" ? parseFloat(item.tax) : "",
    });
  }
);

export const deleteItemFromFirestore = createAsyncThunk(
  "inventory/deleteItemFromFirestore",
  async (id) => {
    return await deleteDoc(doc(db, "inventory", id));
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
  reducers: {
    setFilteredItem: (state, action) => {
      state.filteredItem = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
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
// export const getFilteredId = (state) => state.inventory.filteredItem[0].id;
// export const getFilteredItem = (state) => state.inventory.filteredItem[0].item;

// export const selectItemId = (state, itemId) =>
//   state.item.find((item) => item.id === itemId);

export const { setFilteredItem, updateStatus } = inventorySlice.actions;

export default inventorySlice.reducer;
