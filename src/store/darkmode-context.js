import React, { useState } from "react";

const DarkmodeContext = React.createContext({
  isDarkmode: false,
  onToggleDarkmode: () => {},
});

export const DarkmodeContextProvider = (props) => {
  const [isDarkmode, setIsDarkmode] = useState(false);

  const toggleDarkmode = () => {
    setIsDarkmode(!isDarkmode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <DarkmodeContext.Provider
      value={{
        isDarkmode: isDarkmode,
        onToggleDarkmode: toggleDarkmode,
      }}
    >
      {props.children}
    </DarkmodeContext.Provider>
  );
};

export default DarkmodeContext;
