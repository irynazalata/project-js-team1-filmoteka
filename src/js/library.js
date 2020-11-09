
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
        changeBgr.classList.replace("header", "library-bgr");
        emphasisMinus.classList.remove("current");
        emphasisPlus.classList.add("current");
       
        container.insertAdjacentHTML("beforeend",
            '<div class="container-button"><button class="library-btn indent-btn">Watched</button><button class="library-btn">queue</button></div>')
    };

    emphasisPlus.addEventListener("click", libraryOpen);
};
