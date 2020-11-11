import cards from '../templates/cardGallery.hbs';
import no_image_found from '../images/no-image.jpg';
import '../css/card.css';

const key = '401d61f37c17d956a98039a1a0734109';

const findPopular = async function () {
  return await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`,
  )
    .then(data => data.json())
    .then(({ results }) => {
      results.sort((a, b) => {
        return a.popularity - b.popularity;
      })
      results.forEach(el => {
        el.release_date = Number.parseInt(el.release_date);
        el.poster_path === null
          ? (el.poster_path = no_image_found)
          : (el.poster_path = `https://image.tmdb.org/t/p/w300${el.poster_path}`);
        document
          .querySelector('.home-film-list')
          .insertAdjacentHTML('afterbegin', cards(el));
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
      });
    });
};
findPopular();
