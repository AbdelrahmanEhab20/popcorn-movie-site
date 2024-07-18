import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "../Helpers/Loader";
import ErrorMessage from "../Helpers/ErrorMessage";
const KEY = "c989dcb0";
function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddedWatched,
  watched,
  addLocal,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isWatched = watched
    .map((singleMOv) => singleMOv.imdbID)
    .includes(selectedId);
  const savedUserRating = watched.filter(
    (singleMOv) => singleMOv.imdbID === selectedId
  )[0];

  function handleAdd() {
    setError("");

    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      plot,
      imdbRating: Number(imdbRating),
      released,
      actors,
      director,
      genre,
      userRating,
    };
    onAddedWatched(newWatchedMovie);
    addLocal(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      fetchMovieDetails();
    },
    [selectedId]
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            {!isWatched ? (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )}
              </div>
            ) : (
              <div className="rating">
                <p style={{ textAlign: "center" }}>
                  You Already Rated This Movie ({savedUserRating.userRating}{" "}
                  ⭐️)
                </p>
              </div>
            )}
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring : {actors}</p>
            <p> Directed By : {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
