import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';

import cards from '../templates/cardGallery.hbs';

import popUpTemplate from '../templates/popUp.hbs';
import trailerTemplate from '../templates/trailer.hbs';
import no_image_found from '../images/no-image.jpg';
import play_btn from '../images/play-btn.png';
import telegram from '../images/telegram.png';


import '../css/popUp.css';

let objPopUp = {};
export let language;
const LANGUAGE = {
  en: 'en-US',
  ua: 'uk-UA',
}
const checkboxLanguageRef = document.querySelector('.language-switch__toggle');
const bodyRef = document.querySelector('body');


const key = '401d61f37c17d956a98039a1a0734109';
const showModal = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=${language}`);
  const data = response.json();
  return data
}

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
})();

export function changeLanguage() {
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
      if (language === 'en-US') {
        if (JSON.parse(localStorage.getItem('Queue')) === null || JSON.parse(localStorage.getItem('Queue')).length === 0) { data.text_queue_btn = "ADD TO QUEUE" }
        else if (JSON.parse(localStorage.getItem('Queue')) !== null) {
          data.text_queue_btn = "ADD TO QUEUE";
          JSON.parse(localStorage.getItem('Queue')).forEach(el => {
            el.id == id ? data.text_queue_btn = "DELETE FROM QUEUE" : "";
            }
          )
        }
        if (JSON.parse(localStorage.getItem('Watched')) === null || JSON.parse(localStorage.getItem('Watched')).length === 0) { data.text_watched_btn = "ADD TO WATCHED" }
        else if (JSON.parse(localStorage.getItem('Watched')) !== null) {
          data.text_watched_btn = "ADD TO WATCHED"
          JSON.parse(localStorage.getItem('Watched')).forEach(el => {
            el.id == id ? data.text_watched_btn = "DELETE FROM WATCHED" : "";
            }
          )}
        }
        if (language === 'uk-UA') {
          if (JSON.parse(localStorage.getItem('Queue')) === null || JSON.parse(localStorage.getItem('Queue')).length === 0) { data.text_queue_btn = "ДОДАТИ В ЧЕРГУ" }
          else if (JSON.parse(localStorage.getItem('Queue')) !== null) {
            data.text_queue_btn = "ДОДАТИ В ЧЕРГУ";
            JSON.parse(localStorage.getItem('Queue')).forEach(el => {
              el.id == id ? data.text_queue_btn = "ВИДАЛИТИ З ЧЕРГИ" : "";
              }
            )
          }
          if (JSON.parse(localStorage.getItem('Watched')) === null || JSON.parse(localStorage.getItem('Watched')).length === 0) { data.text_watched_btn = "ДОДАТИ В ПЕРЕГЛЯНУТІ" }
          else if (JSON.parse(localStorage.getItem('Watched')) !== null) {
            data.text_watched_btn = "ДОДАТИ В ПЕРЕГЛЯНУТІ"
            JSON.parse(localStorage.getItem('Watched')).forEach(el => {
              el.id == id ? data.text_watched_btn = "ВИДАЛИТИ З ПЕРЕГЛЯНУТИХ" : "";
              }
            )}
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
        if (language === 'en-US') {
        if (event.target.textContent === 'ADD TO WATCHED') {
          isUnique = arrWatched.find(el => el.id == id)
          if (isUnique === undefined) {
             arrWatched.push(objPopUp);
            }
            localStorage.setItem('Watched', JSON.stringify(arrWatched))
          event.target.textContent = "DELETE FROM WATCHED"
          newQueueFilms(arrQueue, arrWatched);
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
          newQueueFilms(arrQueue, arrWatched);
          watchedFilms()
        }}
        if (language === 'uk-UA') {
          if (event.target.textContent === 'ДОДАТИ В ПЕРЕГЛЯНУТІ') {
            isUnique = arrWatched.find(el => el.id == id)
            if (isUnique === undefined) {
               arrWatched.push(objPopUp);
              }
              localStorage.setItem('Watched', JSON.stringify(arrWatched))
            event.target.textContent = "ВИДАЛИТИ З ПЕРЕГЛЯНУТИХ"
            newQueueFilms(arrQueue, arrWatched);
            watchedFilms()
          }
          else if (event.target.textContent === "ВИДАЛИТИ З ПЕРЕГЛЯНУТИХ") {
           
            isUnique = arrWatched.find(el => el.id == id)
            if (isUnique !== undefined) {
              const index = arrWatched.indexOf(isUnique)
              arrWatched.splice(index, 1)
            }
            localStorage.setItem('Watched', JSON.stringify(arrWatched))
            event.target.textContent = 'ДОДАТИ В ПЕРЕГЛЯНУТІ'
            newQueueFilms(arrQueue, arrWatched);
            watchedFilms()
          }}

      }

      const getArrQueue = function (event) {
      if (language === 'en-US') {
        if (event.target.textContent === 'ADD TO QUEUE') {
          isUnique = arrQueue.find(el => el.id == id)
          if (isUnique === undefined) {
            arrQueue.push(objPopUp);
          }
          localStorage.setItem('Queue', JSON.stringify(arrQueue))
          event.target.textContent = "DELETE FROM QUEUE"
          newQueueFilms(arrQueue, arrWatched);
          queueFilms();
        }
        else if (event.target.textContent === "DELETE FROM QUEUE") {
          isUnique = arrQueue.find(el => el.id == id)
          if (isUnique !== undefined) {
            const index = arrQueue.indexOf(isUnique)
            arrQueue.splice(index, 1)
          }
          localStorage.setItem('Queue', JSON.stringify(arrQueue))
          event.target.textContent = 'ADD TO QUEUE'
          newQueueFilms(arrQueue, arrWatched);
          queueFilms();
        } }
        if (language === 'uk-UA') {
          if (event.target.textContent === 'ДОДАТИ В ЧЕРГУ') {
            isUnique = arrQueue.find(el => el.id == id)
            if (isUnique === undefined) {
              arrQueue.push(objPopUp);
            }
            localStorage.setItem('Queue', JSON.stringify(arrQueue))
            event.target.textContent = "ВИДАЛИТИ З ЧЕРГИ"
            newQueueFilms(arrQueue, arrWatched);
            queueFilms();
          }
          else if (event.target.textContent === "ВИДАЛИТИ З ЧЕРГИ") {
            isUnique = arrQueue.find(el => el.id == id)
            if (isUnique !== undefined) {
              const index = arrQueue.indexOf(isUnique)
              arrQueue.splice(index, 1)
            }
            localStorage.setItem('Queue', JSON.stringify(arrQueue))
            event.target.textContent = 'ДОДАТИ В ЧЕРГУ'
            newQueueFilms(arrQueue, arrWatched);
            queueFilms();
          } }
      }

      addWatched.addEventListener('click', getArrWatched)
      addQueue.addEventListener('click', getArrQueue)
  
        document.querySelector('.play-trailer-btn').addEventListener('click', () => {
          showTrailer(data.original_title)
            .then(data => {
              basicLightbox.create(`
    ${trailerTemplate(data.items[0])}
  `).show();       
            })
        })
        if (language === 'en-US') {
          document.querySelector('.play-trailer-btn').innerHTML = ` <img src="${play_btn}" class="play-trailer-btn-icon" width="24" height="24">
          </img>          Watch the trailer`;
          document.querySelector('.anchorShare').innerHTML = `<img src="${telegram}" class="anchorShare-icon" width="15" height="15">
          </img> share in telegram`;
        }
        if (language === 'uk-UA') {
          document.querySelector('.play-trailer-btn').innerHTML = ` <img src="${play_btn}" class="play-trailer-btn-icon" width="24" height="24">
          </img>          Дивитись трейлер`;
          document.querySelector('.anchorShare').innerHTML = `<img src="${telegram}" class="anchorShare-icon" width="15" height="15">
          </img> поділитись`;
        }
        document.querySelector('.close-btn').addEventListener('click', () => { document.querySelector('.basicLightbox').remove(); document.body.classList.remove('modal-open') })
        
        const changeThemeBtn = document.querySelectorAll(".changeThemeBtn");
        const changeThemeBtnDiv = document.querySelectorAll(".pop-up-buttons");
        const changeThemeText=document.querySelectorAll(".changeThemeText")
        const switchToggle = document.querySelector("#theme-switch-toggle");
        const popUp = document.querySelector(".pop-up");
        const closeBtn = document.querySelector(".close-btn")
        
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
 if (!ul.classList.contains("newWatched") && ul.classList.contains("library-film-list") && ul.classList.contains("watched")) {
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
  } else {
  if (language === 'en-US') {
     ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') 
  } else if(language === 'uk-UA'){
    ul.insertAdjacentHTML("afterbegin", '<p class="no-films">ЖОДНОГО ФІЛЬМУ ЩЕ НЕ ДОДАНО &#9785</p>')  
  }
    }
}
};

function queueFilms() {
  
  if (!ul.classList.contains("newWatched") && ul.classList.contains("library-film-list") && !ul.classList.contains("watched")) {
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
    } else { 
      if (language === 'en-US') {
        ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') 
     } else if(language === 'uk-UA'){
       ul.insertAdjacentHTML("afterbegin", '<p class="no-films">ЖОДНОГО ФІЛЬМУ ЩЕ НЕ ДОДАНО &#9785</p>')  
     }
     }
  }
};
    
const newQueueFilms = function (queue, watched) {

  let newQueue = [];
  let IDarrWatched = [];
  let IDarrQueue = [];
  let IDnewQueue = [];
      
  const filtering = function (arrQueue, arrWatched) {
   
    arrWatched.forEach((el) => { IDarrWatched.push(el.id) })
    arrQueue.forEach((el) => { IDarrQueue.push(el.id) })
    IDnewQueue = IDarrQueue.filter(number => IDarrWatched.indexOf(number) === -1);
    arrQueue.forEach((el) => {
      IDnewQueue.includes(el.id) ? newQueue.push(el) : ""
    })
  };

      filtering(queue, watched)

      if (ul.classList.contains("library-film-list") && ul.classList.contains("newWatched")) {
        ul.innerHTML = "";
          document.querySelector('#pagination').classList.add('is-none-pagination');
             const array = newQueue;
            
        if (array !== null && array.length !== 0 ) {
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
        }else{
          if (language === 'en-US') {
            ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') 
         } else if(language === 'uk-UA'){
           ul.insertAdjacentHTML("afterbegin", '<p class="no-films">ЖОДНОГО ФІЛЬМУ ЩЕ НЕ ДОДАНО &#9785</p>')  
         }
        }
      };
};