import '../css/styles.css';
import { fetchImages } from './fetch_img.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('#search-form');

formEl.addEventListener('submit', e => {
  e.preventDefault();

  const query = formEl.elements.searchQuery.value.trim();
  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
      }
      console.log(data);
    })
    .catch(error => console.log(error.message));
});
