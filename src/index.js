import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const submitForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const input = document.querySelector('.search-form input')

const API_KEY = '26837460-553b8b6dbfe9a53b3dd0b8a3a';
const BASE_URL = "https://pixabay.com/api/?key=";
const OPTIONS = "}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40";

async function getPhotos(name) {
  try {
    const response = await axios.get(BASE_URL + API_KEY + `&q=${name}` + OPTIONS + `&page=1`);
    return response.data.hits;
  } catch (error) {
    Notify.warning('Sorry, there are no images matching your search query. Please try again.');
  }
}

function onSearch(event) {
  event.preventDefault();
  const searchQuery = input.value;
  // console.log(searchQuery);
  galleryList.innerHTML = '';
  if (searchQuery !== '') {
    getPhotos(searchQuery).then((array) => renderPhotosList(array)
    );
  }
}

submitForm.addEventListener('submit', onSearch);

function renderPhotosList(photos) {
  const markup = photos
    .map((photo) => {
      return `
      <div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" max-width="400px" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${photo.likes}</br>
    </p>
    <p class="info-item">
      <b>Views</b><br>${photo.views}</br>
    </p>
    <p class="info-item">
      <b>Comments</b><br>${photo.comments}</br>
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${photo.downloads}</br>
    </p>
  </div>
</div>
      `
    })
    .join("");
  galleryList.insertAdjacentHTML('beforeend', markup);
}