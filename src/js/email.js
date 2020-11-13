import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import '../css/email.css';
import movie from '../images/movie.png';
import emailPopUp from '../templates/emailPopUp.hbs';

window.addEventListener('mousemove', function (e) {
    if (e.pageY === 0) {
      console.log('done')
      basicLightbox.create(`
      ${emailPopUp(movie)}
  `).show();
      document.body.querySelector('.basicLightbox').classList.add('light-popup')
    }
});
