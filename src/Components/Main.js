import React, { useState } from "react";
import { tempWatchedData } from "../Data/startingData";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

function Main({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox />
    </main>
  );
}

export default Main;
