import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";

import "./App.css";
import CurrenciesPage from "./pages/Currencies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <CurrenciesPage /> }],
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <CurrenciesPage />, loader: currenciesLoader },
//     ],
//   },
// ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
