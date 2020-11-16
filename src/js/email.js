import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import '../css/email.css';
import movie from '../images/movie.png';
import emailPopUpEn from '../templates/emailPopUpEn.hbs';
import emailPopUpUa from '../templates/emailPopUpUa.hbs';

const images = { movie: movie};
let language;
const LANGUAGE = {
  en: 'en-US',
  ua: 'uk-UA',
}
const checkboxLanguageRef = document.querySelector('.language-switch__toggle');
const bodyRef = document.querySelector('body');
checkboxLanguageRef.addEventListener('click', changeLanguage);

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
 
function changeLanguage() {
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

  setTimeout(() => { 
  const showEmailPopUp = function (e) {
  let accept = '';
  let date = '';
  if (localStorage.getItem('subscription')) {
    accept = JSON.parse(localStorage.getItem('subscription')).accept;
    if (accept) {
      window.removeEventListener('mousemove', showEmailPopUp);
      return
    } else date = JSON.parse(localStorage.getItem('subscription')).time
  }
  if (!(localStorage.getItem('subscription')) || ((Date.now() - date) > 259200000)) {
    if (e.clientY <= 5) {
      if (language === 'en-US') {
      basicLightbox.create(`
      ${emailPopUpEn(images)}`
      ).show();
    } else if (language === 'uk-UA') {
        basicLightbox.create(`
        ${emailPopUpUa(images)}`
        ).show();
      }

      document.body.querySelector('.basicLightbox').classList.add('light-popup');
      window.removeEventListener('mousemove', showEmailPopUp);

      document.body.querySelector('.subscribe-form').addEventListener('submit', () => {
        localStorage.setItem('subscription', JSON.stringify({ accept: true }));
      })

      document.body.querySelector('.refuse-btn').addEventListener('click', () => {
        document.querySelector('.basicLightbox').remove();
        document.body.classList.remove('modal-open');
        localStorage.setItem('subscription', JSON.stringify({ accept: false, time: Date.now() }));
      })
      
      document.querySelector('.close-email-btn').addEventListener('click', () => {
        document.querySelector('.basicLightbox').remove();
        document.body.classList.remove('modal-open');
        localStorage.setItem('subscription', JSON.stringify({ accept: false, time: Date.now() }));
      })
      document.querySelector('.basicLightbox').addEventListener('click', () => {
       
        localStorage.setItem('subscription', JSON.stringify({ accept: false, time: Date.now() }));
      })
      document.querySelector('.basicLightbox').addEventListener('click', () => {
       
        localStorage.setItem('subscription', JSON.stringify({ accept: false, time: Date.now() }));
      })
    }
  }
}

window.addEventListener('mousemove',showEmailPopUp);
}, 2000);


// else if (language === 'uk-UA') {
//   basicLightbox.create(`
//   ${emailPopUpUa(images)}`
// }