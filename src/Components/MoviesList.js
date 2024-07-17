import React from "react";

function MoviesList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movieData) => (
        <SingleMovie key={movieData.imdbID} movie={movieData} />
      ))}
    </ul>
  );
}
function SingleMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
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
