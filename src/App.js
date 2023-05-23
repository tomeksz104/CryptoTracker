import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";

import RootLayout from "./pages/Root";

import "./App.css";
import CurrenciesPage from "./pages/Currencies";
import CryptocurrencyDetailPage, {
  loader as cryptocurrencyLoader,
} from "./pages/CryptocurrencyDetail";
import ErrorPage from "./pages/Error";
import HeatMapPage, { loader as cryptocurrenciesLoader } from "./pages/HeatMap";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <CurrenciesPage /> },
      {
        path: "cryptocurrency/:currencyId",
        id: "cryptocurrency-detail",
        element: <CryptocurrencyDetailPage />,
        loader: cryptocurrencyLoader,
      },
      {
        path: "heat-map",
        element: <HeatMapPage />,
        loader: cryptocurrenciesLoader,
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
