import { configureStore } from "@reduxjs/toolkit";

import errorReducer from "./errorSlice";
import inventoryReducer from "./inventorySlice";
import keywordReducer from "./keywordSlice";
import productReducer from "../features/createItem/context/productSlice";
import resultsReducer from "../features/createItem/context/resultsSlice";
import selectedReducer from "../features/createItem/context/selectedSlice";
import sizeReducer from "./sizeSlice";
import showReducer from "../features/createItem/context/showSlice";
import tabReducer from "../features/createItem/context/tabSlice";

export const store = configureStore({
  reducer: {
    error: errorReducer,
    inventory: inventoryReducer,
    keyword: keywordReducer,
    product: productReducer,
    results: resultsReducer,
    selected: selectedReducer,
    size: sizeReducer,
    show: showReducer,
    tab: tabReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
