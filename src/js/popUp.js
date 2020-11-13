import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import cards from '../templates/cardGallery.hbs';

import popUpTemplate from '../templates/popUp.hbs';
import trailerTemplate from '../templates/trailer.hbs';
import no_image_found from '../images/no-image.jpg';
import play_btn from '../images/play-btn.png';
import telegram from '../images/telegram.png';

import '../css/popUp.css';
import { locale } from 'core-js';

let objPopUp = {};

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
  if (event.target.parentNode.nodeName === "LI" || event.target.parentNode.nodeName === "P" || event.target.parentNode.nodeName === "SPAN") {
    const id = event.target.parentNode.dataset['id']
    showModal(id)
      .then(data => {
        document.body.classList.add('modal-open');
        objPopUp = data
        if (JSON.parse(localStorage.getItem('Queue')) === null || JSON.parse(localStorage.getItem('Queue')).length === 0) { data.text_queue_btn = "ADD TO " }
        else if (JSON.parse(localStorage.getItem('Queue')) !== null) {
          data.text_queue_btn = "ADD TO ";
          JSON.parse(localStorage.getItem('Queue')).forEach(el => {
            el.id == id ? data.text_queue_btn = "DELETE FROM " : "";
            }
          )
        }
        if (JSON.parse(localStorage.getItem('Watched')) === null || JSON.parse(localStorage.getItem('Watched')).length === 0) { data.text_watched_btn = "ADD TO " }
        else if (JSON.parse(localStorage.getItem('Watched')) !== null) {
          data.text_watched_btn = "ADD TO "
          JSON.parse(localStorage.getItem('Watched')).forEach(el => {
            el.id == id ? data.text_watched_btn = "DELETE FROM " : "";
            }
          )
        }
        data.release_date = Number.parseInt(data.release_date);
        data.telegram = telegram;
        data.play_btn = play_btn;
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
          watchedFilms()
        }
        else if (event.target.textContent === "DELETE FROM WATCHED") {
         
          isUnique = arrWatched.find(el => el.id == id)
          if (isUnique !== undefined) {
            const index = arrWatched.indexOf(isUnique)
            arrWatched.splice(index, 1)
            
          }
          localStorage.setItem('Watched', JSON.stringify(arrWatched))
          event.target.textContent = 'ADD TO WATCHED'
          watchedFilms()
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
          queueFilms()
        }
        else if (event.target.textContent === "DELETE FROM QUEUE") {
          isUnique = arrQueue.find(el => el.id == id)
          if (isUnique !== undefined) {
            const index = arrQueue.indexOf(isUnique)
            arrQueue.splice(index, 1)
          }
          localStorage.setItem('Queue', JSON.stringify(arrQueue))
          event.target.textContent = 'ADD TO QUEUE'
          queueFilms()
        } 
      }

      addWatched.addEventListener('click', getArrWatched)
      addQueue.addEventListener('click', getArrQueue)
  
        document.querySelector('.play-trailer-btn').addEventListener('click', () => {
          showTrailer(data.original_title)
            .then(data => {
              console.log(data)
              basicLightbox.create(`
    ${trailerTemplate(data.items[0])}
  `).show();       
            })
        })

        document.querySelector('.close-btn').addEventListener('click', () => { document.querySelector('.basicLightbox').remove(); document.body.classList.remove('modal-open') })
        
        const changeThemeBtn = document.querySelectorAll(".changeThemeBtn");
        const changeThemeBtnDiv = document.querySelectorAll(".pop-up-buttons");
        const changeThemeText=document.querySelectorAll(".changeThemeText")
        const switchToggle = document.querySelector("#theme-switch-toggle");
        const popUp = document.querySelector(".pop-up");
        const closeBtn=document.querySelector(".close-btn")
                  
         if (localStorage.getItem("checkboxStatus") === 'false' && localStorage.getItem("light") === 'false') {
             popUp.classList.remove("pop-up-dark")
         } else if (localStorage.getItem("checkboxStatus") && localStorage.getItem("light")) {
            switchToggle.checked = true
           popUp.classList.add("pop-up-dark")      
           changeThemeBtn.forEach(e => {
             e.classList.replace("changeThemeBtn", "changeThemeBtn-dark")
           }) 
           changeThemeBtnDiv.forEach(e => {
             e.classList.add("pop-up-buttons-dark")
           })
           changeThemeText.forEach(e => {
              e.classList.replace("changeThemeText", "changeThemeText-dark")
           })
           closeBtn.classList.add("close-btn-dark")
        }
      })
  }
})

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelector('.basicLightbox').remove();
    document.body.classList.remove('modal-open');
  }
})
 

const ul = document.querySelector(".film-list")

function watchedFilms() {
 if (ul.classList.contains("library-film-list") && ul.classList.contains("watched")) {
  ul.innerHTML = ""
  const array = JSON.parse(localStorage.getItem('Watched'));
  if (array !== null && array.length !== 0) {
    array.forEach(el => {
      el.release_date = new Date(el.release_date).getFullYear();
      ul.insertAdjacentHTML('afterbegin', cards(el))
       array.forEach(e => {
        if (el.id == e.id) {
          e.genres.forEach(i => {            
            document.querySelector(".gallery-item-genre").insertAdjacentHTML(
              'afterbegin',
              `<span class="gallery-item-genre-name">${i.name}<span class="no-need-symbol">,</span> </span>`,
            );
          })
        }
      })
    })
  } else { ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') }
}
};


function queueFilms() {
  
  if (ul.classList.contains("library-film-list") && !ul.classList.contains("watched")) {
    ul.innerHTML = ""
    const array = JSON.parse(localStorage.getItem('Queue'));
    if (array !== null && array.length !== 0) {
      array.forEach(el => {
        el.release_date = new Date(el.release_date).getFullYear();
        ul.insertAdjacentHTML('afterbegin', cards(el))
        array.forEach(e => {
          if (el.id == e.id) {
            e.genres.forEach(i => {
              document.querySelector(".gallery-item-genre").insertAdjacentHTML(
                'afterbegin',
                `<span class="gallery-item-genre-name">${i.name}<span class="no-need-symbol">,</span> </span>`,
              );
            })
          }
        })
      })
    } else { ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') }
  }
    };
