import React, { useEffect, useRef } from "react";

function SearchField({ query, setQuery }) {
  const searchFieldRef = useRef(null);
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === searchFieldRef.current) return;

        if (e.code == "Enter") {
          searchFieldRef.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [setQuery]
  );
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
