import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';
import { appendMarkup } from './markup';
import ImagesApi from './img-api';
const imagesApi = new ImagesApi();
const lightbox = new simpleLightbox('.gallery a');

const NotifyParams = {
  position: 'center-center',
  timeout: 750,
  width: '800x',
  fontSize: '18px',
  borderRadius: '7px',
  showOnlyTheLastOne: true,
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.1)',
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let options = {
  root: null,
  rootMargin: "800px",
  threshold: 1.0,
};

let observer = new IntersectionObserver (onLoad, options);


async function onSearch(e) {
  e.preventDefault();
  hideLoadmoreBtn();
  pageClearing();
  imagesApi.resetPage();
  imagesApi.query = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (checkEmptyRequest()) {
    return;
  }
  try {
    const data = await imagesApi.fetchImages();
    if (data.hits.length !== 0) {
      notifyQuantityOfMatches(data.total);
      showLoadmoreBtn();
      appendMarkup(data);
      lightbox.refresh();
      observer.observe(refs.target);
      checkEndImages(data);
    } else {
      notifyNoMatches();
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function onLoadMore() {
  try {
    const data = await imagesApi.fetchImages();
    appendMarkup(data);
    lightbox.refresh();
    checkEndImages(data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function onLoad(entries, observer) {
  entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
          const data = await imagesApi.fetchImages();
          appendMarkup(data);
          lightbox.refresh();
      }
  });
}

function showLoadmoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadmoreBtn() {
  if (refs.loadMoreBtn.classList.contains('visually-hidden')) {
    return;
  }
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function pageClearing() {
  refs.divImgContainer.innerHTML = '';
}

function checkEmptyRequest() {
  if (imagesApi.query === '') {
    notifyEmptyRequest();
    return true;
  }
  return false;
}

function checkEndImages(data) {
  const totalDisplayedImages = document.querySelectorAll('.image-link').length;
  const totalHits = data.total;
  totalDisplayedImages >= totalHits &&
    (hideLoadmoreBtn(), notifyEndOfResults());
}

function notifyEmptyRequest() {
  Notiflix.Notify.failure('Please enter your request!', NotifyParams);
}

function notifyEndOfResults() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results.",
    NotifyParams
  );
}

function notifyQuantityOfMatches(totalHits) {
  Notiflix.Notify.success(
    `Hooray! We found ${totalHits} images.`,
    NotifyParams
  );
}

function notifyNoMatches() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    NotifyParams
  );
}
