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
    sortField: "",
    sortOrder: "asc",
  },
  reducers: {
    replaceCurrencyList(state, action) {
      state.items = action.payload.items;

      if (state.filteredCurrencies.length > 0) {
        const filteredIds = state.filteredCurrencies.map(
          (currency) => currency.id
        );
        const filteredItems = state.items.filter((currency) =>
          filteredIds.includes(currency.id)
        );

        state.filteredCurrencies = filteredItems;

        const filteredItemsLength = filteredItems.length;

        state.totalItems = filteredItemsLength;

        state.totalPages = filteredItems
          ? Math.ceil(filteredItemsLength / state.perPage)
          : 0;

        return;
      }

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
    sortCurrencies: (state, action) => {
      const sortField = action.payload;
      const sortOrder = state.sortOrder === "asc" ? "desc" : "asc"; // zmiana kierunku sortowania

      const sortedCurrencies = [...state.filteredCurrencies].sort((a, b) => {
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
      });

      state.sortField = sortField;
      state.sortOrder = sortOrder;
      state.filteredCurrencies = sortedCurrencies;
    },
    // sortCurrencies: (state, action) => {
    //   const sortField = action.payload.field;

    //   const sortedCurrencies = state.filteredCurrencies;

    //   sortedCurrencies.sort(function (a, b) {
    //     const nameA = a.name.toLowerCase(),
    //       nameB = b.name.toLowerCase();
    //     if (nameA < nameB) {
    //       return -1;
    //     }
    //     if (nameB > nameB) {
    //       return 1;
    //     }
    //     return 0;
    //   });

    //   state.sortField = sortField
    //   state.filteredCurrencies = sortedCurrencies;
    // },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;
