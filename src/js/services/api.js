import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '22840960-ea2b07fd8d407a17e77cd52c1';

export async function fetchImages(query, page, pageSize) {
  const response = await axios.get(
    `${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${pageSize}`,
  );
  return response;
}
