import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = `https://pixabay.com/api`;
const perPage = 12;
export const fetchImages = async (inputValue, pageNr) => {
  const response = await axios.get(
    `/?q=${inputValue}&page=${pageNr}&key=38440528-27ad43a15fe64cab61d6047d1&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}`
  );
  return response.data;
};

// export const NormalizedImages = () => {
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();
//     async function fetchImages() {
//       try {
//         setError(false);
//         const response = await axios.get(
//           `/?q=${inputValue}&page=${pageNr}&key=38440528-27ad43a15fe64cab61d6047d1&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}`,
//           { signal: controller.signal }
//         );
//         setTodos(response.data);
//       } catch (error) {
//         if (error.code !== 'ERR_CANCELED') {
//           setError(true);
//         }
//       }
//     }
//     fetchImages();

//     return () => {
//       controller.abort();
//     };
//   }, []);
// };

// export const fetchImages = async (inputValue, pageNr) => {
//   const response = await axios.get(
//     `/?q=${inputValue}&page=${pageNr}&key=38440528-27ad43a15fe64cab61d6047d1&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}`
//   );
//   return response.data;
// };

export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
