const goTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);

export function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    goTopBtn.classList.add('back-to-top-show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back-to-top-show');
  }
}

export function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function scrollGallery(element) {
  const cardHeight = element.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
