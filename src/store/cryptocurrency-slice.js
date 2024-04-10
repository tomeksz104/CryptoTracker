import { createSlice } from "@reduxjs/toolkit";

import { formatCryptocurrency } from "../utils/cryptoUtils";
import { sortData } from "../utils/sort";

const cryptocurrencySlice = createSlice({
  name: "cryptocurrency",
  initialState: {
    cryptocurrencies: [],
    filteredCryptocurrencies: [],
    totalItems: 0,
    currentPage: 0,
    perPage: 20,
    totalPages: 0,
    sortField: "",
    sortOrder: "asc",
    showWatchlist: false,
  },
  reducers: {
    replaceCurrencyList(state, action) {
      state.cryptocurrencies = action.payload.items;

      state.totalItems = action.payload.items.length;

      state.totalPages = action.payload.items
        ? Math.ceil(action.payload.items.length / state.perPage)
        : 0;
    },
    updateCurrencyList(state, action) {
      const updatedCurrencies = action.payload.items;
      const currentCurrency = action.payload.currentCurrency;
      const currentCurrencyRate = action.payload.currentCurrencyRate;

      state.cryptocurrencies = state.cryptocurrencies.map((currency) => {
        const updatedCurrency = updatedCurrencies.find(
          (updated) => updated.id === currency.id
        );

        if (updatedCurrency) {
          return formatCryptocurrency(
            updatedCurrency,
            currentCurrency,
            currentCurrencyRate
          );
        }

        return currency;
      });

      state.filteredCryptocurrencies = state.filteredCryptocurrencies.map(
        (currency) => {
          const updatedCurrency = updatedCurrencies.find(
            (updated) => updated.id === currency.id
          );

          if (updatedCurrency) {
            return formatCryptocurrency(
              updatedCurrency,
              currentCurrency,
              currentCurrencyRate
            );
          }

          return currency;
        }
      );
    },
    changeRowsPerPage(state, action) {
      state.perPage = action.payload.perPage;

      state.totalPages = state.totalItems
        ? Math.ceil(state.totalItems / state.perPage)
        : 0;
    },
    changePage(state, action) {
      state.currentPage = action.payload.page;
    },
    searchByName: (state, action) => {
      const arrayToFilter = state.showWatchlist
        ? state.filteredCryptocurrencies
        : state.cryptocurrencies;

      const filteredCurrencies = arrayToFilter.filter((currency) =>
        currency.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      state.pageNumber = 0;

      state.filteredCryptocurrencies =
        action.payload.length > 0 ? filteredCurrencies : state.cryptocurrencies;

      if (state.filteredCryptocurrencies === state.cryptocurrencies) {
        state.showWatchlist = false;
      }

      state.totalItems = filteredCurrencies.length;

      state.totalPages = filteredCurrencies
        ? Math.ceil(filteredCurrencies.length / state.perPage)
        : 0;
    },
    sortCurrencies: (state, action) => {
      const sortField = action.payload;

      let updatedSortOrder;
      if (sortField === state.sortField) {
        updatedSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        updatedSortOrder = "desc";
      }

      const sortedCurrencies = sortData(
        [...state.filteredCryptocurrencies],
        sortField,
        updatedSortOrder
      );

      return {
        ...state,
        sortField,
        sortOrder: updatedSortOrder,
        filteredCryptocurrencies: sortedCurrencies,
      };
    },
    toggleWatchlist(state, action) {
      const watchlist = action.payload;
      state.showWatchlist = !state.showWatchlist;

      state.pageNumber = 0;

      if (state.showWatchlist) {
        const filteredCurrencies = [...state.filteredCryptocurrencies].filter(
          (curr) => watchlist.includes(curr.symbol)
        );
        state.filteredCryptocurrencies = filteredCurrencies;
        state.totalItems = filteredCurrencies.length;
        state.totalPages = filteredCurrencies
          ? Math.ceil(filteredCurrencies.length / state.perPage)
          : 0;
      } else {
        state.filteredCryptocurrencies = state.cryptocurrencies;
        state.totalItems = state.filteredCryptocurrencies.length;
        state.totalPages = state.filteredCryptocurrencies
          ? Math.ceil(state.filteredCryptocurrencies.length / state.perPage)
          : 0;
      }
    },
    changeCurrentCurrency(state, action) {
      const currentCurrency = action.payload.symbol;
      const currentCurrencyRate = action.payload.rate;

      const updatedListWithNewCurrency = state.cryptocurrencies.map(
        (cryptocurrency) =>
          formatCryptocurrency(
            cryptocurrency,
            currentCurrency,
            currentCurrencyRate
          )
      );
      const updatedFilteredListWithNewCurrency =
        state.filteredCryptocurrencies.map((cryptocurrency) =>
          formatCryptocurrency(
            cryptocurrency,
            currentCurrency,
            currentCurrencyRate
          )
        );

      state.cryptocurrencies = updatedListWithNewCurrency;
      state.filteredCryptocurrencies = updatedFilteredListWithNewCurrency;
    },
  },
});

export const cryptocurrencyActions = cryptocurrencySlice.actions;

export default cryptocurrencySlice;
