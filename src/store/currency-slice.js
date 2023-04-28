import { createSlice } from "@reduxjs/toolkit";

import { updateCryptocurrencyInNewCurrency } from "../utils/cryptoUtils";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    cryptocurrencies: [],
    filteredCryptocurrencies: [],
    totalItems: 0,
    currentPage: 0,
    perPage: 100,
    totalPages: 0,
    sortField: "",
    sortOrder: "asc",
    showWatchlist: false,
    watchlist: [],
    currentCurrency: "USD",
    currentCurrencyRate: 0,
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

      state.cryptocurrencies = state.cryptocurrencies.map((currency) => {
        const updatedCurrency = updatedCurrencies.find(
          (updated) => updated.id === currency.id
        );

        if (updatedCurrency) {
          return state.currentCurrency !== "USD" &&
            state.currentCurrencyRate !== 0
            ? updateCryptocurrencyInNewCurrency(
                updatedCurrency,
                state.currentCurrency,
                state.currentCurrencyRate
              )
            : updatedCurrency;
        }

        return currency;
      });

      state.filteredCryptocurrencies = state.filteredCryptocurrencies.map(
        (currency) => {
          const updatedCurrency = updatedCurrencies.find(
            (updated) => updated.id === currency.id
          );

          if (updatedCurrency) {
            return state.currentCurrency !== "USD" &&
              state.currentCurrencyRate !== 0
              ? updateCryptocurrencyInNewCurrency(
                  updatedCurrency,
                  state.currentCurrency,
                  state.currentCurrencyRate
                )
              : updatedCurrency;
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
      const sortOrder = state.sortOrder === "asc" ? "desc" : "asc"; // zmiana kierunku sortowania

      const sortedCurrencies = [...state.filteredCryptocurrencies].sort(
        (a, b) => {
          let fieldA = a[sortField].replace(/[$%"',[\]\s]/g, "");
          let fieldB = b[sortField].replace(/[$%"',[\]\s]/g, "");
          if (typeof fieldA === "string") {
            fieldA = fieldA.toLowerCase();
            fieldB = fieldB.toLowerCase();
          }

          if (!isNaN(fieldA) && !isNaN(fieldB)) {
            fieldA = Number(fieldA);
            fieldB = Number(fieldB);
          }

          if (fieldA < fieldB) {
            return sortOrder === "asc" ? -1 : 1;
          }
          if (fieldA > fieldB) {
            return sortOrder === "asc" ? 1 : -1;
          }
          return 0;
        }
      );

      state.sortField = sortField;
      state.sortOrder = sortOrder;
      state.filteredCryptocurrencies = sortedCurrencies;
    },
    toggleWatchlist(state, action) {
      state.showWatchlist = !state.showWatchlist;

      state.pageNumber = 0;

      if (state.showWatchlist) {
        const watchlist = [...state.filteredCryptocurrencies].filter((curr) =>
          state.watchlist.includes(curr.symbol)
        );
        state.filteredCryptocurrencies = watchlist;
        state.totalItems = watchlist.length;
        state.totalPages = watchlist
          ? Math.ceil(watchlist.length / state.perPage)
          : 0;
      } else {
        state.filteredCryptocurrencies = state.cryptocurrencies;
        state.totalItems = state.filteredCryptocurrencies.length;
        state.totalPages = state.filteredCryptocurrencies
          ? Math.ceil(state.filteredCryptocurrencies.length / state.perPage)
          : 0;
      }
    },
    addToWatchlist(state, action) {
      const { currency } = action.payload;

      state.watchlist.push(currency.symbol);

      const favoriteCurrencies =
        JSON.parse(localStorage.getItem("favoriteCurrencies")) || [];
      const currencyIndex = favoriteCurrencies.findIndex(
        (fav) => fav === currency.symbol
      );

      if (currencyIndex === -1) {
        favoriteCurrencies.push(currency.symbol);
      }

      localStorage.setItem(
        "favoriteCurrencies",
        JSON.stringify(favoriteCurrencies)
      );
    },
    removeFromWatchlist(state, action) {
      const { currency } = action.payload;

      const favoriteCurrencies =
        JSON.parse(localStorage.getItem("favoriteCurrencies")) || [];
      const updatedCurrencies = favoriteCurrencies.filter(
        (fav) => fav !== currency.symbol
      );
      state.watchlist = updatedCurrencies;

      localStorage.setItem(
        "favoriteCurrencies",
        JSON.stringify(updatedCurrencies)
      );
    },
    replaceWatchlist(state, action) {
      const { watchlist } = action.payload;

      state.watchlist = watchlist;
    },
    changeCurrentCurrency(state, action) {
      state.currentCurrency = action.payload.symbol;
      state.currentCurrencyRate = action.payload.rateUsd;

      const updatedListWithNewCurrency = state.cryptocurrencies.map(
        (cryptocurrency) =>
          updateCryptocurrencyInNewCurrency(
            cryptocurrency,
            action.payload.symbol,
            action.payload.rateUsd
          )
      );
      const updatedFilteredListWithNewCurrency =
        state.filteredCryptocurrencies.map((cryptocurrency) =>
          updateCryptocurrencyInNewCurrency(
            cryptocurrency,
            action.payload.symbol,
            action.payload.rateUsd
          )
        );

      state.cryptocurrencies = updatedListWithNewCurrency;
      state.filteredCryptocurrencies = updatedFilteredListWithNewCurrency;
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;
