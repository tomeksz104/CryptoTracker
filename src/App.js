import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";

import "./App.css";
import CurrenciesPage from "./pages/Currencies";
import CryptocurrencyDetailPage, {
  loader as cryptocurrencyLoader,
} from "./pages/CryptocurrencyDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CurrenciesPage /> },
      {
        path: "cryptocurrency/:currencyId",
        id: "cryptocurrency-detail",
        element: <CryptocurrencyDetailPage />,
        loader: cryptocurrencyLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
