import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptocurrencyActions } from "../cryptocurrency-slice";
import { uiActions } from "../ui-slice";

import { formatCryptocurrency, roundToDecimals } from "../../utils/cryptoUtils";

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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled.catch((error) => {
          dispatch(
            uiActions.showNotification({
              title: "Error!",
              message: "Fetching cryptocurrency detail data failed!",
            })
          );
        });
      },
    }),
    getMarkets: builder.query({
      query: ({ id, offset }) =>
        `assets/${id}/markets?offset=${offset}&limit=100`,
      transformResponse: (response, queryApi, options) => {
        const { data } = response;

        const { offset } = options;

        const marketsWithId = data.map((market, index) => ({
          ...market,
          marketId: (index + 1 + offset).toString(),
        }));

        return Promise.all(marketsWithId);
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled.catch((error) => {
          dispatch(
            uiActions.showNotification({
              title: "Error!",
              message: "Fetching markets data failed!",
            })
          );
        });
      },
    }),
    getChartData: builder.query({
      query: ({ id, chartInterval, start, end }) =>
        `assets/${id}/history?interval=${chartInterval}&start=${start}&end=${end}`,
      transformResponse: (response, queryApi, options) => {
        const { data } = response;

        const { currentCurrencyRate } = options;

        const chartData = data.map((item) => {
          if (currentCurrencyRate === 0) {
            return [item.time, roundToDecimals(+item.priceUsd, 2)];
          } else {
            return [
              item.time,
              roundToDecimals(+item.priceUsd / currentCurrencyRate, 2),
            ];
          }
        });

        return Promise.all(chartData);
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled.catch((error) => {
          dispatch(
            uiActions.showNotification({
              title: "Error!",
              message: "Fetching chart data failed!",
            })
          );
        });
      },
    }),
  }),
});

export const {
  useGetCryptocurrenciesQuery,
  useGetCryptocurrencyQuery,
  useGetMarketsQuery,
  useGetChartDataQuery,
} = cryptoApi;
