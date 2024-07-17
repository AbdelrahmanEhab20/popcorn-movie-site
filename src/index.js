import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./Components/StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
// function TEstRate() {
//   const [testRate, setTestRate] = useState(0);
//   return (
//     <>
//       <StarRating maxRating={10} defaultRating={3} onSetRating={setTestRate} />
//       <div>RATING FOR THIS MOVIE IS {testRate} STARS</div>
//     </>
//   );
// }
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} /> */}
    {/* <TEstRate />
    <StarRating maxRating={10} defaultRating={3} />
    <StarRating
      defaultRating={2}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}
    <App />
  </React.StrictMode>
);
