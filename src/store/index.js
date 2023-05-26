import { configureStore } from "@reduxjs/toolkit";
import cryptocurrencySlice from "./cryptocurrency-slice";
import uiSlice from "./ui-slice";
import { cryptoApi } from "./services/cryptoApi";

const store = configureStore({
  reducer: {
    cryptocurrency: cryptocurrencySlice.reducer,
    ui: uiSlice.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

export default store;
