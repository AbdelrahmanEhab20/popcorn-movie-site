import React, { useEffect } from "react";
// import { tempWatchedData } from "../Data/startingData";
// import ReusableBox from "../Helpers/ReusableBox";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// function WatchedBox() {
//   // const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//     <ReusableBox>
//       <WatchedSummary watched={watched} />
//       <WatchedMoviesList watched={watched} />
//     </ReusableBox>
//   );
// }

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
export function WatchedMoviesList({ watched, dataLocal, setWatched }) {
  // console.log(dataLocal);
  setWatched(dataLocal);
  return (
    <ul className="list">
      {watched.map((watchedMovieData) => (
        <SingleWatchedMovie
          movie={watchedMovieData}
          key={watchedMovieData.imdbID}
        />
      ))}
    </ul>
  );
}
function SingleWatchedMovie({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
// export default WatchedBox;
