import React, { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

function SearchField({ query, setQuery }) {
  const searchFieldRef = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === searchFieldRef.current) return;

    searchFieldRef.current.focus();
    setQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchFieldRef}
    />
  );
}

export default SearchField;
