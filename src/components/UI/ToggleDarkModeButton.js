import { useContext } from "react";
import DarkmodeContext from "../../context/darkmode-context";

function ToggleDarkModeButton() {
  const darkmodeCtx = useContext(DarkmodeContext);

  const toggleDarkMode = () => {
    darkmodeCtx.onToggleDarkmode();
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="switch theme"
      className="group relative flex h-9 w-9 rounded-full hidden sm:block before:absolute before:inset-0 before:rounded-full hover:before:bg-slate-400/10 before:bg-gradient-to-b before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="relative transistion hidden m-auto h-5 w-5 fill-gray-500 duration-300 group-hover:rotate-180 dark:fill-gray-300 group-hover:fill-yellow-400 dark:block"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="relative transistion m-auto h-5 w-5 fill-gray-500 duration-300 group-hover:-rotate-90 group-hover:fill-blue-900 dark:hidden"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
    </button>
  );
}

export default ToggleDarkModeButton;
