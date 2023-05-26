import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptocurrencyActions } from "../cryptocurrency-slice";
import { uiActions } from "../ui-slice";

import { formatCryptocurrency } from "../../utils/cryptoUtils";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coincap.io/v2/" }),
  endpoints: (builder) => ({
    getCryptocurrencies: builder.query({
      query: () => "assets?limit=1000",
      transformResponse: (response, queryApi, options) => {
        const { data } = response;
        const { currentCurrency, currentCurrencyRate } = options;

        const currencyPromises = data.map((cryptocurrency) =>
          formatCryptocurrency(
            cryptocurrency,
            currentCurrency,
            currentCurrencyRate
          )
        );

        return Promise.all(currencyPromises);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(cryptocurrencyActions.replaceCurrencyList({ items: data }));
        } catch (err) {
          dispatch(
            uiActions.showNotification({
              title: "Error!",
              message: "Fetching cryptocurrencies data failed!",
            })
          );
        }
      },
    }),
    getCryptocurrency: builder.query({
      query: (id) => `assets/${id}`,
    }),
  }),
});

export const { useGetCryptocurrenciesQuery, useGetCryptocurrencyQuery } =
  cryptoApi;
