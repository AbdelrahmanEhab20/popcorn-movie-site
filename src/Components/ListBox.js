import React, { useState } from "react";

function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MoviesList movies={movies} />}
    </div>
  );
}
function MoviesList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movieData) => (
        <SingleMovie movie={movieData} key={movieData.id} />
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
export default ListBox;
