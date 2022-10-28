import { Notify } from 'notiflix/build/notiflix-notify-aio';
const URL = 'https://pixabay.com/api/';
//const Filter = 'image_type=photo&orientation=horizontal&safesearch=true';
const axios = require('axios').default;
const searchParams = new URLSearchParams({
  key: '30620047-2b41fea3ffb04e82a67076d5b',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

export class GalleryApiService {
  constructor() {
    this.keyWord = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages() {
    const search = `${URL}?q=${this.keyWord}&${searchParams}&page=${this.page}&per_page=${this.per_page}`;
    try {
      const response = await axios.get(search);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set query(newWord) {
    this.keyWord = newWord;
  }
  get query() {
    return this.keyWord;
  }

  set perPage(newPerPage) {
    this.per_page = newPerPage;
  }
  get perPage() {
    return this.per_page;
  }

  set currentPage(newPageg) {
    this.page = newPageg;
  }
  get currentPage() {
    return this.page;
  }
}
