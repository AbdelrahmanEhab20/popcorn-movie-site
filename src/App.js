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
  const [query, setQuery] = useState("Green");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      setData(JSON.parse(storedData));
      // setWatched(data);
    }
  }, []);

  const addData = (newItem) => {
    if (data.map((singleMOv) => singleMOv.imdbID).includes(newItem.imdbID)) {
      return;
    }
    const updatedData = [...data, newItem];
    setData(updatedData);
    localStorage.setItem("myData", JSON.stringify(updatedData));
  };

  // ! http://www.omdbapi.com/?apikey=[yourkey]&
  // ?--> https://www.omdbapi.com/?i=tt3896198&apikey=c989dcb0
  // ! my KEY ⬆️

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseSelectedMovie(id) {
    setSelectedId(null);
  }
  // ! Watched movies handler
  function handleAddedWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    // setData((data) => data.filter((movie) => movie.imdbID !== id));
    const newItems = data.filter((movie) => movie.imdbID !== id);
    setData(newItems);
    localStorage.setItem("myData", JSON.stringify(newItems));
  }
  // /// Event listener KeyPress ⤵️
  // useEffect(function () {
  //   function callback(e) {
  //     if (e.code == "Escape") {
  //       handleCloseSelectedMovie();
  //     }
  //   }
  //   document.addEventListener("keydown", callback);

  //   return function () {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, []);
  ///------
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found !");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          // setError(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseSelectedMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
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
              addLocal={addData}
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
              onAddedWatched={handleAddedWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                setWatched={setWatched}
                dataLocal={data}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </ReusableBox>
      </Main>
    </>
  );
}
