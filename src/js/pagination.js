import '../css/pagination.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { findPopular } from './mainCards.js';
import {render} from './search.js'

function scroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 280,
      behavior: 'smooth',
    });
  }, 500);
}

export function changePagination (data) {
  mainPagination.setItemsPerPage(data.results.length=18);
  mainPagination.setTotalItems(data.total_results - data.total_pages*2);
}
  
export const mainPagination = new Pagination('pagination', {
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

export const searchPagination = new Pagination('search-pagination', {
  // Total number of items
  totalItems: 10000,
  // Items per page
  itemsPerPage: 20,
  // Visible pages
  visiblePages: 2,
  // Current page
  page: 1,
  // center number
  centerAlign: true,
  //default class
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
});

searchPagination.on('afterMove', function(evt) {
  document.querySelector('.home-film-list').innerHTML = '';
  let currentPage = evt.page;
  render(currentPage);
  scroll();
  });

  export function changeSearchPagination (data) {
    document.querySelector('#pagination').classList.add('is-none-pagination');
    document.querySelector('#search-pagination').classList.remove('is-none-pagination');
    searchPagination.setItemsPerPage(data.results.length=18);
    searchPagination.setTotalItems(data.total_results - data.total_pages*2);
    if (data.total_results<=18) {
      document.querySelector('#search-pagination').classList.add('is-none-pagination');
    }
  }