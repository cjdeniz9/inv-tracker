import { configureStore } from "@reduxjs/toolkit";

import chartReducer from "../features/dashboard/context/chartSlice";
import dashboardReducer from "../features/dashboard/context/dashboardSlice";
import errorReducer from "./errorSlice";
import filterReducer from "../features/inventory/filters/context/filterSlice";
import filteredItemReducer from "./filteredItemSlice";
import inventoryReducer from "./inventorySlice";
import keywordReducer from "./keywordSlice";
import listingReducer from "../features/listings/context/listingSlice";
import productReducer from "../features/inventory/createItem/context/productSlice";
import resultsReducer from "../features/inventory/createItem/context/resultsSlice";
import saleReducer from "../features/listings/context/saleSlice";
import selectedReducer from "../features/inventory/createItem/context/selectedSlice";
import shipmentReducer from "./shipmentSlice";
import sizeReducer from "./sizeSlice";
import showReducer from "../features/inventory/createItem/context/showSlice";
import tabReducer from "../features/inventory/createItem/context/tabSlice";
import tableReducer from "../features/inventory/table/context/tableSlice";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    dashboard: dashboardReducer,
    error: errorReducer,
    filter: filterReducer,
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
    table: tableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
