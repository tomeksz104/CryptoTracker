import ReactDOM from "react-dom";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import CurrencyContext from "../../context/currecy-context";
import DarkmodeContext from "../../context/darkmode-context";

import logoDarkmode from "../../assets/logo-dark.png";

const portalElement = document.getElementById("sidebar");

const Sidebar = (props) => {
  const currencyCtx = useContext(CurrencyContext);
  const darkmodeCtx = useContext(DarkmodeContext);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar((current) => !current);
  };

  const handleOpenCurrentCurrencyModal = () => {
    setShowSidebar((current) => !current);
    props.onOpenCurrentCurrencyModal();
  };

  const toggleDarkMode = () => {
    setShowSidebar((current) => !current);
    darkmodeCtx.onToggleDarkmode();
  };

  return (
    <>
      <button
        onClick={handleToggleSidebar}
        className="p-2 bg-slate-400/10 hover:bg-slate-400/20 dark:text-slate-200 rounded-md sm:hidden"
      >
        <svg
          className="h-6 w-6 transition duration-200 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      {ReactDOM.createPortal(
        <>
          <div
            onClick={handleToggleSidebar}
            className={`fixed inset-0 z-10 bg-[#0a1e42] opacity-40 ${
              showSidebar ? "block " : "hidden"
            }`}
            aria-hidden="true"
          ></div>
          <section
            className={`fixed inset-y-0 z-20 w-full max-w-sm bg-[#0b2948] dark:bg-darker dark:text-light focus:outline-none ease-in-out duration-300
            ${showSidebar ? "translate-x-0 " : "-translate-x-full"}`}
          >
            <div class="flex flex-col justify-between h-screen">
              <div className="flex flex-col">
                <div className="flex items-center justify-between h-14 px-5 py-8">
                  <NavLink to="/" className="mr-5 cursor-pointer">
                    <img
                      className="h-8 object-cover"
                      src={logoDarkmode}
                      alt="Crypto Currency App Logo"
                    />
                  </NavLink>
                  <button
                    onClick={handleToggleSidebar}
                    className="p-2 text-slate-500 hover:text-slate-400 hover:bg-slate-400/10 rounded-full"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="overflow-y-auto overflow-x-hidden">
                  <ul className="flex flex-col py-4 space-y-1 mt-10 text-sm tracking-wide">
                    <li>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `block py-5  ${
                            isActive
                              ? "bg-[#00458b] text-sky-500"
                              : "hover:bg-[#00458b] text-slate-400 hover:text-sky-500"
                          }`
                        }
                      >
                        <span className="ml-5">Cryptocurrencies</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/heat-map"
                        className={({ isActive }) =>
                          `block py-5  ${
                            isActive
                              ? "bg-[#00458b] text-sky-500"
                              : "hover:bg-[#00458b] text-slate-400 hover:text-sky-500"
                          }`
                        }
                      >
                        <span className="ml-5">Heatmap</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center p-5 space-x-5">
                <button
                  onClick={handleOpenCurrentCurrencyModal}
                  class="w-full flex justify-center items-center text-slate-400 bg-slate-400/10 hover:bg-slate-400/20 rounded-md py-2"
                >
                  <span class="text-xs font-medium">
                    {currencyCtx.currentCurrency}
                  </span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  class="w-full flex justify-center items-center text-slate-400 bg-slate-400/10 hover:bg-slate-400/20 rounded-md py-2"
                >
                  <span class="flex text-xs font-medium">
                    {darkmodeCtx.isDarkmode ? "Light" : "Dark"}
                    {darkmodeCtx.isDarkmode ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="ml-2 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="ml-2 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </section>
        </>,
        portalElement
      )}
    </>
  );
};

export default Sidebar;
