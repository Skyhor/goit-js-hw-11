import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from '../src/js-components/loadMoreBtn';
import { getRefs } from './js-components/refList';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GalleryApiService } from './searchApi';
import { appendGalleryMarkup } from './js-components/renderMarkup';
const axios = require('axios').default;

const galleryApiService = new GalleryApiService();
const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[class="load-more"]',
  hidden: true,
});

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.refs.button.addEventListener('click', clickLoadMoreBtn);

function onSubmit(e) {
  e.preventDefault();

  galleryApiService.query = e.target.elements.searchQuery.value.trim();
  galleryApiService.resetPage();

  if (galleryApiService.query === '') {
    return Notify.warning("Please enter something! I'm trying my best...");
  }
  e.target.elements.searchQuery.value = '';
  loadMoreBtn.show();
  clearImagesContainer();
  fetchGallery();
}

function clickLoadMoreBtn() {
  galleryApiService.incrementPage();
  smoothScroll();
  fetchGallery();
}

async function fetchGallery() {
  loadMoreBtn.disable();
  try {
    const response = await galleryApiService.fetchImages();
    const totalPages = Math.ceil(
      response.totalHits / galleryApiService.perPage
    );
    if (!response.hits.length) {
      loadMoreBtn.hide();
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (galleryApiService.currentPage === 1 && response.hits.length) {
      Notify.info(`Hooray! We found ${response.totalHits} images.`);
    }
    if (galleryApiService.currentPage === totalPages) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    appendGalleryMarkup(response.hits);
    const simpleLightbox = new SimpleLightbox('.gallery a');
    simpleLightbox.refresh();
    if (galleryApiService.currentPage > 1) {
      smoothScroll();
    }
    loadMoreBtn.enable();
  } catch (error) {
    console.log(error);
  }
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.3,
    behavior: 'smooth',
  });
}
