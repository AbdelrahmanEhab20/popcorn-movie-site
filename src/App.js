import { useEffect, useState } from "react";
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
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";

const KEY = "c989dcb0";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // ! http://www.omdbapi.com/?apikey=[yourkey]&
  // ?--> https://www.omdbapi.com/?i=tt3896198&apikey=c989dcb0
  // ! my KEY ⬆️
  const query = "Heat";
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMovies(data.Search);
  //       setIsLoading(false);
  //     });
  // }, []);
  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found !");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);
  //   ! --------- old fetch data -------
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=Heat`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <>
      <Navbar>
        <SearchField />
        <NumberResults movies={movies} />
      </Navbar>
      <Main>
        <ReusableBox>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MoviesList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </ReusableBox>

        <ReusableBox>
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        </ReusableBox>
      </Main>
    </>
  );
}
