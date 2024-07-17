import React from "react";

function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movieData) => (
        <SingleMovie
          key={movieData.imdbID}
          movie={movieData}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
function SingleMovie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MoviesList;
