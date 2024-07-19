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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const KEY = "c989dcb0";
export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  // ! calling our new custom HOOK
  const { movies, isLoading, error } = useMovies(
    query,
    handleCloseSelectedMovie
  );
  // const [data, setData] = useState([]);

  // const [watched, setWatched] = useState([]);
  //!  another way for saving and getting data from local storage

  const [watched, setWatched] = useLocalStorageState([], "myData");

  // useEffect(() => {
  //   // Retrieve data from local storage when the component mounts
  //   const storedData = localStorage.getItem("myData");
  //   if (storedData) {
  //     setData(JSON.parse(storedData));
  //     // setWatched(data);
  //   }
  // }, []);

  // const addData = (newItem) => {
  //   if (data.map((singleMOv) => singleMOv.imdbID).includes(newItem.imdbID)) {
  //     return;
  //   }
  // const updatedData = [...data, newItem];
  // setData(updatedData);
  // localStorage.setItem("myData", JSON.stringify(updatedData));
  // };

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
    // const newItems = data.filter((movie) => movie.imdbID !== id);
    // setData(newItems);
    // localStorage.setItem("myData", JSON.stringify(newItems));
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
              // addLocal={addData}
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
                // dataLocal={data}
                onSelectMovie={handleSelectedMovie}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </ReusableBox>
      </Main>
    </>
  );
}
