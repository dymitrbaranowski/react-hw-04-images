import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;
const perPage = 12;
const apiKey = '38440528-27ad43a15fe64cab61d6047d1';

export const fetchImages = async (inputValue, pageNr) => {
  const response = await axios.get(
    `/?q=${inputValue}&page=${pageNr}&key=${apiKey}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}`
  );
  return response.data;
};

export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
