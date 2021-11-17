import { fetchImages } from './services/api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
const goTopBtn = document.querySelector('.back-to-top');
let gallery;
let page = 1;
const pageSize = 40;

loadMoreBtnEl.classList.add('is-hidden');

formEl.addEventListener('submit', onSearchSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);

/*--------FUNCTIONS----------*/
function onSearchSubmit(e) {
  e.preventDefault();
  page = 1;
  document.querySelector('.limit-reached')?.remove();
  galleryEl.innerHTML = '';
  makeRequest();
}

function onLoadMoreBtnClick() {
  gallery.destroy();
  makeRequest();
}

function makeRequest() {
  loadMoreBtnEl.classList.add('is-hidden');
  getImages();
  page += 1;
}

function getImages() {
  const query = formEl.elements.searchQuery.value.trim();

  if (query !== '') {
    fetchImages(query, page, pageSize)
      .then(({ data }) => {
        if (data.hits.length === 0) {
          Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`,
          );
        } else {
          if (page === 2) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`);
          }

          renderGallery(data.hits);

          if (page > 2) scrollGallery();

          loadMoreBtnEl.classList.remove('is-hidden');

          const restOfImages = data.totalHits - (page - 1) * pageSize;
          restOfImages < 1 && stopLoadMore();
        }
      })
      .catch(error => console.log(error));
  }
}

function renderGallery(images) {
  const markup = images
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

  galleryEl.insertAdjacentHTML('beforeend', markup);
  gallery = new SimpleLightbox('.gallery a');
}

function stopLoadMore() {
  loadMoreBtnEl.classList.add('is-hidden');
  galleryEl.insertAdjacentHTML(
    'afterend',
    `<p class="limit-reached"><span class="material-icons">info</span> We're sorry, but you've reached the end of search results!</p>`,
  );
  formEl.reset();
}

function scrollGallery() {
  const cardHeight = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    goTopBtn.classList.add('back-to-top-show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back-to-top-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}