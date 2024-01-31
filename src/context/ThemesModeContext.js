import React, { useState, createContext } from "react";

const ThemesModeContext = createContext();

function ThemesModeProvider({ children }) {
  const [ThemesMode, setThemesMode] = useState("ligth");

  return (
    <ThemesModeContext.Provider value={{ ThemesMode, setThemesMode }}>
      {children}
    </ThemesModeContext.Provider>
  );
}

export { ThemesModeContext, ThemesModeProvider };
