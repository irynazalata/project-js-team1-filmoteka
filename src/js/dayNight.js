const main = document.querySelector(".lamp")

import "../images/sun.png"
import "../images/moon.png"

main.insertAdjacentHTML("beforeend",
`<div class="theme-switch">
      
    <img src="/images/sun.png" alt="" class="theme-switch__icon_sun" ></img>
      <div class="theme-switch__control">
        <input class="theme-switch__toggle" type="checkbox" name="theme" id="theme-switch-toggle"
          aria-label="Переключить между тёмной и светлой темой" />
        <label aria-hidden="true" class="theme-switch__track" for="theme-switch-toggle">
        </label>
        <div aria-hidden="true" class="theme-switch__marker"></div>
      </div>

      <img src="/images/moon.png" alt="" class="theme-switch__icon_moon" ></img>
    </div>`
)


const body = document.querySelector('body');
const button = document.querySelectorAll(".filter-button");
 

    const themeChange = function () {
        const switchToggle = document.querySelector("#theme-switch-toggle");

        const fn = function (e) {  
            button.forEach(e => {
                e.classList.toggle("filter-button-dark")
            })
            
            body.classList.toggle("dark-theme");
            localStorage.setItem('checkboxStatus', e.target.checked);
            localStorage.setItem('light', body.classList.contains("dark-theme"));
        }
        
     switchToggle.addEventListener('change', fn)

     if (localStorage.getItem("checkboxStatus") === 'false' && localStorage.getItem("light") === 'false') {
         body.classList.remove("dark-theme")
         button.forEach(e => {
                e.classList.remove("filter-button-dark")
            })
         
    } else if (localStorage.getItem("checkboxStatus") && localStorage.getItem("light")) {
            switchToggle.checked = true
         body.classList.add("dark-theme")
          button.forEach(e => {
                e.classList.add("filter-button-dark")
            })
         
        }
}
themeChange()