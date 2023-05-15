import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Provider } from "react-redux";
import DarkmodeContext from "../../context/darkmode-context";

import store from "../../store";
import logo from "../../assets/logo.png";
import logoDarkmode from "../../assets/logo-dark.png";
import CurrencyPicker from "../CurrencyPicker/CurrencyPicker";
import ToggleDarkModeButton from "../UI/ToggleDarkModeButton";

const MainNavigation = () => {
  const darkmodeCtx = useContext(DarkmodeContext);

  return (
    <nav className="border-b border-slate-100 dark:border-slate-800">
      <div className="container mx-auto flex justify-between py-4 z-10">
        <div className="flex items-center">
          <NavLink to="/" className="mr-5 cursor-pointer">
            <img
              className="h-10 object-cover"
              src={!darkmodeCtx.isDarkmode ? logo : logoDarkmode}
              alt="Crypto Currency App Logo"
            />
          </NavLink>

          <div className="items-center hidden space-x-8 lg:flex text-base	font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex hover:text-sky-500 cursor-pointer transition-colors duration-300 ${
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
                `flex hover:text-sky-500 cursor-pointer transition-colors duration-300 ${
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
            <CurrencyPicker />
          </Provider>
          <ToggleDarkModeButton />
          <a className="flex text-sky-500 hover:text-sky-400 font-medium cursor-pointer transition-colors duration-300">
            Login
          </a>
          <a
            className="flex text-white dark:text-slate-900 font-medium bg-sky-500 hover:bg-sky-400 rounded-md py-2 px-5
                    cursor-pointer transition-colors duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
