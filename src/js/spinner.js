import '../css/spinner.css';
export function spinnerOn() {
    document.querySelector('#spinner').classList.remove('is-hidden');
  }

export function spinnerOff() {
    document.querySelector('#spinner').classList.add('is-hidden');
  }