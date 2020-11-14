import cards from '../templates/cardGallery.hbs';
import '../css/card.css';
export default function library() {   
    const filter = document.querySelector('.filter');
    const searchBox = document.querySelector(".search-box");
    const errorP = document.querySelector(".error");
    const container = document.querySelector(".header-container");
    const changeBgr = document.querySelector(".header");
    const emphasisMinus = document.querySelector("#home");
    const emphasisPlus = document.querySelector("#my-library");
    const ul = document.querySelector(".film-list");

    const libraryOpen = function () {

        filter.remove();
        container.removeChild(searchBox);
        container.removeChild(errorP);
        changeBgr.classList.replace("header", "library");
        ul.classList.replace("home-film-list", "library-film-list");
        emphasisMinus.classList.remove("current");
        emphasisPlus.classList.add("current");
        ul.innerHTML=""
        container.insertAdjacentHTML("beforeend",
            '<div class="container-button"><button class= "library-btn indent-btn btn-active" id = "watched" > Watched</button > <button class="library-btn indent-btn" id="queue">queue</button><button class= "library-btn new-queue" id = "new_queue" >NOT WATCHED YET</div > ')
       emphasisPlus.removeEventListener("click", libraryOpen);
        const watched = document.querySelector("#watched");
        const queue = document.querySelector("#queue");
        const btnNewQueue = document.querySelector('#new_queue')
        const watchedFilms= function () {
           watched.classList.add("btn-active")
            queue.classList.remove("btn-active")
           btnNewQueue.classList.remove("btn-active")
           ul.classList.add("watched")
           ul.classList.remove("newWatched")
           ul.innerHTML = ""
           const array = JSON.parse(localStorage.getItem('Watched'));
           document.querySelector('#pagination').classList.add('is-none-pagination');
          
           if (array !== null && array.length !== 0) {
               array.forEach(el => {
                        el.release_date = new Date(el.release_date).getFullYear();
                   ul.insertAdjacentHTML('afterbegin', cards(el))
                   array.forEach(e => {
                       if (el.id==e.id) {
                           e.genres.forEach(i => {
                               document.querySelector(".gallery-item-genre").insertAdjacentHTML(
                                   'afterbegin',
                                   `<span class="gallery-item-genre-name">${i.name}<span class="no-need-symbol">,</span> </span>`,
                               );
                           
                           })
                       }
                   })

               })
            }
            else { ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') };

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
         } else if (localStorage.getItem("checkboxStatus") && localStorage.getItem("light")) {
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

        watchedFilms()

        const queueFilms = function () {
            
           watched.classList.remove("btn-active")
            queue.classList.add("btn-active")
            btnNewQueue.classList.remove("btn-active")
            ul.classList.remove("watched")
            ul.classList.remove("newWatched")
        ul.innerHTML = ""
        const array = JSON.parse(localStorage.getItem('Queue'));
        document.querySelector('#pagination').classList.add('is-none-pagination');

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
            }
            else { ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') };
           
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
         } else if (localStorage.getItem("checkboxStatus") && localStorage.getItem("light")) {
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

    watched.addEventListener("click", watchedFilms);
    queue.addEventListener("click", queueFilms);
        
        const newQueueFilms = function () {
        let newQueue = [];
        let arrQueue = JSON.parse(localStorage.getItem('Queue')) || [];
        let arrWatched = JSON.parse(localStorage.getItem('Watched')) || [];
        let IDarrWatched = [];
        let IDarrQueue = [];
        let IDnewQueue = [];
          
        arrWatched.forEach((el) => { IDarrWatched.push(el.id) })
        arrQueue.forEach((el) => { IDarrQueue.push(el.id) })
        IDnewQueue =  IDarrQueue.filter(number => IDarrWatched.indexOf(number) === -1);
        arrQueue.forEach((el) => {
        IDnewQueue.includes(el.id) ? newQueue.push(el) : ""
        })

          ul.classList.add("newWatched")
          watched.classList.remove("btn-active")
          queue.classList.remove("btn-active")
          btnNewQueue.classList.add("btn-active")
          ul.innerHTML = ""
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
            }
            else { ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET &#9785</p>') };
            };
             btnNewQueue.addEventListener('click', newQueueFilms)
    };   

    emphasisPlus.addEventListener("click", libraryOpen);
};
