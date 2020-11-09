import cards from '../templates/cardGallery.hbs';
import '../css/card.css';

const key = '401d61f37c17d956a98039a1a0734109';

const findPopular = function () {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`,
  )
    .then(data => data.json())
    .then(({ results }) => {
      results.forEach(el => {
        el.poster_path === null
          ? (document.querySelector(
              '.films-list',
            ).innerHTML += `<li class="gallery-list-item"><img src='https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg'><h3>${el.original_title}</h3></li>`)
          : document
              .querySelector('.films-list')
              .insertAdjacentHTML('afterbegin', cards(el));
        fetch(`https://api.themoviedb.org/3/movie/${el.id}?api_key=${key}`)
          .then(data => data.json())
          .then(data => {
            data.genres.forEach(avast => {
              console.log(avast);
              document.querySelectorAll('.gallery-list-item').forEach(el => {
                el.lastChild.textContent = avast.name;
              });
            });
          });
      });
    });
};

findPopular();
