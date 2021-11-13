const BASE_URL = 'https://pixabay.com/api';
const KEY = '22840960-ea2b07fd8d407a17e77cd52c1';

export function fetchImages(query) {
  return fetch(
    `${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`,
  ).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}
