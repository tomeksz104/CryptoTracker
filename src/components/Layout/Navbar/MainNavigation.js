import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Provider } from "react-redux";
import DarkmodeContext from "../../../context/darkmode-context";
import CurrencyContext from "../../../context/currecy-context";
import store from "../../../store";

import Sidebar from "../Sidebar";
import CurrencyPicker from "./CurrencyPicker";
import ToggleDarkModeButton from "../../UI/ToggleDarkModeButton";

import logo from "../../../assets/logo.webp";
import logoDarkmode from "../../../assets/logo-dark.webp";
import { ReactComponent as CaretDown } from "../../../assets/svg/caret-down.svg";

const MainNavigation = () => {
  const darkmodeCtx = useContext(DarkmodeContext);
  const currencyCtx = useContext(CurrencyContext);
  const [isCurrencyPickerOpen, setIsCurrencyPickerOpen] = useState(false);

  const onOpenCurrentCurrencyModal = () => {
    setIsCurrencyPickerOpen(true);
  };

  const onCloseCurrentCurrencyModal = () => {
    setIsCurrencyPickerOpen(false);
  };

  return (
    <nav className="border-b border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-3 flex justify-between py-4 z-10">
        <div className="flex items-center">
          <NavLink to="/" className="mr-5 cursor-pointer">
            <img
              width={200}
              height={40}
              fetchpriority="high"
              className="h-10 object-cover"
              src={
                !darkmodeCtx.isDarkmode
                  ? "/CryptoTracker/logo.webp"
                  : logoDarkmode
              }
              alt="Crypto Currency App Logo"
            />
          </NavLink>

          <div className="items-center hidden space-x-8 lg:flex text-base	font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex hover:text-sky-500 dark:hover:text-sky-500 cursor-pointer transition-colors duration-300 ${
                  isActive
                    ? "text-sky-500"
                    : "text-slate-600 dark:text-slate-200"
                }`
              }
            >
              Cryptocurrencies
            </NavLink>

            <NavLink
              to="/heat-map"
              className={({ isActive }) =>
                `flex hover:text-sky-500 dark:hover:text-sky-500 cursor-pointer transition-colors duration-300 ${
                  isActive
                    ? "text-sky-500"
                    : "text-slate-600 dark:text-slate-200"
                }`
              }
            >
              Heat map
            </NavLink>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <Provider store={store}>
            <div
              onClick={onOpenCurrentCurrencyModal}
              className="hidden sm:flex items-center bg-slate-400/10 hover:bg-slate-400/20 dark:text-slate-200 rounded-md cursor-pointer"
              style={{ padding: "5px 8px" }}
            >
              <span className="text-xs font-medium">
                {currencyCtx.currentCurrency}
              </span>
              <CaretDown className="w-3 h-3 ml-1 fill-black dark:fill-slate-200" />
            </div>
            <CurrencyPicker
              modalIsOpen={isCurrencyPickerOpen}
              onClose={onCloseCurrentCurrencyModal}
            />
          </Provider>
          <ToggleDarkModeButton />
          <Sidebar onOpenCurrentCurrencyModal={onOpenCurrentCurrencyModal} />
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
