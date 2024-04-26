import { configureStore } from "@reduxjs/toolkit";

import errorReducer from "./errorSlice";
import filteredItemReducer from "./filteredItemSlice";
import inventoryReducer from "./inventorySlice";
import keywordReducer from "./keywordSlice";
import listingReducer from "../features/listings/context/listingSlice";
import productReducer from "../features/createItem/context/productSlice";
import resultsReducer from "../features/createItem/context/resultsSlice";
import saleReducer from "../features/listings/context/saleSlice";
import selectedReducer from "../features/createItem/context/selectedSlice";
import shipmentReducer from "./shipmentSlice";
import sizeReducer from "./sizeSlice";
import showReducer from "../features/createItem/context/showSlice";
import tabReducer from "../features/createItem/context/tabSlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    filteredItem: filteredItemReducer,
    inventory: inventoryReducer,
    keyword: keywordReducer,
    listing: listingReducer,
    product: productReducer,
    results: resultsReducer,
    sale: saleReducer,
    selected: selectedReducer,
    shipment: shipmentReducer,
    size: sizeReducer,
    show: showReducer,
    tab: tabReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
