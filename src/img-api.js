import axios from 'axios';

export default class ImagesApi {
  constructor() {
    this.searchQueryValue = '';
    this.page = 1;
  }

  instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '12446809-e6b893a82bb8773aa8d1d047e',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
    },
  });

  async fetchImages() {
    try {
      const response = await this.instance.get('', {
        params: {
          q: this.searchQueryValue,
          page: this.page,
        },
      });
      this.page += 1;
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQueryValue;
  }

  set query(newQuery) {
    this.searchQueryValue = newQuery;
  }
}
