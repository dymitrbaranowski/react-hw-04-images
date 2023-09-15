import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;
export const perPage = 12;
export const fetchImages = async (inputValue, pageNr) => {
  const response = await axios.get(
    `/?q=${inputValue}&page=${pageNr}&key=38440528-27ad43a15fe64cab61d6047d1&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}`
  );
  return response.data;
};

export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
