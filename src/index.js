import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { DarkmodeContextProvider } from "./context/darkmode-context";
import { CurrencyContextProvider } from "./context/currecy-context";
import { WatchlistContextProvider } from "./context/watchlist-context";
import store from "./store";

import "@fontsource/inter";
import "@fontsource/inter/500.css"; // Weight 500.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <DarkmodeContextProvider>
      <CurrencyContextProvider>
        <WatchlistContextProvider>
          <App />
        </WatchlistContextProvider>
      </CurrencyContextProvider>
    </DarkmodeContextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
