import React, { useState, createContext } from "react";

const PictureOrderingFilterContext = createContext();

function PictureOrderingFilterProvider({ children }) {
  const [PictureOrderingFilterCont, setPictureOrderingFilterCont] = useState("");

  return (
    <PictureOrderingFilterContext.Provider
      value={{ PictureOrderingFilterCont, setPictureOrderingFilterCont }}
    >
      {children}
    </PictureOrderingFilterContext.Provider>
  );
}

export { PictureOrderingFilterContext, PictureOrderingFilterProvider };
