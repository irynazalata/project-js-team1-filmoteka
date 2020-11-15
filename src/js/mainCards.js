import cards from '../templates/cardGallery.hbs';
import no_image_found from '../images/no-image.jpg';
import '../css/card.css';
import { changePagination } from './pagination.js';
import { spinnerOff, spinnerOn } from './spinner.js';



const key = '401d61f37c17d956a98039a1a0734109';

export const findPopular = async function (page) {
  spinnerOn();
  document.querySelector('#popular-pagination').classList.add('is-none-pagination');
  return await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page}`,
  )
    .then(data => data.json())
    .then(data => {
      changePagination(data);
      data.results.sort((a, b) => {
        return b.popularity - a.popularity;
      })
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


      const li = document.querySelectorAll(".gallery-list-item")
      const h3=document.querySelectorAll(".gallery-item-title")
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

    });
  
};
findPopular();

