import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import NumberResults from "./Components/NumberResults";
import SearchField from "./Helpers/SearchField";
// import { tempMovieData, tempWatchedData } from "./Data/startingData";
import { WatchedSummary } from "./Components/WatchedBox";
import { WatchedMoviesList } from "./Components/WatchedBox";
import MoviesList from "./Components/MoviesList";
import Main from "./Components/Main";
import ReusableBox from "./Helpers/ReusableBox";
import Loader from "./Helpers/Loader";
import ErrorMessage from "./Helpers/ErrorMessage";
import MovieDetails from "./Components/MovieDetails";

const KEY = "c989dcb0";
export default function App() {
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  // ! http://www.omdbapi.com/?apikey=[yourkey]&
  // ?--> https://www.omdbapi.com/?i=tt3896198&apikey=c989dcb0
  // ! my KEY ⬆️
  // const tempQuery = "Heat";
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${tempQuery}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMovies(data.Search);
  //       setIsLoading(false);
  //     });
  // }, []);
  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseSelectedMovie(id) {
    setSelectedId(null);
  }
  useEffect(
    function () {
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
          // setSelectedId(data.Search.imdbID);
          setError("");
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  //   ! --------- old fetch data -------
  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=Heat`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <>
      <Navbar>
        <SearchField query={query} setQuery={setQuery} />
        <NumberResults movies={movies} />
      </Navbar>
      <Main>
        <ReusableBox>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </ReusableBox>

        <ReusableBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </ReusableBox>
      </Main>
    </>
  );
}
