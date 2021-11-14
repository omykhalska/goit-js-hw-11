import { fetchImages } from './fetch_img.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSearchSubmit);

/*--------FUNCTIONS----------*/
function onSearchSubmit(e) {
  e.preventDefault();
  galleryEl.innerHTML = '';
  getImages();
}

function getImages() {
  const query = formEl.elements.searchQuery.value.trim();
  fetchImages(query)
    .then(({ data }) => {
      if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
      }
      renderGallery(data.hits);
    })
    .catch(error => console.log(error));
}

function createMarkup(images) {
  return images
    .map(image => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
      return `<a class="gallery__link" href="${largeImageURL}">
      <div class="photo-card">
          <div class="photo-thumb">
            <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy"/>
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
            </p>
          </div>
      </div>
      </a>`;
    })
    .join('');
}

function renderGallery(images) {
  galleryEl.insertAdjacentHTML('beforeend', createMarkup(images));
  const gallery = new SimpleLightbox('.gallery a');
}
