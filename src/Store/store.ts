import { configureStore } from "@reduxjs/toolkit";
import darkmodSlice from "./darkmode/darkmodSlice";
import itemsSlice from "./items/itemsSlice";

const store = configureStore({
  reducer: {
    darkmode: darkmodSlice,
    items: itemsSlice,
  },
});

export default store;
