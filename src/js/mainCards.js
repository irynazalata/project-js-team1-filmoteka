import cards from '../templates/cardGallery.hbs';
import no_image_found from '../images/no-image.jpg';
import '../css/card.css';
import { changePagination } from './pagination.js';
import { spinnerOff, spinnerOn } from './spinner.js';

const key = '401d61f37c17d956a98039a1a0734109';

export const findPopular = async function (page) {
  spinnerOn();
  return await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
      if (data.results.length === 0) document.querySelector('#pagination').classList.add('is-none-pagination');
      changePagination(data);
      data.results.forEach(el => {
        el.release_date = Number.parseInt(el.release_date);
        el.poster_path === null
          ? (el.poster_path = no_image_found)
          : (el.poster_path = `https://image.tmdb.org/t/p/w300${el.poster_path}`);
        document
          .querySelector('.home-film-list')
          .insertAdjacentHTML('beforeend', cards(el));
        fetch(`https://api.themoviedb.org/3/movie/${el.id}?api_key=${key}`)
          .then(data => data.json())
          .then(data => {
            document.querySelectorAll('.gallery-item-genre').forEach(el => {
              if (el.dataset.id == data.id) {
                data.genres.forEach(i => {
                  el.insertAdjacentHTML(
                    'afterbegin',
                    `<span class="gallery-item-genre-name">${i.name}<span class="no-need-symbol">,</span> </span>`,
                  );
                });
              }
            });
          });
    spinnerOff();
      });
    });
};
findPopular();
