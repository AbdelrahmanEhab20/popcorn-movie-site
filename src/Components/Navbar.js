import React, { useState } from "react";
import SearchField from "./SearchField";
import Logo from "./Logo";
import NumberResults from "./NumberResults";

function Navbar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchField />
      <NumberResults movies={movies} />
    </nav>
  );
}

export default Navbar;
