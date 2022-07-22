import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _validData(data) {
    //the data is valid if :
    //  it's a non empty array
    //  OR
    //  it's an object
    if (!data || data.length === 0) return false;

    // if (Array.isArray(data) && data.length === 0) return false;

    return true;
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderSpinner() {
    const markup = `
    <div class="spinner">
        <svg>
           <use href="${icons}#icon-loader"></use>
        </svg>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    if (!this._validData(this._data)) return this.renderError();

    const markup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(markup);
    const currElements = Array.from(this._parentEl.querySelectorAll('*'));
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    newElements.forEach(function (newEl, index) {
      const currEl = currElements[index];
      //Update changed TEXT:
      //check if the 2 elements are not equals &&
      //these 2 elements contains text &&
      //this text is not empty text ''
      //as we know the first child of any element is a text but remember a lot of it
      //are empty.
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }
      //Update changed ATTRIBUTES:
      //we changed only text above but we have data attributes in buttons,that we also want to change
      //so the feature works fine.
      if (!newEl.isEqualNode(currEl)) {
        const attributes = Array.from(newEl.attributes);
        attributes.forEach(attribute => {
          currEl.setAttribute(attribute.name, attribute.nodeValue);
        });
      }
    });
  }
  render(data, addRecipe = false) {
    // i make this check cuz after using uploadRecipe it gives me success/error
    //message inside the form , and we want to render the form again ,so we can
    //upload more recipes
    if (!addRecipe) {
      this._data = data;
      if (!this._validData(this._data)) return this.renderError();
    }

    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
