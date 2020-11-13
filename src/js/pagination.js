import '../css/pagination.css';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { findPopular } from './mainCards.js';
import { popular, topRated, upComing } from './filter.js';
import { render } from './search.js';

function scroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 280,
      behavior: 'smooth',
    });
  }, 500);
}

// MAIN
export function changePagination (data) {
  mainPagination.setItemsPerPage(data.results.length=18);
  mainPagination.setTotalItems(data.total_results - data.total_pages*2);
  document.querySelector('#popular-pagination').classList.add('is-none-pagination');
  document.querySelector('#upcoming-pagination').classList.add('is-none-pagination');
  document.querySelector('#rated-pagination').classList.add('is-none-pagination');
  tRPagination.reset();
  uCPagination.reset();
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

// SEARCH
export function changeSearchPagination (data) {
  document.querySelector('#popular-pagination').classList.add('is-none-pagination');
  document.querySelector('#upcoming-pagination').classList.add('is-none-pagination');
  document.querySelector('#rated-pagination').classList.add('is-none-pagination');
  document.querySelector('#pagination').classList.add('is-none-pagination');
  document.querySelector('#search-pagination').classList.remove('is-none-pagination');
  searchPagination.setItemsPerPage(data.results.length=18);
  searchPagination.setTotalItems(data.total_results - data.total_pages*2);
  if (data.total_results<=18) {
    document.querySelector('#search-pagination').classList.add('is-none-pagination');
  }
}

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

  // POPULAR
  export function popPagination (data) {
    mainPagination.setItemsPerPage(data.results.length=18);
    mainPagination.setTotalItems(data.total_results - data.total_pages*2);
    document.querySelector('#popular-pagination').classList.remove('is-none-pagination');
    document.querySelector('#upcoming-pagination').classList.add('is-none-pagination');
    document.querySelector('#rated-pagination').classList.add('is-none-pagination');
    document.querySelector('#pagination').classList.add('is-none-pagination');
    tRPagination.reset();
    uCPagination.reset();
  }

  export const popularPagination = new Pagination('popular-pagination', {
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
  
  popularPagination.on('afterMove', function(evt) {
  document.querySelector('.home-film-list').innerHTML = '';
  let currentPage = evt.page;
  popular(currentPage);
  scroll();
  });
  

  // TOPRATED
  export function topRatedPagination (data) {
    tRPagination.setItemsPerPage(data.results.length=18);
    tRPagination.setTotalItems(data.total_results - data.total_pages*2);
    document.querySelector('#popular-pagination').classList.add('is-none-pagination');
    document.querySelector('#upcoming-pagination').classList.add('is-none-pagination');
    document.querySelector('#pagination').classList.add('is-none-pagination');
    document.querySelector('#rated-pagination').classList.remove('is-none-pagination');
    uCPagination.reset();
    popularPagination.reset();
  }
    
  export const tRPagination = new Pagination('rated-pagination', {
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
  
  tRPagination.on('afterMove', function(evt) {
  document.querySelector('.home-film-list').innerHTML = '';
  let currentPage = evt.page;
  topRated(currentPage);
  scroll();
  });

// UPCOMING
  export function upComingPagination (data) {
    uCPagination.setItemsPerPage(data.results.length=18);
    uCPagination.setTotalItems(data.total_results - data.total_pages*2);
    document.querySelector('#pagination').classList.add('is-none-pagination');
    document.querySelector('#rated-pagination').classList.add('is-none-pagination');
    document.querySelector('#upcoming-pagination').classList.add('is-none-pagination');
    document.querySelector('#upcoming-pagination').classList.remove('is-none-pagination');
    tRPagination.reset();
    popularPagination.reset();
  }
    
  export const uCPagination = new Pagination('upcoming-pagination', {
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
  
  uCPagination.on('afterMove', function(evt) {
  document.querySelector('.home-film-list').innerHTML = '';
  let currentPage = evt.page;
  upComing(currentPage);
  scroll();
  });