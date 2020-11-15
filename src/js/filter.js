import cards from '../templates/cardGallery.hbs';
import no_image_found from '../images/no-image.jpg';
import { popPagination, topRatedPagination, upComingPagination } from './pagination.js';
import { spinnerOff, spinnerOn } from "./spinner";
import '../css/card.css';
import '../styles.css';
import { renameAll } from './languageSwutcher.js';
let language;
const key = '401d61f37c17d956a98039a1a0734109';
const filterList = document.querySelector('.filter');
const filmList = document.querySelector('.home-film-list');
const popularBtn = document.querySelector('#popular');
const topRatedBtn = document.querySelector('#top-rated');
const upComingBtn = document.querySelector('#upcoming');
const LANGUAGE = {
  en: 'en-US',
  ua: 'uk-UA',
}

const checkboxLanguageRef = document.querySelector('.language-switch__toggle');
  const bodyRef = document.querySelector('body');
  
  (function initLanguage() {
    if (localStorage.getItem('language') === null) {
      language = LANGUAGE.en;
      localStorage.setItem('language', language); 
    } else {
      language = localStorage.getItem('language');
    }
    checkboxLanguageRef.checked =
      language === LANGUAGE.en ? false : true;
    bodyRef.classList.add(language);
    renameAll(language);
  })();
  



const filterRender = function (data) {
  spinnerOn();
  data.results.forEach(el => {
    el.innerHTML = '';
    el.release_date = Number.parseInt(el.release_date);
    el.poster_path === null
      ? (el.poster_path = no_image_found)
      : (el.poster_path = `https://image.tmdb.org/t/p/w300${el.poster_path}`);
    filmList.insertAdjacentHTML('beforeend', cards(el));
    fetch(`https://api.themoviedb.org/3/movie/${el.id}?api_key=${key}&language=${language}`)
      .then(data => data.json())
      .then(data => {
        document.querySelectorAll('.gallery-item-genre').forEach(el => {

          if (el.dataset.id == data.id) {
            el.innerHTML= ' | ' +Number.parseInt(data.release_date);

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

  const li = document.querySelectorAll(".gallery-list-item");
  const h3 = document.querySelectorAll(".gallery-item-title");
      const switchToggle = document.querySelector("#theme-switch-toggle");
      
      const mainCardsDark = function (){         
          if (localStorage.getItem("checkboxStatus") === 'false' && localStorage.getItem("light") === 'false') {
             li.forEach(e => {
               e.classList.remove("gallery-list-item-dark")               
             })
            h3.forEach(e => {
               e.classList.remove("gallery-item-title-dark")               
           })
          }
          else if (localStorage.getItem("checkboxStatus") && localStorage.getItem("light")) {
            switchToggle.checked = true
            li.forEach(e => {
              e.classList.add("gallery-list-item-dark")
            })
            h3.forEach(e => {
              e.classList.add("gallery-item-title-dark")               
            })
           
          }
       }    
          mainCardsDark()
          switchToggle.addEventListener('change', mainCardsDark)

         
};


export const popular = function (page) {
  checkboxLanguageRef.removeEventListener('click', changeLanguageUpComing);
  checkboxLanguageRef.removeEventListener('click', changeLanguageTopRated);
  checkboxLanguageRef.addEventListener('click', changeLanguagePopular);

  fetch(
    ` https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=${language}&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
      filmList.innerHTML = '';
      document.querySelector('#search-pagination').classList.add('is-none-pagination');
      popPagination(data);
      data.results.sort((a, b) => {
        return b.popularity - a.popularity;
      });
      filterRender(data);
    });
};
export const topRated = function (page) {
  checkboxLanguageRef.removeEventListener('click', changeLanguageUpComing);
  checkboxLanguageRef.addEventListener('click', changeLanguageTopRated);
  checkboxLanguageRef.removeEventListener('click', changeLanguagePopular);


  fetch(
    ` https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=${language}&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
  filmList.innerHTML = '';
  document.querySelector('#search-pagination').classList.add('is-none-pagination');
      topRatedPagination(data);
      data.results.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
      filterRender(data);
    });
};
export const upComing = function (page) {
  checkboxLanguageRef.addEventListener('click', changeLanguageUpComing);
  checkboxLanguageRef.removeEventListener('click', changeLanguageTopRated);
  checkboxLanguageRef.removeEventListener('click', changeLanguagePopular);

  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=${language}&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
      filmList.innerHTML = '';
      document.querySelector('#search-pagination').classList.add('is-none-pagination');
      upComingPagination(data);
      filterRender(data);
    });
};

function changeLanguageUpComing() {
  let oldLanguage = localStorage.getItem('language');
  if (language === LANGUAGE.en) {
    language = LANGUAGE.ua;
    localStorage.setItem('language', language);
    bodyRef.classList.replace(oldLanguage, language);
    checkboxLanguageRef.checked = true;
  } else {
    language = LANGUAGE.en;
    localStorage.setItem('language', language);
    bodyRef.classList.replace(oldLanguage, language);
    checkboxLanguageRef.checked = false;
  }
  renameAll(language);
  upComing();
}
function changeLanguageTopRated() {
  let oldLanguage = localStorage.getItem('language');
  if (language === LANGUAGE.en) {
    language = LANGUAGE.ua;
    localStorage.setItem('language', language);
    bodyRef.classList.replace(oldLanguage, language);
    checkboxLanguageRef.checked = true;
  } else {
    language = LANGUAGE.en;
    localStorage.setItem('language', language);
    bodyRef.classList.replace(oldLanguage, language);
    checkboxLanguageRef.checked = false;
  }
  renameAll(language);
topRated();
}
function changeLanguagePopular() {
  let oldLanguage = localStorage.getItem('language');
  if (language === LANGUAGE.en) {
    language = LANGUAGE.ua;
    localStorage.setItem('language', language);
    bodyRef.classList.replace(oldLanguage, language);
    checkboxLanguageRef.checked = true;
  } else {
    language = LANGUAGE.en;
    localStorage.setItem('language', language);
    bodyRef.classList.replace(oldLanguage, language);
    checkboxLanguageRef.checked = false;
  }
  renameAll(language);
  popular();
}

const getData = function (e) {
  e.preventDefault();
  if (e.target.textContent === 'Popular' || e.target.textContent === 'Популярні') {
    popular();
    topRatedBtn.classList.remove('active-btn');
    upComingBtn.classList.remove('active-btn');
    popularBtn.classList.add('active-btn');
  } else if (e.target.textContent === 'Top Rated' || e.target.textContent === 'Рейтингові') {
    topRated();

    upComingBtn.classList.remove('active-btn');
    popularBtn.classList.remove('active-btn');
    topRatedBtn.classList.add('active-btn');
  } else if (e.target.textContent === 'Upcoming' || e.target.textContent === 'Новинки') {
    upComing();

    topRatedBtn.classList.remove('active-btn');
    popularBtn.classList.remove('active-btn');
    upComingBtn.classList.add('active-btn');
  }
};
filterList.addEventListener('click', getData);

