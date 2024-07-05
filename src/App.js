import { useState } from "react";
import Navbar from "./Components/Navbar";
import { tempMovieData } from "./Data/startingData";
import Main from "./Components/Main";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <Navbar movies={movies} />
      <Main movies={movies} />
    </>
  );
}
