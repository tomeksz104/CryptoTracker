import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    items: [],
    totalItems: 0,
    filteredCurrencies: [],
    pageNumber: 0,
    perPage: 100,
    totalPages: 0,
  },
  reducers: {
    replaceCurrencyList(state, action) {
      state.items = action.payload.items;
      state.filteredCurrencies = action.payload.items;

      state.totalItems = action.payload.items.length;

      state.totalPages = action.payload.items
        ? Math.ceil(action.payload.items.length / state.perPage)
        : 0;
    },
    changeRowsPerPage(state, action) {
      state.perPage = action.payload.perPage;

      state.totalPages = state.totalItems
        ? Math.ceil(state.totalItems / state.perPage)
        : 0;
    },
    pageChanged(state, action) {
      state.pageNumber = action.payload.page;
    },
    searchByName: (state, action) => {
      const filteredCurrencies = state.items.filter((currency) =>
        currency.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      state.pageNumber = 0;

      state.filteredCurrencies =
        action.payload.length > 0 ? filteredCurrencies : state.items;

      state.totalItems = filteredCurrencies.length;

      state.totalPages = filteredCurrencies
        ? Math.ceil(filteredCurrencies.length / state.perPage)
        : 0;
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;
