import '../css/pagination.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { findPopular } from './mainCards.js';

function scroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, 500);
}
scroll()

export function changePagination (data) {
  mainPagination.setItemsPerPage(data.results.length=18);
}
  
const mainPagination = new Pagination('pagination', {
  // Total number of items
  totalItems: 10000,
  // Items per page
  itemsPerPage: 20,
  // Visible pages
  visiblePages: 5,
  // Current page
  page: 1,
  // center number
  centerAlign: true,
  //default class
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
});

mainPagination.on('afterMove', function(evt) {
document.querySelector('.home-film-list').innerHTML = '';
let currentPage = evt.page;
findPopular(currentPage);
scroll();
});

