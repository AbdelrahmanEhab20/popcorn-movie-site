import { useState } from "react";
import Navbar from "./Components/Navbar";
import NumberResults from "./Components/NumberResults";
import SearchField from "./Helpers/SearchField";
import { tempMovieData, tempWatchedData } from "./Data/startingData";

// import ListBox from "./Components/ListBox";
// import WatchedBox from "./Components/WatchedBox";
import { WatchedSummary } from "./Components/WatchedBox";
import { WatchedMoviesList } from "./Components/WatchedBox";
import MoviesList from "./Components/MoviesList";
import Main from "./Components/Main";
import ReusableBox from "./Helpers/ReusableBox";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      {/* navbar section*/}
      <Navbar>
        <SearchField />
        <NumberResults movies={movies} />
      </Navbar>
      {/* main section */}
      <Main>
        {/* List Movies Box section */}
        {/* <ReusableBox>
          <MoviesList movies={movies} />
        </ReusableBox> */}
        <ReusableBox element={<MoviesList movies={movies} />} />

        {/* Watched Movies Box section */}

        {/* <ReusableBox>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </ReusableBox> */}
        <ReusableBox
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        />
      </Main>
    </>
  );
}
