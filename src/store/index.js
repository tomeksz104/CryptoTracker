import { configureStore } from "@reduxjs/toolkit";

import currencySlice from "./currency-slice";

const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
  },
});

export default store;
