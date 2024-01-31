import React, { useState, createContext } from "react";

const PictureOrderingFilterContext = createContext();

function PictureOrderingFilterProvider({ children }) {
  const [PictureOrderingFilter, setPictureOrderingFilter] = useState("");

  return (
    <PictureOrderingFilterContext.Provider
      value={{ PictureOrderingFilter, setPictureOrderingFilter }}
    >
      {children}
    </PictureOrderingFilterContext.Provider>
  );
}

export { PictureOrderingFilterContext, PictureOrderingFilterProvider };
