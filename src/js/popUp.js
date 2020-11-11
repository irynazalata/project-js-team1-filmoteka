import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import popUpTemplate from '../templates/popUp.hbs';
import no_image_found from '../images/no-image.jpg';

import '../css/popUp.css';

let objPopUp = {};

const key = '401d61f37c17d956a98039a1a0734109';
const showModal = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`);
  const data = response.json();
  return data
}

document.querySelector('.home-film-list').addEventListener('click', (event) => {
  const id = event.target.parentNode.dataset['id']
  showModal(id)
    .then(data => {
      objPopUp = data
      data.poster_path === null ?
        data.poster_path = no_image_found
        : data.poster_path = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      data.overview === "" ?
        data.overview = 'No description added'
        : data.overview = data.overview
      basicLightbox.create(`
    ${popUpTemplate(data)}
  `).show();

      const addWatched = document.querySelector('.pop-up-btn-watched')
      const addQueue = document.querySelector('.pop-up-btn-queue')

      let arrQueue = JSON.parse(localStorage.getItem('Queue')) || [];
      let arrWatched = JSON.parse(localStorage.getItem('Watched')) || [];

      let isUnique;

      const getArrWatched = function (event) {

        if (event.target.textContent === 'ADD TO WATCHED') {
          isUnique = arrWatched.find(el => el.id == id)
          if (isUnique === undefined) {
             arrWatched.push(objPopUp);
            }
            localStorage.setItem('Watched', JSON.stringify(arrWatched))
            event.target.textContent = "DELETE FROM WATCHED"
        }
        else if (event.target.textContent === "DELETE FROM WATCHED") {
          isUnique = arrWatched.find(el => el.id == id)
          if (isUnique !== undefined) {
            const index = arrWatched.indexOf(isUnique)
            arrWatched.splice(index, 1)
          }
          localStorage.setItem('Watched', JSON.stringify(arrWatched))
          event.target.textContent = 'ADD TO WATCHED'
        }
      }

      const getArrQueue = function (event) {
        if (event.target.textContent === 'ADD TO QUEUE') {
          isUnique = arrQueue.find(el => el.id == id)
          if (isUnique === undefined) {
            arrQueue.push(objPopUp);
          }
          localStorage.setItem('Queue', JSON.stringify(arrQueue))
          event.target.textContent = "DELETE FROM QUEUE"
        }
        else if (event.target.textContent === "DELETE FROM QUEUE") {
          isUnique = arrQueue.find(el => el.id == id)
          if (isUnique !== undefined) {
            const index = arrQueue.indexOf(isUnique)
            arrQueue.splice(index, 1)
          }
          localStorage.setItem('Queue', JSON.stringify(arrQueue))
          event.target.textContent = 'ADD TO QUEUE'}
      }

      addWatched.addEventListener('click', getArrWatched)
      addQueue.addEventListener('click', getArrQueue)

})
})
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelector('.basicLightbox').remove()
  }
})


