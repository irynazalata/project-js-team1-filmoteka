
export default function library() {    
    const searchBox = document.querySelector(".search-box");
    const errorP = document.querySelector(".error");
    const container = document.querySelector(".header-container");
    const changeBgr = document.querySelector(".header");
    const emphasisMinus = document.querySelector("#home");
    const emphasisPlus = document.querySelector("#my-library");
    
   


    const libraryOpen = function () {
        container.removeChild(searchBox);
        container.removeChild(errorP);
        changeBgr.classList.replace("header", "library");
        container.classList.replace("header-container", "library-container");
        emphasisMinus.classList.remove("current");
        emphasisPlus.classList.add("current");
       
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
        
    };   
  
    emphasisPlus.addEventListener("click", libraryOpen);
};
