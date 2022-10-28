import { getRefs } from './refList';
const refs = getRefs();
export function appendGalleryMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery-link" href="${largeImageURL}"><div class="photo-card">
          <img src="${webformatURL}" alt=" ${tags}" width="280" height="190" loading="lazy" />
          
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${likes}
            </p>
            <p class="info-item">
              <b>Views </b>${views}
            </p>
            <p class="info-item">
              <b>Comments</b>${comments}
            </p>
            <p class="info-item">
              <b>Downloads </b>${downloads}
            </p>
          </div>
        </div></a>`;
      }
    )
    .join('');
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
}
