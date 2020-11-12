
import templateCard from "../templates/cardGallery.hbs";
import no_image_found from "../images/no-image.jpg";
import '../css/card.css';

const TOKEN = "401d61f37c17d956a98039a1a0734109";
const input = document.querySelector(".search-input")
const ul = document.querySelector(".home-film-list")
const error = document.querySelector(".error")
const form = document.querySelector(".search-box")
const headerSvg = document.querySelector(".icon-modal") 


const getData = function (e) {
    e.preventDefault();  
    let eventTarget;
    e.currentTarget.nodeName === "svg"  ? eventTarget = e.target.parentNode.firstElementChild : eventTarget = e.target.firstElementChild;    
    if (eventTarget.value.length >=1) {
        error.innerHTML = "";
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TOKEN}&query=${input.value}`)
            .then(data => data.json())
            .then(({ results }) => {
            if (results.length <= 0) {
            return error.insertAdjacentHTML("beforeend","Search result not successful. Enter the correct movie name.");
            }   ul.innerHTML = "";
 
                const arr = results.map(el => {
                    el.release_date = new Date(el.release_date).getFullYear()
                    return el
                })                
                arr.sort((a, b) => {
                    return a.popularity-b.popularity
                })
                arr.forEach(el => {
                    !el.release_date ? el.release_date = "Unknown" : el.release_date;                    
                    el.poster_path === null
                    ? (el.poster_path = no_image_found)
                    : (el.poster_path = `https://image.tmdb.org/t/p/w300${el.poster_path}`);
                    document
                        .querySelector('.home-film-list')
                        .insertAdjacentHTML('afterbegin', templateCard(el));
                    fetch(`https://api.themoviedb.org/3/movie/${el.id}?api_key=${TOKEN}`)
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
             })
             .catch(err => error.insertAdjacentHTML("beforeend", "Search result not successful. Enter the correct movie name."));
    } 
};


form.addEventListener("submit",getData)
headerSvg.addEventListener("click",getData)