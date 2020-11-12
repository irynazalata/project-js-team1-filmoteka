import cards from '../templates/cardGallery.hbs';
import no_image_found from '../images/no-image.jpg';
import '../css/card.css';
import { changePagination } from './pagination.js';

const key = '401d61f37c17d956a98039a1a0734109';

const filterPopular = function () {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
  )
    .then(data => data.json())
    .then(data => console.log(data));
};
filterPopular();
