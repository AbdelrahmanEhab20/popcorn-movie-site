// import React, { useState } from "react";

// import imageReplacer from "../assets/imageReplacer.png";
// const ImageWithFallback = ({ src, alt, fallbackImage }) => {
//   const [imgSrc, setImgSrc] = useState(src);
//   const [error, setError] = useState(false);

//   const handleError = () => {
//     setError(true);
//   };

//   return (
//     <div>
//       {error ? (
//         <img src={imageReplacer} alt="Fallback" />
//       ) : (
//         <img src={imgSrc} alt={alt} onError={handleError} />
//       )}
//     </div>
//   );
// };

// export default ImageWithFallback;
