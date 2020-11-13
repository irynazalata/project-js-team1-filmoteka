import cards from '../templates/cardGallery.hbs';
import no_image_found from '../images/no-image.jpg';
import { popPagination, topRatedPagination, upComingPagination } from './pagination.js';
import { spinnerOff, spinnerOn } from "./spinner";
import '../css/card.css';
import '../styles.css';

const key = '401d61f37c17d956a98039a1a0734109';
const filterList = document.querySelector('.filter');
const filmList = document.querySelector('.home-film-list');
const popularBtn = document.querySelector('#popular');
const topRatedBtn = document.querySelector('#top-rated');
const upComingBtn = document.querySelector('#upcoming');

const filterRender = function (data) {
  spinnerOn();
  data.results.forEach(el => {
    el.release_date = Number.parseInt(el.release_date);
    el.poster_path === null
      ? (el.poster_path = no_image_found)
      : (el.poster_path = `https://image.tmdb.org/t/p/w300${el.poster_path}`);
    filmList.insertAdjacentHTML('beforeend', cards(el));
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
            spinnerOff();
          }
        });
      });
  });
};

export const popular = function (page) {
  fetch(
    ` https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
      filmList.innerHTML = '';
      popPagination(data);

      data.results.sort((a, b) => {
        return b.popularity - a.popularity;
      });
      filterRender(data);
    });
};
export const topRated = function (page) {
  fetch(
    ` https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
  filmList.innerHTML = '';
      topRatedPagination(data);
      data.results.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
      filterRender(data);
    });
};
export const upComing = function (page) {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
      filmList.innerHTML = '';
      upComingPagination(data);
      filterRender(data);
    });
};

const getData = function (e) {
  e.preventDefault();
  if (e.target.textContent === 'Popular') {
    popular();
    topRatedBtn.classList.remove('active-btn');
    upComingBtn.classList.remove('active-btn');
    popularBtn.classList.add('active-btn');
  } else if (e.target.textContent === 'Top Rated') {
    topRated();
    upComingBtn.classList.remove('active-btn');
    popularBtn.classList.remove('active-btn');
    topRatedBtn.classList.add('active-btn');
  } else if (e.target.textContent === 'Upcoming') {
    upComing();
    topRatedBtn.classList.remove('active-btn');
    popularBtn.classList.remove('active-btn');
    upComingBtn.classList.add('active-btn');
  }
};
filterList.addEventListener('click', getData);
