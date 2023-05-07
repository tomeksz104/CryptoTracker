import { configureStore } from "@reduxjs/toolkit";
import cryptocurrencySlice from "./cryptocurrency-slice";

const store = configureStore({
  reducer: {
    cryptocurrency: cryptocurrencySlice.reducer,
  },
});

export default store;
