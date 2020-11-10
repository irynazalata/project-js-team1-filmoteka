import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import popUpTemplate from '../templates/popUp.hbs';
import trailerTemplate from '../templates/trailer.hbs';
import no_image_found from '../images/no-image.jpg';

import '../css/popUp.css';

const key = '401d61f37c17d956a98039a1a0734109';
const showModal = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`);
  const data = response.json();
  return data
}

const showTrailer = async (query) => {
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}%20official%20trailer&key=AIzaSyDigPVGWw58z95GRMpQLI5t-NGiAHpD3r0`);
  const data = response.json();
  return data
}

document.querySelector('.home-film-list').addEventListener('click', (event) => {
  const id = event.target.parentNode.dataset['id']
  showModal(id)
    .then(data => {
      data.poster_path === null ?
        data.poster_path = no_image_found
        : data.poster_path = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      data.overview === "" ?
        data.overview = 'No description added'
        : data.overview = data.overview
      basicLightbox.create(`
    ${popUpTemplate(data)}
  `).show();

    document.querySelector('.pop-up-btn-trailer').addEventListener('click', () => {
    showTrailer(data.original_title)
      .then(data =>
        {basicLightbox.create(`
    ${trailerTemplate(data.items[0])}
  `).show();
  })
})
    })
  
})

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelector('.basicLightbox').remove()
  }
})
