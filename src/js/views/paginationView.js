import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  #prevButtonMarkup(currPage) {
    return `
    <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>`;
  }
  #nextButtonMarkup(currPage) {
    return `
    <button class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generateMarkup() {
    const resultsLength = this._data.results.length;
    const currPage = this._data.page;
    const numPages = Math.ceil(resultsLength / RES_PER_PAGE);

    //1) first page, other pages
    if (currPage === 1 && currPage < numPages)
      return this.#nextButtonMarkup(currPage);
    //2) first page , no other pages
    if (currPage === 1 && currPage === numPages) return ``;
    //3) other pages
    if (currPage > 1 && currPage < numPages)
      return `${[
        this.#prevButtonMarkup(currPage),
        this.#nextButtonMarkup(currPage),
      ].join('')}`;
    //4) no recipes ,so no pages
    if (numPages === 0) return ``;
    //5) last page
    return this.#prevButtonMarkup(currPage);
  }
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goPrevious = btn.classList.contains('pagination__btn--prev');
      const goNext = btn.classList.contains('pagination__btn--next');
      if (goNext) return handler('next');
      if (goPrevious) return handler('prev');
    });
  }
}
export default new PaginationView();
