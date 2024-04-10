import React, { Suspense, lazy } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";

import RootLayout from "./components/Layout/Root";

import "./App.css";
import CryptoTrackerPage from "./pages/CryptoTracker";
//import CryptocurrencyDetailPage from "./pages/CryptocurrencyDetail";

import ErrorPage from "./pages/Error";
import HeatMapPage, { loader as cryptocurrenciesLoader } from "./pages/HeatMap";

// const HeatMapPage = lazy(() => import("./pages/HeatMap"));
const CryptocurrencyDetailPage = lazy(() =>
  import("./pages/CryptocurrencyDetail")
);

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <CryptoTrackerPage /> },
      {
        path: "cryptocurrency/:currencyId",
        id: "cryptocurrency-detail",
        element: (
          <Suspense fallback="">
            <CryptocurrencyDetailPage />
          </Suspense>
        ),
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
  return <RouterProvider router={router} />;
}

export default App;
