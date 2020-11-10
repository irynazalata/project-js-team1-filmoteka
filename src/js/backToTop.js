import '../css/backToTop.css';

const goTopBtn = document.querySelector('.back-to-top');

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    goTopBtn.classList.add('back-to-top-show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back-to-top-show');
  }
}

window.addEventListener('scroll', trackScroll);

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

goTopBtn.addEventListener('click', backToTop);
