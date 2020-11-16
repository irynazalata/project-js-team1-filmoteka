import '../css/languageSwither.css';
const language = document.querySelector(".language");
language.insertAdjacentHTML("beforeend",
`<div class="language-switch">
<p  class="language-switch__en">en</p>
      <div class="language-switch__control">
        <input class="language-switch__toggle" type="checkbox" name="language" id="language-switch-toggle"
          aria-label="Language" />
        <label aria-hidden="true" class="language-switch__track" for="language-switch-toggle">
        </label>
        <div aria-hidden="true" class="language-switch__marker"></div>
      </div>
      <p class="language-switch__ua">укр</p>
      </div>`
);


const refs = {
  
    home: document.querySelector('#home'),
    library: document.querySelector('#my-library'),
    input: document.querySelector('#search'),

    error: document.querySelector('.error'),

    popularBtn: document.querySelector('#popular'),
    topratedBtn: document.querySelector('#top-rated'),
    upcomingBtn: document.querySelector('#upcoming'),
    
}

export function renameAll(language) {
    if (language === 'en-US') {
      refs.home.textContent = 'HOME';
      refs.library.textContent = 'MY LIBRARY';
      refs.input.setAttribute('placeholder', 'Search the film');
  
      refs.popularBtn.textContent = 'Popular';
      refs.topratedBtn.textContent = 'Top Rated';
      refs.upcomingBtn.textContent = 'Upcoming';
    }
    if (language === 'uk-UA') {
      refs.home.textContent = 'ГОЛОВНА';
      refs.library.textContent = 'БІБЛІОТЕКА';
      refs.input.setAttribute('placeholder', 'Введіть запит');
  
      refs.popularBtn.textContent = 'Популярні';
      refs.topratedBtn.textContent = 'Рейтингові';
      refs.upcomingBtn.textContent = "Новинки";
    }
  }
