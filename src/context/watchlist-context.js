import React, { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext({
  watchlist: [],
  addToWatchlist: (cryptocurrencySymbol) => {},
  removeFromWatchlist: (cryptocurrencySymbol) => {},
});

export const WatchlistContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const watchlistData = JSON.parse(localStorage.getItem("watchlist"));

    if (watchlistData) {
      setWatchlist(watchlistData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (cryptocurrencySymbol) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, cryptocurrencySymbol]);
  };

  const removeFromWatchlist = (cryptocurrencySymbol) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((item) => item !== cryptocurrencySymbol)
    );
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
