import cards from '../templates/cardGallery.hbs';
export default function library() {    
    const searchBox = document.querySelector(".search-box");
    const errorP = document.querySelector(".error");
    const container = document.querySelector(".header-container");
    const changeBgr = document.querySelector(".header");
    const emphasisMinus = document.querySelector("#home");
    const emphasisPlus = document.querySelector("#my-library");
    
  const ul = document.querySelector(".film-list")


    const libraryOpen = function () {
        
            container.removeChild(searchBox);
        container.removeChild(errorP);
        changeBgr.classList.replace("header", "library");
        ul.classList.replace("home-film-list", "library-film-list");
        emphasisMinus.classList.remove("current");
        emphasisPlus.classList.add("current");

        ul.innerHTML=""
       watchedFilms()
        container.insertAdjacentHTML("beforeend",
            '<div class="container-button"><button class= "library-btn indent-btn btn-active" id = "watched" > Watched</button > <button class="library-btn" id="queue">queue</button></div > ')
       emphasisPlus.removeEventListener("click", libraryOpen);
    
        const containerButton = document.querySelector(".container-button");
        const watched = document.querySelector("#watched");
        const queue = document.querySelector("#queue");

        
        
        const buttonActive = function (event) {
         event.target
            if (event.target.nodeName !== "BUTTON") {
              return
            } else {
            watched.classList.toggle("btn-active")
                queue.classList.toggle("btn-active")
                
            };   
        };
        containerButton.addEventListener("click", buttonActive);
         
       
      
       function watchedFilms  () {
           ul.innerHTML = ""
           const array = JSON.parse(localStorage.getItem('Watched'));
           document.querySelector('#pagination').classList.add('is-none-pagination');
          
           if (array !== null) {
               array.forEach(el => (
                   ul.insertAdjacentHTML('afterbegin', cards(el))
            
               ))
           }else{ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET :*(</p>')}

    };
       const queueFilms = function () {
        ul.innerHTML = ""
        document.querySelector('#pagination').classList.add('is-none-pagination');
         
        const array = JSON.parse(localStorage.getItem('Queue'));
        if (array !== null) {
            array.forEach(el => (
                ul.insertAdjacentHTML('afterbegin', cards(el))
            ))
        }else{ul.insertAdjacentHTML("afterbegin", '<p class="no-films">NO FILMS ADDED YET :*(</p>')}
    };

    watched.addEventListener("click", watchedFilms);
    queue.addEventListener("click", queueFilms);
        
    };   
  
    emphasisPlus.addEventListener("click", libraryOpen);
};
