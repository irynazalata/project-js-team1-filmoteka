const main = document.querySelector(".lamp")

import sun from "../images/sun.png"
import moon from "../images/moon.png"

main.insertAdjacentHTML("beforeend",
`<div class="theme-switch">
      
    <img src="${sun}" alt="" class="theme-switch__icon_sun" ></img>
      <div class="theme-switch__control">
        <input class="theme-switch__toggle" type="checkbox" name="theme" id="theme-switch-toggle"
          aria-label="Переключить между тёмной и светлой темой" />
        <label aria-hidden="true" class="theme-switch__track" for="theme-switch-toggle">
        </label>
        <div aria-hidden="true" class="theme-switch__marker"></div>
      </div>

      <img src="${moon}" alt="" class="theme-switch__icon_moon" ></img>
    </div>`
)


const body = document.querySelector('body');
const button = document.querySelectorAll(".filter-button");
const footer = document.querySelector('footer')
const textFooter=document.querySelector('.copyright')

 

    const themeChange = function () {
        const switchToggle = document.querySelector("#theme-switch-toggle");

        const fn = function (e) {  
            button.forEach(e => {
                e.classList.toggle("filter-button-dark")
            })
            textFooter.classList.toggle("textFooter-dark")
            footer.classList.toggle("footer-dark")
            body.classList.toggle("dark-theme");
            localStorage.setItem('checkboxStatus', e.target.checked);
            localStorage.setItem('light', body.classList.contains("dark-theme"));
        }
        
     switchToggle.addEventListener('change', fn)

     if (localStorage.getItem("checkboxStatus") === 'false' && localStorage.getItem("light") === 'false') {
       footer.classList.remove("footer-dark");
       body.classList.remove("dark-theme");
       button.forEach(e => {
         e.classList.remove("filter-button-dark");
       });
         
    } else if (localStorage.getItem("checkboxStatus") && localStorage.getItem("light")) {
       switchToggle.checked = true
       textFooter.classList.add("textFooter-dark");
       body.classList.add("dark-theme");
       button.forEach(e => {
         footer.classList.add("footer-dark")
         e.classList.add("filter-button-dark")
       });
         
        }
}
themeChange()