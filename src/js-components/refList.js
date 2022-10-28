export function getRefs() {
  const refs = {
    form: document.querySelector('#search-form'),
    imagesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
  };
  return refs;
}
