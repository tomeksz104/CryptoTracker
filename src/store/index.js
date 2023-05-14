import { configureStore } from "@reduxjs/toolkit";
import cryptocurrencySlice from "./cryptocurrency-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    cryptocurrency: cryptocurrencySlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
