import React, { useState, createContext } from "react";

const PostCategoryFilterContext = createContext();

function PostCategoryFilterProvider({ children }) {
  const [PostCategoryFilters, setPostCategoryFilters] = useState("");

  return (
    <PostCategoryFilterContext.Provider
      value={{ PostCategoryFilters, setPostCategoryFilters }}
    >
      {children}
    </PostCategoryFilterContext.Provider>
  );
}

export { PostCategoryFilterContext, PostCategoryFilterProvider };
