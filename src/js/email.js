import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import '../css/email.css';
import movie from '../images/movie.png';
import emailPopUp from '../templates/emailPopUp.hbs';

const images = { movie: movie};

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
      basicLightbox.create(`
      ${emailPopUp(images)}
  `).show();
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
        console.log('yes')
        localStorage.setItem('subscription', JSON.stringify({ accept: false, time: Date.now() }));
      })
      document.querySelector('.basicLightbox').addEventListener('click', () => {
        console.log('yes')
        localStorage.setItem('subscription', JSON.stringify({ accept: false, time: Date.now() }));
      })
    }
  }
}

window.addEventListener('mousemove',showEmailPopUp);
