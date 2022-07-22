class SearchView {
  #parentEl = document.querySelector('.search');

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
