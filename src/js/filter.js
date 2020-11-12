const categories = document.body.querySelector('.filter-categories');
const filterCategory = document.body.querySelectorAll('.filter-categories-item');
const categoryList = document.body.querySelectorAll('.filter-categories-item-list');

const showCategory = function (event) {
  console.log(event.target.nodeName)
  if (event.target.nodeName === "LI" || event.target.nodeName === "SPAN") {
    let el
    event.target.nodeName === "SPAN" ? el = event.target.parentElement.lastChild : el = event.target.lastChild
    el.classList.remove('close')
  }
}

categories.addEventListener('click', showCategory)