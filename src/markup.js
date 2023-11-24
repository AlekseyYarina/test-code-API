import { refs } from './refs';

export function appendMarkup(data) {
  refs.divImgContainer.insertAdjacentHTML('beforeend', createMarkup(data));
}

export function createMarkup(data) {
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return data.hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a href="${largeImageURL}" class="image-link">
          <div class="image-item">
            <img class="img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info-overlay">
              <div class="info-item">
                <p class="item-desk">Likes</p>
                <p class="info-overlay-content likes-content-js">${formatNumberWithCommas(likes)}</p>
              </div>
              <div class="info-item">
                <p class="item-desk">Views</p>
                <p class="info-overlay-content views-content-js">${formatNumberWithCommas(views)}</p>
              </div>
              <div class="info-item">
                <p class="item-desk">Comments</p>
                <p class="info-overlay-content comments-content-js">${formatNumberWithCommas(comments)}</p>
              </div>
              <div class="info-item">
                <p class="item-desk">Downloads</p>
                <p class="info-overlay-content downloads-content-js">${formatNumberWithCommas(downloads)}</p>
              </div>
            </div>
          </div>
        </a>`
    )
    .join('');
}

